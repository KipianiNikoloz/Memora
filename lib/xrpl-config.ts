import { XRPL_TESTNET_SERVER } from "./xrpl-badges";

const issuerSeedEnvNames = ["XRPL_TESTNET_ISSUER_SEED", "XRPL_TESTNET_SEED", "XRPL_ISSUER_SEED"] as const;

type XrplEnv = Partial<Record<string, string | undefined>>;

export function getXrplIssuerSeed(env: XrplEnv = process.env): string | undefined {
  for (const name of issuerSeedEnvNames) {
    const value = env[name]?.trim();
    if (value) return value;
  }

  return undefined;
}

export function getXrplServerUrl(env: XrplEnv = process.env): string {
  return env.XRPL_TESTNET_SERVER_URL?.trim() || XRPL_TESTNET_SERVER;
}

export function xrplIssuerSeedEnvNames(): readonly string[] {
  return issuerSeedEnvNames;
}
