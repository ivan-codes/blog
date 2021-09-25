import Layout from "components/Layout";
import { format } from "fecha";
import fs from "fs";
import matter from "gray-matter";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";
import { remark } from "remark";
import html from "remark-html";
hljs.registerLanguage("javascript", javascript);

type Props = {
  title: string;
  contentHtml: string;
  data: any;
};

function Post({ contentHtml, data }: Props) {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <Layout title={data.title} description={data.description}>
      <div className="text-center mb-8">
        <h1>{data.title}</h1>
        <p className="text-trueGray-500">
          {format(new Date(data.createdAt), "MMMM Do, YYYY")}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  title: string;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
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
