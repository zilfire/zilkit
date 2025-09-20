import { type SchemaTypeDefinition } from 'sanity';
import { faqBlock, heroBlock } from './blocks/index.js';
import { blockContent, richText, figure } from './objects/index.js';

export const schemaDefs: SchemaTypeDefinition[] = [
  faqBlock,
  heroBlock,
  blockContent,
  richText,
  figure,
];

export default schemaDefs;
