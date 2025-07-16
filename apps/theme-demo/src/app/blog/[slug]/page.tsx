import { getPostBySlug } from "../../../../lib/queries";
import { getClient } from "../../../../lib/sanity";
import PortableTextComponent from "../../../../components/PortableText";
import SanityImage from "../../../../components/SanityImage";
import { notFound } from "next/navigation";
import { format } from "date-fns";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getClient().fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>
            )}

            {post.publishedAt && (
              <time className="text-gray-500 dark:text-gray-400">
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </time>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.featuredImage && (
            <div className="mb-12">
              <SanityImage
                image={post.featuredImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          )}

          <main>
            {post.content && (
              <PortableTextComponent
                value={post.content}
                className="text-gray-800 dark:text-gray-200"
              />
            )}
          </main>
        </article>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: BlogPostProps) {
  const post = await getClient().fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}
