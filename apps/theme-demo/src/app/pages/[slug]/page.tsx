import { getPageBySlug } from "../../../../lib/queries";
import { client } from "@/sanity/client";
import { draftMode } from "next/headers";
import PortableTextComponent from "../../../../components/PortableText";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;

  const data = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  );

  if (!data) {
    notFound();
  }

  console.log("data:", data);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h1>
        </header>

        <main className="max-w-4xl mx-auto">
          {data.content && (
            <PortableTextComponent
              value={data.content}
              className="text-gray-800 dark:text-gray-200"
            />
          )}
        </main>
      </div>
    </div>
  );
}

// export async function generateMetadata({ params }: PageProps) {
//   const page = await getClient().fetch(
//     `*[_type == "page" && slug.current == $slug][0]`,
//     { slug: params.slug }
//   );

//   if (!page) return {};

//   return {
//     title: page.seo?.metaTitle || page.title,
//     description: page.seo?.metaDescription,
//   };
// }
