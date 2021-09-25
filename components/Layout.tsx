import Head from "next/head";
import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
};

function Layout({
  children,
  title = "Ivan's Blog",
  description = "Ivan Codes' Blog",
}: Props) {
  return (
    <div className="w-full h-full">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="page-layout">
        <header className="flex py-4">
          <Link href="/" passHref>
            <span className="w-max cursor-pointer">Ivan Codes</span>
          </Link>
          <div className="grid grid-flow-col gap-4 ml-auto">
            <a
              href="https://twitter.com/ivan_codes"
              rel="noopener noreferrer"
              target="_blank"
            >
              Twitter
            </a>
            <a
              href="https://github.com/ivan-codes"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
          </div>
        </header>
        <div className="flex flex-col">
          {children}
          <footer className="flex items-center h-24 mt-auto"></footer>
        </div>
      </div>
    </div>
  );
}

export default Layout;
