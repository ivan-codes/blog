import Layout from "components/Layout";
import React from "react";
import PostPreview from "components/PostPreview";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostData = {
  title: string;
  description: string;
  createdAt: string;
  pathname: string;
};

type Props = {
  postsData: PostData[];
};

function Home({ postsData }: Props) {
  return (
    <Layout title="Ivan Codes' Blog">
      <h1 className="text-center mb-6">Blog about web dev</h1>
      <section>
        {postsData.map((post, idx) => (
          <PostPreview {...post} key={idx} />
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const files = fs.readdirSync("posts");

  const postsData: PostData[] = files.map((file) => {
    const markdown = fs.readFileSync(path.join("posts", file), "utf-8");
    const parsedMarkdown = matter(markdown);
    return {
      title: parsedMarkdown.data.title,
      description: parsedMarkdown.data.description,
      createdAt: parsedMarkdown.data.createdAt,
      pathname: file.replace(".md", ""),
    };
  });
  console.log(postsData);

  postsData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    props: {
      postsData: [],
    },
  };
};

export default Home;
