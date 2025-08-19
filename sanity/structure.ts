import { CogIcon } from '@sanity/icons';
import type {
  StructureBuilder,
  StructureResolver,
  ListItemBuilder,
} from 'sanity/structure';
import pluralize from 'pluralize-esm';

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

// Schema imports

import * as documents from './schemaTypes/documents';
import * as references from './schemaTypes/references';
import * as singletons from './schemaTypes/singletons';

const documentsSchemas = Object.values(documents);
const referencesSchemas = Object.values(references);
const singletonSchemas = Object.values(singletons);

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Portfolio')
    .items([
      // Documents
      ...documentsSchemas.map((schema) =>
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
