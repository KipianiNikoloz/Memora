"use client";

import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { type AuthMode, useMemora } from "@/components/MemoraClient";

export default function AuthPage() {
  const router = useRouter();
  const { error: runtimeError, loading, mode: runtimeMode, signIn, user } = useMemora();
  const [authMode, setAuthMode] = useState<AuthMode>("sign-up");
  const [email, setEmail] = useState("demo@memora.local");
  const [password, setPassword] = useState("memora-demo");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (runtimeMode === "supabase" && !loading && user) {
      router.replace("/library");
    }
  }, [loading, router, runtimeMode, user]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    if (!email.includes("@") || password.length < 6) {
      setError("Use an email and a password of at least six characters.");
      return;
    }
    setSubmitting(true);
    const result = await signIn(email, password, authMode);
    setSubmitting(false);

    if (result.status === "signed-in") {
      router.push("/library");
      return;
    }

    if (result.status === "check-email") {
      setNotice(result.message ?? "Check your email to confirm your account before signing in.");
      return;
    }

    setError(result.message ?? "We could not complete authentication.");
  }

  return (
    <div className="page-shell">
      <TopNav />
      <main className="section" style={{ maxWidth: 560, margin: "0 auto" }}>
        <form className="form-card" onSubmit={submit}>
          <h1 className="app-title">Memora</h1>
          <p className="muted">A library for your life. Your memories matter.</p>
          <div className="chip-row" role="tablist" aria-label="Authentication mode" style={{ marginBottom: 18 }}>
            <button
              aria-label="Sign in tab"
              aria-selected={authMode === "sign-in"}
              className={`chip ${authMode === "sign-in" ? "chip-active" : ""}`}
              onClick={() => setAuthMode("sign-in")}
              role="tab"
              type="button"
            >
              Sign in
            </button>
            <button
              aria-label="Create account tab"
              aria-selected={authMode === "sign-up"}
              className={`chip ${authMode === "sign-up" ? "chip-active" : ""}`}
              onClick={() => setAuthMode("sign-up")}
              role="tab"
              type="button"
            >
              Create account
            </button>
          </div>
          <label className="field">
            <span><Mail size={15} /> Email address</span>
            <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="field">
            <span><Lock size={15} /> Password</span>
            <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {runtimeError ? <p className="error">{runtimeError}</p> : null}
          {error ? <p className="error">{error}</p> : null}
          {notice ? <p className="success">{notice}</p> : null}
          <button className="button button-primary" disabled={loading || submitting} type="submit" style={{ width: "100%" }}>
            {submitting ? "Opening your library..." : authMode === "sign-in" ? "Sign in" : "Create account"}
          </button>
          <p className="muted" style={{ fontSize: 13 }}>
            By continuing, you agree to our Terms and Privacy Policy. Demo mode uses local storage; production mode uses Supabase Auth and private database rows.
          </p>
        </form>
      </main>
    </div>
  );
}
