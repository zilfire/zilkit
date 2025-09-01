import { type SchemaTypeDefinition } from 'sanity';
import { faqBlock, heroBlock } from './blocks';
import { blockContent, richText, figure } from './objects';

export const schemaDefs: SchemaTypeDefinition[] = [
  faqBlock,
  heroBlock,
  blockContent,
  richText,
  figure,
];

export default schemaDefs;
