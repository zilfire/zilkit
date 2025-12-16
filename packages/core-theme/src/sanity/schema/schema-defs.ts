import { type SchemaTypeDefinition } from 'sanity';
import { faqBlock, heroBlock, mediaContentBlock, featuresBlock } from './blocks/index.js';
import { blockContent, richText, figure, button, icon } from './objects/index.js';

export const schemaDefs: SchemaTypeDefinition[] = [
  faqBlock,
  heroBlock,
  blockContent,
  richText,
  figure,
  button,
  icon,
  mediaContentBlock,
  featuresBlock,
];

export default schemaDefs;
