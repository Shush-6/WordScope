import { Search as SearchIcon } from 'lucide-react';
import React, { type JSX } from 'react';
export default function Search({
    handleSearch,
}: {
    handleSearch: (query: string) => void;
}): JSX.Element {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleButtonClick = () => {
        handleSearch(searchQuery);
    };

    return (
        <div className="p-4 border-b border-border flex items-center">
            <div className="flex items-center w-full space-x-2">
                <input
                    type="text"
                    className="w-10/12 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleButtonClick();
                        }
                    }}
                />
            <button
                onClick={handleButtonClick}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <SearchIcon className="w-5 h-5" />
            <span>Search</span>
            </button>
            </div>
        </div>
    );
}