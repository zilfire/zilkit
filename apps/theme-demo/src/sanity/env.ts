export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-04-27";

export const readToken = assertValue(
  process.env.SANITY_API_READ_TOKEN,
  "Missing environment variable: SANITY_API_READ_TOKEN"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}

export const sanityConfig = {
  sanityProjectId: projectId,
  sanityDataset: dataset,
  sanityApiVersion: apiVersion,
  sanityUseCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true",
};
