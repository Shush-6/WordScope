export default function Header({
  title,
  count,
  onRemove,
}: {
  title: string;
  count: number;
  onRemove: () => void;
}) {
  return (
    <div className="w-full px-4 py-3 flex items-center justify-between bg-gray-800 border-b border-gray-700">
      
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-white">
          {title}
        </h2>

        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {count}
        </span>
      </div>

      <button
        type="button"
        onClick={onRemove}
        className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

    </div>
  );
}