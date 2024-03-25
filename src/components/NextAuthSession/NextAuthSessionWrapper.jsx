"use client";
import { SessionProvider } from "next-auth/react";
function NextAuthSessionWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionWrapper;
