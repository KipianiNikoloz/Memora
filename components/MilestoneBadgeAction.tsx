"use client";

import type { MemoryEntry } from "@/lib/types";
import { isMilestoneBadgeEligible, publicXrplNftUrl, publicXrplTxUrl } from "@/lib/xrpl-badges";
import { useMemora } from "./MemoraClient";
import { controlMotion, m } from "./Motion";

type MilestoneBadgeActionProps = {
  entry: MemoryEntry;
  compact?: boolean;
};

export function MilestoneBadgeAction({ entry, compact = false }: MilestoneBadgeActionProps) {
  const { badges, demoBadgeWallet, createDemoBadgeWallet, issueMilestoneBadge } = useMemora();
  const badge = badges.find((item) => item.entryId === entry.id);
  const eligible = isMilestoneBadgeEligible(entry);

  if (!eligible) return null;

  const issuing = badge?.status === "pending";
  const issued = badge?.status === "issued";

  return (
    <div className={compact ? "badge-action badge-action-compact" : "badge-action"}>
      <div>
        <h3>{compact ? "XRPL Badge" : "XRPL Milestone Badge"}</h3>
        <p className="muted">
          {issued
            ? "Issued as a non-transferable XRPL Testnet badge."
            : "Create a private-safe Testnet keepsake for this milestone."}
        </p>
      </div>

      {demoBadgeWallet ? (
        <p className="muted badge-wallet">Demo wallet: {demoBadgeWallet.address}</p>
      ) : (
        <m.button className="button button-secondary" type="button" {...controlMotion} onClick={() => void createDemoBadgeWallet()}>
          Create testnet wallet
        </m.button>
      )}

      <m.button
        className="button button-primary"
        disabled={issuing || issued}
        type="button"
        {...controlMotion}
        onClick={() => void issueMilestoneBadge(entry.id)}
      >
        {issued ? "Badge issued" : issuing ? "Issuing..." : "Issue badge"}
      </m.button>

      {badge?.error ? <p className="error">{badge.error}</p> : null}
      {issued ? (
        <div className="badge-links">
          {publicXrplNftUrl(badge.nftokenId) ? <a href={publicXrplNftUrl(badge.nftokenId)} rel="noreferrer" target="_blank">View NFT</a> : null}
          {publicXrplTxUrl(badge.acceptTxHash) ? <a href={publicXrplTxUrl(badge.acceptTxHash)} rel="noreferrer" target="_blank">View transfer</a> : null}
        </div>
      ) : null}
    </div>
  );
}
