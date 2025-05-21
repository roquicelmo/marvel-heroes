'use client';

import { useState } from 'react';

export default function Accordion({ title, items }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 rounded-lg overflow-hidden">
            <button
                className=" cursor-pointer w-full p-4 text-left bg-cyan-950 hover:brightness-90 flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-cyan-200">{title} ({items.length})</h3>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-cyan-950">
                    {items.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {items.map((item, index) => (
                                <li key={index} className="bg-cyan-900 p-2 rounded-lg text-cyan-400">
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No {title.toLowerCase()} available</p>
                    )}
                </div>
            )}
        </div>
    );
}