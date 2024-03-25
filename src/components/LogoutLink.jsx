"use client";
import "./component.css"

import { signOut } from "next-auth/react";

export default () => <button className="logoutbtn" onClick={() => signOut()}>Sign out</button>;

