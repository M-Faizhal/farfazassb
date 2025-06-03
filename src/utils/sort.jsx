// utils/sort.js
export const sortIcon = (sortField, field, sortOrder) => {
  if (sortField !== field) return '⇅';
  return sortOrder === 'asc' ? '↑' : '↓';
};
