// import { getPageBySlug } from "../../../../lib/queries";
import { client } from '@/sanity/client';
import { draftMode } from 'next/headers';
import PortableTextComponent from '../../../../../components/PortableText';
import { notFound } from 'next/navigation';
import { TestBlock, FaqBlock } from '@zilfire/core-theme/web/blocks';
import { FaqBlockData } from '@zilfire/core-theme/data-types';
import { Section } from '@zilfire/core-theme/web/components';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { isEnabled } = await draftMode();
  const { slug } = await params;

  console.log('Draft mode enabled:', isEnabled);

  const data = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
    { perspective: isEnabled ? 'drafts' : 'published' }
  );

  if (!data) {
    return notFound();
  }

  const faqData: FaqBlockData | undefined = data.faq;

  console.log('data:', data);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h1>
        </header>

        <main className="max-w-4xl mx-auto">
          <Section className="mb-8">
            <p>section content</p>
          </Section>
          <TestBlock data={{ title: 'test block title', content: 'test block content' }} />
          {data.content && (
            <PortableTextComponent
              value={data.content}
              className="text-gray-800 dark:text-gray-200"
            />
          )}
          {faqData && <FaqBlock data={faqData} />}
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
