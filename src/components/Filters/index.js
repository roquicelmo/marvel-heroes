'use client';

import { useRouter } from 'next/navigation';

export default function Filters({ orderBy }) {
    const router = useRouter();

    const handleOrderChange = (e) => {
        router.push(`/heroes?orderBy=${e.target.value}&page=1`);
    };

    return (
        <div className="mb-6 text">
            <label className="mr-2">Ordenação:</label>
            <select
                value={orderBy}
                onChange={handleOrderChange}
                className="p-2 border rounded"
            >
                <option value="name">A-Z</option>
                <option value="-name">Z-A</option>
            </select>
        </div>
    );
}