import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Leafpress Energy Insight</title>
      </Head>
      {children}
      <Toaster />
    </>
  );
}
