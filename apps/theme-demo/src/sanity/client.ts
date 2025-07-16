import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, readToken } from "./env";

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: "/studio" },
  token: readToken,
  perspective: "drafts",
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: false,
});

export const cdnClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: true,
});
