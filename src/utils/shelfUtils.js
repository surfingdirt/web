export const PAGE_TOP_ID = 'page-top';

// Adapter from category name to DOM id
export const getIdFromCategoryName = (category) => {
  if (!category) {
    return PAGE_TOP_ID;
  }
  return `${category}`;
}

// Adapter from DOM id to category name
export const getCategoryNameFromId = (id) => {
  if (!id || id === PAGE_TOP_ID) {
    return null;
  }
  return `${id}`;
}