import {
  HeroBlock,
  FaqBlock,
  MediaContentBlock,
  FeaturesBlock,
} from '@zilfire/core-theme/web/blocks';
// import type { HeroBlockOptions } from '@zilfire/core-theme/web/blocks';
import { HOME_QUERY, HomeQueryData } from '@/sanity/queries';
import { client } from '@/sanity/client';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode();

  console.log('Draft mode enabled:', isEnabled);

  const homeData: HomeQueryData = await client.fetch(
    HOME_QUERY,
    {},
    { perspective: isEnabled ? 'drafts' : 'published' }
  );

  const {
    hero: heroData,
    faq: faqData,
    mediaContent: mediaContentData,
    features: featuresBlockData,
  } = homeData;

  return (
    <>
      <main className="grow flex flex-col">
        {heroData && (
          <HeroBlock
            data={heroData}
            id="home-hero"
            aria-labelledby="home-hero-heading"
            contentIds={{
              heading: 'home-hero-heading',
              description: 'home-hero-description',
              buttonGroup: 'home-hero-buttons',
            }}
          />
        )}
        {mediaContentData && (
          <MediaContentBlock
            data={mediaContentData}
            sectionStyleOptions={{ backgroundColor: 'muted' }}
            id="about-zilkit"
          />
        )}
        {featuresBlockData && <FeaturesBlock data={featuresBlockData} id="features" />}
        {faqData && (
          <FaqBlock
            data={faqData}
            options={{
              headlineOptions: { as: 'h3' },
              sectionOptions: { styleOptions: { backgroundColor: 'muted' } },
            }}
            id="faq"
          />
        )}
        <div className="bg-gray-100 flex flex-col grow"></div>
      </main>
    </>
  );
}
