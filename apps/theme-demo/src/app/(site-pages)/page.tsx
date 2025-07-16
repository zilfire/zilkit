export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Theme Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            A Next.js application with TypeScript, TailwindCSS 3.4.17, and
            Sanity CMS for theme development and testing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Next.js 15
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Latest Next.js with App Router
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                TypeScript
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Type-safe development
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                TailwindCSS 3.4.17
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Utility-first CSS framework
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Sanity CMS
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Headless content management
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              🚀 Sanity CMS Setup Required
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              To use the CMS features, you need to create a Sanity project and
              configure your environment variables:
            </p>
            <ol className="text-left text-yellow-700 dark:text-yellow-300 space-y-2">
              <li>
                1. Create a Sanity project at{" "}
                <a
                  href="https://www.sanity.io/manage"
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sanity.io/manage
                </a>
              </li>
              <li>
                2. Copy{" "}
                <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">
                  .env.example
                </code>{" "}
                to{" "}
                <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">
                  .env.local
                </code>
              </li>
              <li>
                3. Add your project ID and dataset to the environment variables
              </li>
              <li>
                4. Access the CMS at{" "}
                <a href="/studio" className="underline">
                  /studio
                </a>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/studio"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Open CMS Studio
            </a>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
