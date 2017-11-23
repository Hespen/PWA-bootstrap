import { mergeTypes } from 'merge-graphql-schemas';

import query from './query.graphqls';

const typesArray = [
  query,
];

export default mergeTypes(typesArray);
