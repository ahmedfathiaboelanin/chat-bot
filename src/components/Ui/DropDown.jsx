import { useState } from "react";

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                Open Dropdown
            </button>

            {isOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 1</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 2</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 3</li>
                </ul>
            )}
        </div>
    );
}