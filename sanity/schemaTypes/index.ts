import * as documents from './documents';
import * as references from './references';
import * as objects from './objects';
import * as singletons from './singletons';
import * as blocks from './blocks';

// Converting them into arrays
const allDocuments = Object.values(documents);
const allReferences = Object.values(references);
const allObjects = Object.values(objects);
const allSingletons = Object.values(singletons);
const allBlocks = Object.values(blocks);

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schema = {
  types: [
    // Documents
    ...allDocuments,
    // References
    ...allReferences,
    // Objects
    ...allObjects,
    // Blocks
    ...allBlocks,
    // Singletons
    ...allSingletons,
  ],
};
