"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2">
      <span>
        page {currentPage} of {pageCount}
      </span>
      <Button
        color="gray"
        disabled={currentPage == 1}
        onClick={() => {
          changePage(1);
        }}
      >
        <ChevronsLeft />
      </Button>
      <Button
        color="gray"
        disabled={currentPage == 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
      >
        <ChevronLeft />
      </Button>
      <Button
        color="gray"
        disabled={currentPage == pageCount}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        disabled={currentPage == pageCount}
        onClick={() => {
          changePage(pageCount);
        }}
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
