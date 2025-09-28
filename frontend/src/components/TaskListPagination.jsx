import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';


const TaskListPagination = ({ handleNext, handlePrev, handlePageChange, page, totalPage }) => {
  const generatePage = () => {
    const pages = [];

    if (totalPage < 4) {
      // Hiển thị tất cả trang
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", totalPage);
      } else if (page >= totalPage - 1) {
        pages.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
      } else {
        pages.push(1, "...", page, "...", totalPage);
      }
    }

    return pages;
  };

  const pageToShow = generatePage();

  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                page === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Pages */}
          {pageToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                  <PaginationLink
                    onClick={() => {
                      if (p !== page) handlePageChange(p);
                    }}
                    className={cn(
                      "cursor-pointer",
                      p === page ? "text-black bg-white shadow-lg font-bold" : ""
                    )}
                  >
                    {p}
                  </PaginationLink>

              )}
            </PaginationItem>
          ))}


          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPage ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                page === totalPage && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
