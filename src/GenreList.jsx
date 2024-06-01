export default function GenreList({ selectedGenres }) {
  return (
    <>
      <div className="mt-3">
        {selectedGenres.map((genre, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
          >
            {genre}
            <button
              type="button"
              className="ml-1 text-indigo-800 hover:text-indigo-600 focus:outline-none"
            >
              {/* <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg> */}
            </button>
          </span>
        ))}
      </div>
    </>
  );
}
