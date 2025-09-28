import { HeroBlock } from '@zilfire/core-theme/web/blocks';
import type { HeroBlockOptions } from '@zilfire/core-theme/web/blocks';
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

  const { hero: heroData } = homeData;

  const options: HeroBlockOptions = {
    overlayOptions: {
      overlayColor: 'neutral',
      overlayColorTone: 'darkest',
      overlayOpacity: 'shade',
    },
  };

  return (
    <>
      <header className="my-12">Header</header>
      <main className="grow flex flex-col">
        {heroData && <HeroBlock data={heroData} context={themeContext} options={options} />}
        <div className="container mx-auto px-4 py-16 flex flex-col grow"></div>
      </main>
    </>
  );
}
