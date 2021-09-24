import Layout from "components/Layout";
import React from "react";
import PostPreview from "components/PostPreview";

function Home() {
  return (
    <Layout title="Ivan Codes' Blog">
      <h1 className="mb-6">Blog about web dev</h1>
      <section>
        <PostPreview />
        <PostPreview />
        <PostPreview />
      </section>
    </Layout>
  );
}

export default Home;
