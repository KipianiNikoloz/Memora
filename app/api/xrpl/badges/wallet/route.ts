import { NextResponse } from "next/server";
import { Wallet } from "xrpl";

export const runtime = "nodejs";

export async function POST() {
  const wallet = Wallet.generate();

  return NextResponse.json({
    address: wallet.address,
    seed: wallet.seed,
    network: "testnet",
    createdAt: new Date().toISOString()
  });
}
