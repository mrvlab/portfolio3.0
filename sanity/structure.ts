import type { StructureBuilder, StructureResolver } from 'sanity/structure';

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

// Schema imports

import * as pages from './schemaTypes/pages';
import * as references from './schemaTypes/references';
import * as singletons from './schemaTypes/singletons';

const allPages = Object.values(pages);
const pagesSchemas = allPages.sort((a, b) => {
  if (a.name === 'page') return -1; // page always first
  if (b.name === 'page') return 1; // page always first
  return 0; // maintain original order for everything else
});
const referencesSchemas = Object.values(references);
const singletonSchemas = Object.values(singletons);

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio')
    .items([
      // Pages
      ...pagesSchemas.map((schema) =>
        S.documentTypeListItem(schema.name).title(schema.title || schema.name)
      ),

      S.divider(),

      // References
      S.listItem()
        .title('References')
        .child(
          S.list()
            .title('References')
            .items(
              referencesSchemas.map((schema) =>
                S.documentTypeListItem(schema.name).title(
                  schema.title || schema.name
                )
              )
            )
        ),

      S.divider(),

      // Global singletons
      ...singletonSchemas.map((schema) =>
        S.listItem()
          .title(schema.title || schema.name)
          .child(S.document().schemaType(schema.name).documentId(schema.name))
          .icon(schema.icon || undefined)
      ),
    ]);
