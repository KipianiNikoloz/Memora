import { describe, expect, it } from "vitest";
import { XRPL_TESTNET_SERVER } from "@/lib/xrpl-badges";
import { getXrplIssuerSeed, getXrplServerUrl, xrplIssuerSeedEnvNames } from "@/lib/xrpl-config";

describe("XRPL config", () => {
  it("reads the primary issuer seed variable", () => {
    expect(getXrplIssuerSeed({ XRPL_TESTNET_ISSUER_SEED: " sIssuerSeed " })).toBe("sIssuerSeed");
  });

  it("accepts common issuer seed aliases", () => {
    expect(getXrplIssuerSeed({ XRPL_TESTNET_SEED: "sTestnetSeed" })).toBe("sTestnetSeed");
    expect(getXrplIssuerSeed({ XRPL_ISSUER_SEED: "sIssuerSeed" })).toBe("sIssuerSeed");
  });

  it("returns undefined when issuer seed variables are blank", () => {
    expect(getXrplIssuerSeed({ XRPL_TESTNET_ISSUER_SEED: "  " })).toBeUndefined();
  });

  it("documents supported issuer seed variables for runtime errors", () => {
    expect(xrplIssuerSeedEnvNames()).toContain("XRPL_TESTNET_ISSUER_SEED");
  });

  it("uses the configured testnet server or the default", () => {
    expect(getXrplServerUrl({ XRPL_TESTNET_SERVER_URL: " wss://example.test/ " })).toBe("wss://example.test/");
    expect(getXrplServerUrl({})).toBe(XRPL_TESTNET_SERVER);
  });
});
