'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";


export default function Pagination({ currentPage, totalPages }) {
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

  return (
    <div className="flex justify-center gap-2 mt-8 py-6 w-full bg-cyan-800">
        <button 
          onClick={() => router.push(`/heroes?page=${currentPage - 1}`)}
          className="px-4 py-2 rounded cursor-pointer disabled:"
          disabled={currentPage > 1 ? false : true}
        >
            <IoIosArrowDropleftCircle className="text-cyan-500 hover:text-white" size={32}/>
        </button>

      
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => router.push(`/heroes?page=${page}`)}
          className={`px-4 py-2 rounded cursor-pointer font-bold hover:bg-cyan-500 hover:text-white ${currentPage === page ? 'bg-cyan-500 text-white' : 'bg-transparent text-cyan-500'}`}
        >
          {page}
        </button>
      ))}
      
      {currentPage < totalPages - 2 && <span className="px-4 py-2 text-cyan-500">...</span>}
      
      {currentPage < totalPages && (
        <button 
          onClick={() => router.push(`/heroes?page=${totalPages}`)}
          className="px-4 py-2 font-bold cursor-pointer text-cyan-500 rounded bg-transparent hover:bg-cyan-500 hover:text-white"
        >
          {totalPages}
        </button>
      )}
      

        <button 
          onClick={() => router.push(`/heroes?page=${currentPage + 1}`)}
          className="px-4 py-2 rounded cursor-pointer"
          disabled={currentPage < totalPages ? false : true}
        >
            <IoIosArrowDroprightCircle className="text-cyan-500 hover:text-white" size={32}/>
        </button>
    </div>
  );
}