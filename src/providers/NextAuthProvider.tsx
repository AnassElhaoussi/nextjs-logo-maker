"use client";

import { SessionProvider } from "next-auth/react";
import { Props } from "@/types";

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

