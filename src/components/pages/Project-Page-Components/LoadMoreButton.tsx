// Icon placeholder: replace the inline <svg> below with your final SVG code

interface LoadMoreButtonProps {
  showing: number;
  total: number;
  onLoadMore: () => void;
  loading?: boolean;
}

const LoadMoreButton = ({
  showing,
  total,
  onLoadMore,
  loading = false,
}: LoadMoreButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-4 my-12">
      <p className="text-gray-600 urbanist-font text-base">
        Showing {showing} - {Math.min(showing + 8, total)} of {total}
      </p>
      {/*TODO:replace with showing < total */}
      {true && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="inline-flex items-center gap-3 bg-[#4A90E2] text-white nohemi-font font-medium text-base px-6 py-3 rounded-md hover:bg-[#357ABD] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Load more projects</span>

          
          <span
            aria-hidden
            className="w-5 h-5 inline-flex items-center justify-center"
          >
             
            <svg
              width="24"
              height="24"
              className={`${loading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1915_2891)">
                <path
                  d="M12 13V22M12 22L15.5 18.5M12 22L8.5 18.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 17.6073C21.4937 17.0221 23 15.6889 23 13C23 9 19.6667 8 18 8C18 6 18 2 12 2C6 2 6 6 6 8C4.33333 8 1 9 1 13C1 15.6889 2.50628 17.0221 4 17.6073"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1915_2891">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
