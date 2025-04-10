"use client";

import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import CustomLoading from "../components/CustomLoading";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      if (status === "authenticated") {
        redirect("/admin/pusb");
      } else if (status === "unauthenticated") {
        redirect("/auth/signin");
      }
    } else {
      redirect("/auth/signin");
    }
  }, [status, session]);

  if (status === "loading") {
    return <CustomLoading />;
  }

  redirect("/admin/pusb");
}
