import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "../actions";
import { isAuthenticated } from "@/lib/auth";
import { siteBrand } from "@/lib/site-content";

export const metadata = { title: "Admin sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthenticated()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main className="login-page">
      <Link className="login-brand" href="/" aria-label={`${siteBrand.name}, home`}><span>STUDIO</span><strong>MALSKO</strong></Link>
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