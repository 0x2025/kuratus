import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark:text-white">
      <Head />
      <body className="selection:bg-green-500 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
