'use client';

import SanityImage from '@zilfire/next-sanity-image';
import type { SanityImageWithAlt } from '@zilfire/next-sanity-image/types';
import type React from 'react';
import { useSanityConfig } from '../../config/context.js';

type Breakpoints = number[];
type ImageSize = string | number;
type ImageSizes = ImageSize[];

type ImageProps = {
  imageObject: SanityImageWithAlt;
  lquip?: string;
  alt?: string;
  layout?: 'fill' | 'cover' | 'contain' | 'responsive';
  quality?: number;
  imageSizes?: ImageSizes | string;
  bpUnit?: string;
  breakpoints?: Breakpoints;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  sanityConfig?: {
    sanityProjectId: string;
    sanityDataset: string;
    sanityApiVersion: string;
    sanityUseCdn?: boolean;
  };
};

const Image: React.FC<ImageProps> = (props) => {
  const sanityConfig = useSanityConfig();

  return <SanityImage {...props} sanityConfig={props.sanityConfig || sanityConfig} />;
};

export default Image;
