import { getPageBySlug } from "../../../../lib/queries";
import { getClient } from "../../../../lib/sanity";
import PortableTextComponent from "../../../../components/PortableText";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getClient().fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {page.title}
          </h1>
          {page.seo?.metaDescription && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {page.seo.metaDescription}
            </p>
          )}
        </header>

        <main className="max-w-4xl mx-auto">
          {page.content && (
            <PortableTextComponent
              value={page.content}
              className="text-gray-800 dark:text-gray-200"
            />
          )}
        </main>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const page = await getClient().fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: params.slug }
  );

  if (!page) return {};

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
  };
}
