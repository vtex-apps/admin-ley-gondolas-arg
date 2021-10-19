import {
  queries as masterDataQueries,
  mutations as masterDataMutations,
} from './masterData'
import { queries as catalogQueries } from './catalog'

export const resolvers = {
  Query: {
    ...masterDataQueries,
    ...catalogQueries,
  },
  Mutation: {
    ...masterDataMutations,
  },
}
