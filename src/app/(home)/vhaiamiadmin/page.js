import { auth } from "@/auth";
import Link from "next/link";
import LogoutLink from "@/components/LogoutLink";
import "./style.css"

async function page() {
  // Get session value from AUTH.
  const session = await auth();

  return (
    <div className="signindiv" style={{ color: "black", marginTop: "70px" }}>
      {session && <LogoutLink />}
      {!session && <Link href="/api/auth/signin" className="loginLink">sign in</Link>}
    </div>
  );
}

export default page;
