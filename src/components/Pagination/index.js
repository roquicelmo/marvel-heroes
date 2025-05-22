'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";


export default function Pagination({ currentPage, totalPages, filters }) {
    const router = useRouter();


    const getPageNumbers = () => {
        const pages = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };
    console.log('filters', filters.orderBy)
    return (
        <div className="flex justify-center gap-2 my-3 w-full">
            <button
                onClick={() => router.push(`/heroes?${filters.orderBy ? 'orderBy=' + filters.orderBy + '&' : ''}page=${currentPage - 1}`)}
                className="px-4 py-2 rounded cursor-pointer hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={currentPage > 1 ? false : true}
            >
                <IoIosArrowDropleftCircle size={32} />
            </button>


            {getPageNumbers().map(page => (
                <button
                    key={page}
                    onClick={() => router.push(`/heroes?${filters.orderBy ? 'orderBy=' + filters.orderBy + '&' : ''}page=${page}`)}
                    className={`px-4 py-2 rounded cursor-pointer font-bold hover:bg-red-500 hover:text-white ${currentPage === page ? 'bg-red-500 text-white' : 'bg-transparent'}`}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages - 2 && <span className="px-4 py-2 font-bold">...</span>}

            {currentPage < totalPages && (
                <button
                    onClick={() => router.push(`/heroes?${filters.orderBy ? 'orderBy=' + filters.orderBy + '&' : ''}page=${totalPages}`)}
                    className="px-4 py-2 font-bold cursor-pointer rounded bg-transparent hover:bg-red-500 hover:text-white"
                >
                    {totalPages}
                </button>
            )}


            <button
                onClick={() => router.push(`/heroes?${filters.orderBy ? 'orderBy=' + filters.orderBy + '&' : ''}page=${currentPage + 1}`)}
                className="px-4 py-2 rounded cursor-pointer hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={currentPage < totalPages ? false : true}
            >
                <IoIosArrowDroprightCircle size={32} />
            </button>
        </div>
    );
}