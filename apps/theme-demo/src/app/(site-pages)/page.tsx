import { HeroBlock, FaqBlock, MediaContentBlock } from '@zilfire/core-theme/web/blocks';
// import type { HeroBlockOptions } from '@zilfire/core-theme/web/blocks';
import { HOME_QUERY, HomeQueryData } from '@/sanity/queries';
import { client } from '@/sanity/client';
import { themeContext } from '@/context';
import { draftMode } from 'next/headers';

export default async function Home() {
  const { isEnabled } = await draftMode();
  const homeData: HomeQueryData = await client.fetch(
    HOME_QUERY,
    {},
    { perspective: isEnabled ? 'drafts' : 'published' }
  );

  const { hero: heroData, faq: faqData, mediaContent: mediaContentData } = homeData;

  // const options: HeroBlockOptions = {
  //   // overlayOptions: {
  //   //   overlayColor: 'neutral',
  //   //   overlayColorTone: 'darkest',
  //   //   overlayOpacity: 'shade',
  //   // },
  // };

  return (
    <>
      <main className="grow flex flex-col">
        {heroData && (
          <HeroBlock
            data={heroData}
            context={themeContext}
            id="home-hero"
            aria-labelledby="home-hero-heading"
            contentIds={{
              heading: 'home-hero-heading',
              description: 'home-hero-description',
              buttonGroup: 'home-hero-buttons',
            }}
          />
        )}
        {mediaContentData && <MediaContentBlock data={mediaContentData} context={themeContext} />}
        {faqData && (
          <FaqBlock
            data={faqData}
            context={themeContext}
            options={{
              headlineOptions: { as: 'h3' },
              sectionOptions: { styleOptions: { backgroundColor: 'muted' } },
            }}
          />
        )}
        <div className="bg-gray-100 flex flex-col grow"></div>
      </main>
    </>
  );
}
