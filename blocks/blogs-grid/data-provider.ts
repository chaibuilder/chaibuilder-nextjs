import type { ChaiBlock } from "@chaibuilder/pages";

export const blogsGridDataProvider = async ({
  block,
}: {
  block: ChaiBlock;
}) => {
  const { blogCount } = block;
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  // pick on 10 posts
  const data = await response.json();
  const posts = data.slice(0, blogCount || 3);
  const blogs = posts.map(
    (
      item: {
        id: string;
        title: string;
        url: string;
        thumbnailUrl: string;
      },
      index: number
    ) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      thumbnailUrl: "https://picsum.photos/200/30" + index,
    })
  );
  return { blogs, $metadata: { pageType: "BlogsList" } };
};
