// [1,2,3,4,5,..., 7]
// [1,2,3,...,48, 49, 50]
export const generatePaginationNumbers = ( currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less
  // we will show all pages without ellipsis.
  if ( totalPages <= 7 ) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);  // [1,2,3,4,5,6,7];
  }
  // If the current page is among the first 3 pages
  // show the first 3, ellipsis, and the last 2.
  if ( currentPage <= 3 ) {
    return [1,2,3,'...', totalPages -1 , totalPages]; //[1,2,3, '...', 49,50];
  }
  // If the current page is among the last 3 pages
  // show the first 2, ellipsis, the last 3 pages.
  if ( currentPage >= totalPages - 2 ) {
    return [1,2, '...', totalPages -2, totalPages -1, totalPages];
  }
  // If the current page is somewhere in the middle
  // show the first page, ellipsis, the current page and neighbors.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
} 