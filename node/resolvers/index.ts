import {
  queries as masterDataQueries,
  mutations as masterDataMutations,
} from './masterData'

export const resolvers = {
  Query: {
    ...masterDataQueries,
  },
  Mutation: {
    ...masterDataMutations,
  },
}
