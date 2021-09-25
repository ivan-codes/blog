import Layout from "components/Layout";
import PostPreview from "components/PostPreview";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import path from "path";
import React from "react";
import extractPostData, { PostData } from "utils/extractPostData";

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
    return extractPostData(parsedMarkdown.data, file.replace(".md", ""));
  });

  postsData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return {
    props: {
      postsData: postsData,
    },
  };
};

export default Home;
