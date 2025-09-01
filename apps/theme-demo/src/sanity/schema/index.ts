import { type SchemaTypeDefinition } from 'sanity';
import { schemaDefs } from '@zilfire/core-theme/sanity-schema';
import page from './documents/page';
import settings from './documents/settings';
import homePage from './documents/home-page';

const schemaTypes: { types: SchemaTypeDefinition[] } = {
  types: [...schemaDefs, page, settings, homePage],
};
export default schemaTypes;
