import Layout from "components/Layout";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";
import { remark } from "remark";
import html from "remark-html";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

type Props = {
  title: string;
  contentHtml: string;
  data: any;
};

function Post({ title, contentHtml, data }: Props) {
  console.log(title, contentHtml, data);
  useEffect(() => {
    hljs.initHighlighting();
  }, []);
  return (
    <Layout title={title}>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  title: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { title } = context.params as IParams;

  const markdown = fs.readFileSync(path.join("posts", `${title}.md`), "utf-8");

  const parsedMarkdown = matter(markdown);

  const contentHtml = (
    await remark().use(html).process(parsedMarkdown.content)
  ).toString();

  return {
    props: {
      title: title,
      contentHtml: contentHtml,
      data: parsedMarkdown.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: {
      title: file.replace(".md", ""),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export default Post;
