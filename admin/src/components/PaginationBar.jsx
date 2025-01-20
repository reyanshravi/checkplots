import React, { useState } from "react";

const PaginationBar = ({
  totalRecords = 61,
  pageSizeOptions = [10, 20, 50],
  defaultPageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on page size change
  };

  return (
    <div className="flex items-center justify-between py-2 px-4 rounded-md mt-5">
      {/* Page Size Selector */}
      <div className="flex items-center">
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded-md px-2 py-1"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="ml-2 text-sm text-gray-600">
          Show from {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, totalRecords)} in {totalRecords}{" "}
          records
        </span>
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 border rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 border rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
