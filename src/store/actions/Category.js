export function changeCategory(category, categoryName) {
  return {
    type: "CHANGE_CATEGORY",
    category,
    categoryName,
  };
}
