import { HeroBlock } from '@zilfire/core-theme/web/blocks';

export default function Home() {
  return (
    <>
      <header className="my-12">Header</header>
      <main className="grow flex flex-col">
        <HeroBlock />
        <div className="container mx-auto px-4 py-16 flex flex-col grow">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Theme Demo</h1>
          <p className="text-lg mb-8">This is a demonstration of the theme capabilities.</p>
          <div className="bg-gray-300 grow">
            <div>filler</div>
          </div>
        </div>
      </main>
    </>
  );
}
