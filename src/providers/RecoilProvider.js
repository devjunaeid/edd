"use client";
import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }) {
  return <RecoilRoot lang="en">{children}</RecoilRoot>;
}
