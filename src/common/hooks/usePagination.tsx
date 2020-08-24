import { useState } from 'react';

type PaginationData = (Record<string, any> | string)[];

function usePagination(data: PaginationData, itemsPerPageCount = 10) {
  const [page, setPage] = useState(1);
  const step = (page - 1) * itemsPerPageCount;
  const total = Math.ceil(data.length / itemsPerPageCount);
  const items = data.slice(step, step + itemsPerPageCount);

  function onChangePage(nextPage: number) {
    if (nextPage >= 1 && nextPage <= total) {
      setPage(nextPage);
    }
  }

  return { page, total, onChangePage, items };
}

export default usePagination;
