import { NextResponse } from "next/server";
import { Client, Wallet } from "xrpl";
import { buildBadgeMetadataUri, isMilestoneBadgeEligible } from "@/lib/xrpl-badges";
import { getXrplIssuerSeed, getXrplServerUrl, xrplIssuerSeedEnvNames } from "@/lib/xrpl-config";
import {
  assertValidatedSuccess,
  buildAcceptSellOffer,
  buildDestinationSellOffer,
  buildMilestoneNFTokenMint,
  extractCreatedNFTokenId,
  extractCreatedOfferId
} from "@/lib/xrpl-transactions";

export const runtime = "nodejs";

type IssueRequest = {
  entry?: {
    id?: string;
    emotion?: string;
    lifePhase?: string;
    eventDate?: string;
  };
  recipientAddress?: string;
  recipientSeed?: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function txHash(response: unknown): string {
  return String((response as { result?: { hash?: string } }).result?.hash ?? "");
}

async function ensureTestnetAccount(client: Client, wallet: Wallet) {
  try {
    await client.request({
      command: "account_info",
      account: wallet.address,
      ledger_index: "validated"
    });
  } catch {
    await client.fundWallet(wallet);
  }
}

async function latestIssuerNftokenId(client: Client, issuerAddress: string, metadataUri: string): Promise<string | undefined> {
  const expectedUri = Buffer.from(metadataUri, "utf8").toString("hex").toUpperCase();
  const response = await client.request({
    command: "account_nfts",
    account: issuerAddress
  });

  const nfts = response.result.account_nfts ?? [];
  return nfts.find((nft) => nft.URI === expectedUri)?.NFTokenID;
}

export async function POST(request: Request) {
  const issuerSeed = getXrplIssuerSeed();
  if (!issuerSeed) {
    return jsonError(`XRPL Testnet issuer seed is not configured. Set one of: ${xrplIssuerSeedEnvNames().join(", ")}.`, 503);
  }

  let body: IssueRequest;
  try {
    body = await request.json() as IssueRequest;
  } catch {
    return jsonError("Invalid XRPL badge request.");
  }

  const entry = body.entry;
  if (!entry?.id || !entry.eventDate || !entry.emotion || !entry.lifePhase) {
    return jsonError("Badge issuance requires a sanitized entry id, emotion, life phase, and event date.");
  }

  if (!isMilestoneBadgeEligible({ emotion: entry.emotion, lifePhase: entry.lifePhase })) {
    return jsonError("This entry is not eligible for a milestone badge.");
  }

  if (!body.recipientSeed || !body.recipientAddress) {
    return jsonError("A testnet recipient wallet is required.");
  }

  const issuer = Wallet.fromSeed(issuerSeed);
  const recipient = Wallet.fromSeed(body.recipientSeed);
  if (recipient.address !== body.recipientAddress) {
    return jsonError("Recipient address does not match the provided seed.");
  }

  const metadataUri = buildBadgeMetadataUri({
    emotion: entry.emotion,
    lifePhase: entry.lifePhase,
    eventDate: entry.eventDate
  });

  const client = new Client(getXrplServerUrl());
  try {
    await client.connect();
    await ensureTestnetAccount(client, recipient);

    const mintResponse = await client.submitAndWait(
      buildMilestoneNFTokenMint({ account: issuer.address, metadataUri }),
      { wallet: issuer }
    );
    assertValidatedSuccess(mintResponse, "NFTokenMint");

    const nftokenId = extractCreatedNFTokenId(mintResponse.result.meta)
      ?? await latestIssuerNftokenId(client, issuer.address, metadataUri);
    if (!nftokenId) {
      throw new Error("Unable to find minted NFTokenID.");
    }

    const offerResponse = await client.submitAndWait(
      buildDestinationSellOffer({
        account: issuer.address,
        nftokenId,
        destination: recipient.address
      }),
      { wallet: issuer }
    );
    assertValidatedSuccess(offerResponse, "NFTokenCreateOffer");

    const offerId = extractCreatedOfferId(offerResponse.result.meta);
    if (!offerId) {
      throw new Error("Unable to find created NFToken offer id.");
    }

    const acceptResponse = await client.submitAndWait(
      buildAcceptSellOffer({
        account: recipient.address,
        offerId
      }),
      { wallet: recipient }
    );
    assertValidatedSuccess(acceptResponse, "NFTokenAcceptOffer");

    return NextResponse.json({
      issuerAddress: issuer.address,
      recipientAddress: recipient.address,
      nftokenId,
      offerId,
      mintTxHash: txHash(mintResponse),
      offerTxHash: txHash(offerResponse),
      acceptTxHash: txHash(acceptResponse),
      metadataUri
    });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Unable to issue XRPL badge.";
    return jsonError(message, 502);
  } finally {
    await client.disconnect();
  }
}
