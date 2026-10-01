import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { isAuthenticated } from "@/lib/auth";

export const metadata = { title: "Admin sign in — FRAME/24" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="login-page">
      <Link className="login-brand" href="/" aria-label="FRAME 24, home"><span>FRAME</span><strong>/24</strong></Link>
      <form action={login} className="login-panel">
        <p className="eyebrow">Portfolio administration</p>
        <h1>Welcome<br />back.</h1>
        <label>Password<input name="password" type="password" required autoFocus /></label>
        {error && <p className="form-error">Incorrect password.</p>}
        <button type="submit">Sign in <ArrowRight aria-hidden="true" /></button>
      </form>
    </main>
  );
}