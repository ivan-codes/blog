export type PostData = {
  title: string;
  description: string;
  createdAt: string;
  pathname: string;
};

export default function extractPostData(data: any, filename: string): PostData {
  return {
    title: data.title,
    description: data.description,
    createdAt: data.createdAt.toISOString(),
    pathname: filename,
  };
}
