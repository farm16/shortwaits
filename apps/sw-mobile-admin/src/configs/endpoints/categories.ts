export const CATEGORIES = {
  getCategories: {
    getPath: () => `/categories`,
    METHOD: "GET",
  },
  getCategory: {
    getPath: (categoryId: string) => `/category?category_id=${categoryId}`,
    METHOD: "GET",
  },
};
