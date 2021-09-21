import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { remark } from "remark";
import html from "remark-html";

type Props = {
  title: string;
  contentHtml: string;
  data: any;
};

function Post({ title, contentHtml, data }: Props) {
  console.log(title, contentHtml, data);
  return (
    <div>
      <h1>{title}</h1>
      <div
        className="font-serif prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
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
