import { createClient } from 'next-sanity';
import type { SanityConfig } from '@zilfire/core-theme/context';

import { apiVersion, dataset, projectId, readToken } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: { studioUrl: '/studio' },
  token: readToken,
  perspective: 'published',
});

export const sanityConfig: SanityConfig = {
  sanityProjectId: projectId,
  sanityDataset: dataset,
  sanityApiVersion: apiVersion,
  sanityUseCdn: true,
};

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
//   stega: false,
// });

// export const cdnClient = createClient({
//   apiVersion,
//   dataset,
//   projectId,
//   useCdn: true,
// });
