/* eslint-disable @typescript-eslint/no-explicit-any */
export const queries = {
  getCategoryTree: async (
    _: unknown,
    __: unknown,
    ctx: Context
  ): Promise<any> => {
    return ctx.clients.catalogClient.getCategoryTree()
  },
  getProductsOfCategory: async (
    _: unknown,
    { categoryTree, from, to, params }: any,
    ctx: Context
  ): Promise<any> => {
    return ctx.clients.catalogClient.getProductsOfCategory(categoryTree, from, to, params)
  },
}
