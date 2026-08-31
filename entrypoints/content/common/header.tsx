// for handling the unmount portion
export default function Header({
    title,
    count,
    onRemove
}:
    {
    title: string;
    count: number;
    onRemove: () => void;
}) {
    return (
        <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-lg font-semibold">{title}{" "}
            
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                    {count}
                </span>
                </h2>
                <div className="flex items-center space-x-2">
                <button
                    onClick={onRemove}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                    // svg used for disp;laying 2d graphics on wweb page
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="4" y1="4" x2="16" y2="16" />
                        <line x1="16" y1="4" x2="4" y2="16" />
                    </svg>
                </button>
                </div>
                </div>
    );
}