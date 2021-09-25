import React from "react";
import Link from "next/link";
import { format } from "fecha";

type Props = {
  title: string;
  description: string;
  createdAt: string;
  pathname: string;
};

function PostPreview({ title, description, createdAt, pathname }: Props) {
  return (
    <article className="mb-10">
      <Link href={`/p/${pathname}`} passHref>
        <h3 className="cursor-pointer mb-0 hover:underline">{title}</h3>
      </Link>
      <p className="text-trueGray-500 mb-1">
        {format(new Date(createdAt), "MMMM Do, YYYY")}
      </p>
      <p className="text-trueGray-700 line-clamp-3 dark:text-trueGray-400">
        {description}
      </p>
    </article>
  );
}

export default PostPreview;
