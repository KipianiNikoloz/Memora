"use client";

import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { useMemora } from "@/components/MemoraClient";

export default function AuthPage() {
  const router = useRouter();
  const { signIn } = useMemora();
  const [email, setEmail] = useState("demo@memora.local");
  const [password, setPassword] = useState("memora-demo");
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError("Use an email and a password of at least six characters.");
      return;
    }
    signIn(email);
    router.push("/library");
  }

  return (
    <div className="page-shell">
      <TopNav />
      <main className="section" style={{ maxWidth: 560, margin: "0 auto" }}>
        <form className="form-card" onSubmit={submit}>
          <h1 className="app-title">Memora</h1>
          <p className="muted">A library for your life. Your memories matter.</p>
          <label className="field">
            <span><Mail size={15} /> Email address</span>
            <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="field">
            <span><Lock size={15} /> Password</span>
            <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button className="button button-primary" type="submit" style={{ width: "100%" }}>Create account</button>
          <p className="muted" style={{ fontSize: 13 }}>
            By continuing, you agree to our Terms and Privacy Policy. Demo mode uses local storage unless Supabase credentials are configured.
          </p>
        </form>
      </main>
    </div>
  );
}
