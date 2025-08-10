import Layout from "@/components/layout/Layout";
import MainContextWrapper from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <MainContextWrapper>
      {pathName == "/auth/login" || pathName == "/auth/signup" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </MainContextWrapper>
  );
}
