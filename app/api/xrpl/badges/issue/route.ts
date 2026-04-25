import { NextResponse } from "next/server";
import { Client, Wallet } from "xrpl";
import { buildBadgeMetadataUri, isMilestoneBadgeEligible } from "@/lib/xrpl-badges";
import { getXrplIssuerSeed, getXrplServerUrl, xrplIssuerSeedEnvNames } from "@/lib/xrpl-config";
import { parseXrplBadgeIssueRequest } from "@/lib/xrpl-contract";
import {
  assertValidatedSuccess,
  buildAcceptSellOffer,
  buildDestinationSellOffer,
  buildMilestoneNFTokenMint,
  extractCreatedNFTokenId,
  extractCreatedOfferId,
} from "@/lib/xrpl-transactions";

export const runtime = "nodejs";

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
      ledger_index: "validated",
    });
  } catch {
    await client.fundWallet(wallet);
  }
}

async function latestIssuerNftokenId(
  client: Client,
  issuerAddress: string,
  metadataUri: string,
): Promise<string | undefined> {
  const expectedUri = Buffer.from(metadataUri, "utf8").toString("hex").toUpperCase();
  const response = await client.request({
    command: "account_nfts",
    account: issuerAddress,
  });

  const nfts = response.result.account_nfts ?? [];
  return nfts.find((nft) => nft.URI === expectedUri)?.NFTokenID;
}

export async function POST(request: Request) {
  const issuerSeed = getXrplIssuerSeed();
  if (!issuerSeed) {
    return jsonError(
      `XRPL Testnet issuer seed is not configured. Set one of: ${xrplIssuerSeedEnvNames().join(", ")}.`,
      503,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid XRPL badge request.");
  }

  const parsed = parseXrplBadgeIssueRequest(body);
  if (!parsed) {
    return jsonError("Badge issuance requires a sanitized entry id, emotion, life phase, and event date.");
  }

  const { entry, recipientAddress, recipientSeed } = parsed;
  if (!isMilestoneBadgeEligible({ emotion: entry.emotion, lifePhase: entry.lifePhase })) {
    return jsonError("This entry is not eligible for a milestone badge.");
  }

  let issuer: Wallet;
  let recipient: Wallet;
  try {
    issuer = Wallet.fromSeed(issuerSeed);
    recipient = Wallet.fromSeed(recipientSeed);
  } catch {
    return jsonError("A valid XRPL Testnet issuer and recipient wallet are required.");
  }

  if (recipient.address !== recipientAddress) {
    return jsonError("Recipient address does not match the provided seed.");
  }

  const metadataUri = buildBadgeMetadataUri({
    emotion: entry.emotion,
    lifePhase: entry.lifePhase,
    eventDate: entry.eventDate,
  });

  const client = new Client(getXrplServerUrl());
  try {
    await client.connect();
    await ensureTestnetAccount(client, recipient);

    const mintResponse = await client.submitAndWait(
      buildMilestoneNFTokenMint({ account: issuer.address, metadataUri }),
      { wallet: issuer },
    );
    assertValidatedSuccess(mintResponse, "NFTokenMint");

    const nftokenId =
      extractCreatedNFTokenId(mintResponse.result.meta) ??
      (await latestIssuerNftokenId(client, issuer.address, metadataUri));
    if (!nftokenId) {
      throw new Error("Unable to find minted NFTokenID.");
    }

    const offerResponse = await client.submitAndWait(
      buildDestinationSellOffer({
        account: issuer.address,
        nftokenId,
        destination: recipient.address,
      }),
      { wallet: issuer },
    );
    assertValidatedSuccess(offerResponse, "NFTokenCreateOffer");

    const offerId = extractCreatedOfferId(offerResponse.result.meta);
    if (!offerId) {
      throw new Error("Unable to find created NFToken offer id.");
    }

    const acceptResponse = await client.submitAndWait(
      buildAcceptSellOffer({
        account: recipient.address,
        offerId,
      }),
      { wallet: recipient },
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
      metadataUri,
    });
  } catch (cause) {
    console.error("XRPL badge issuance failed", cause);
    const message = "Unable to issue XRPL badge on XRPL Testnet.";
    return jsonError(message, 502);
  } finally {
    await client.disconnect();
  }
}
