import React from "react";
import Link from "next/link";

function PostPreview() {
  return (
    <article className="mb-12">
      <Link href="/p/test" passHref>
        <h3 className="w-max cursor-pointer mb-0 hover:underline">
          The Title of the Post Here
        </h3>
      </Link>
      <p className="text-trueGray-500 mb-1">September 24, 2021</p>
      <p className="text-trueGray-700 line-clamp-3 dark:text-trueGray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et erat
        purus. Nulla ex ex, consequat eu aliquet id, finibus in ex. Suspendisse
        potenti. Fusce nec nulla sit amet elit auctor tincidunt. Suspendisse vel
        ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        erat purus. Nulla ex ex, consequat eu aliquet id, finibus in ex.
        Suspendisse potenti. Fusce nec nulla sit amet elit auctor tincidunt.
        Suspendisse vel ante
      </p>
    </article>
  );
}

export default PostPreview;
