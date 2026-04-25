import { XRPL_MILESTONE_BADGE_TAXON } from "./xrpl-badges";

export type XrplMintFields = {
  account: string;
  metadataUri: string;
  taxon?: number;
};

export type XrplOfferFields = {
  account: string;
  nftokenId: string;
  destination: string;
};

export type XrplAcceptOfferFields = {
  account: string;
  offerId: string;
};

export function stringToHex(value: string): string {
  return Buffer.from(value, "utf8").toString("hex").toUpperCase();
}

export function buildMilestoneNFTokenMint({
  account,
  metadataUri,
  taxon = XRPL_MILESTONE_BADGE_TAXON,
}: XrplMintFields) {
  return {
    TransactionType: "NFTokenMint" as const,
    Account: account,
    NFTokenTaxon: taxon,
    URI: stringToHex(metadataUri),
  };
}

export function buildDestinationSellOffer({ account, nftokenId, destination }: XrplOfferFields) {
  return {
    TransactionType: "NFTokenCreateOffer" as const,
    Account: account,
    NFTokenID: nftokenId,
    Amount: "0",
    Destination: destination,
    Flags: 1,
  };
}

export function buildAcceptSellOffer({ account, offerId }: XrplAcceptOfferFields) {
  return {
    TransactionType: "NFTokenAcceptOffer" as const,
    Account: account,
    NFTokenSellOffer: offerId,
  };
}

type LedgerNode = {
  CreatedNode?: {
    LedgerEntryType?: string;
    LedgerIndex?: string;
    NewFields?: {
      NFTokens?: Array<{ NFToken?: { NFTokenID?: string } }>;
    };
  };
};

export function extractCreatedNFTokenId(meta: unknown): string | undefined {
  const nodes = (meta as { AffectedNodes?: LedgerNode[] } | undefined)?.AffectedNodes ?? [];
  for (const node of nodes) {
    const tokens = node.CreatedNode?.NewFields?.NFTokens ?? [];
    const nftokenId = tokens.find((token) => token.NFToken?.NFTokenID)?.NFToken?.NFTokenID;
    if (nftokenId) return nftokenId;
  }
  return undefined;
}

export function extractCreatedOfferId(meta: unknown): string | undefined {
  const nodes = (meta as { AffectedNodes?: LedgerNode[] } | undefined)?.AffectedNodes ?? [];
  return nodes.find((node) => node.CreatedNode?.LedgerEntryType === "NFTokenOffer")?.CreatedNode?.LedgerIndex;
}

export function assertValidatedSuccess(response: unknown, label: string): void {
  const result = (response as { result?: { validated?: boolean; meta?: { TransactionResult?: string } } }).result;
  const transactionResult = result?.meta?.TransactionResult;
  if (!result?.validated || transactionResult !== "tesSUCCESS") {
    throw new Error(`${label} did not validate successfully${transactionResult ? ` (${transactionResult})` : ""}.`);
  }
}
