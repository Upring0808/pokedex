import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(start + 4, totalPages);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        className={`px-3 py-1 border rounded-lg transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
        (page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded-xl  transition-colors ${
              currentPage === page
                ? " bg-yellow-400 text-white hover:bg-yellow-800"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={`px-3 py-1 border rounded-lg transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "hover:bg-gray-100 text-gray-700"
        }`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
