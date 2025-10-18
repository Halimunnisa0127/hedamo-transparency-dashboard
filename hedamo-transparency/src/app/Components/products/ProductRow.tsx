// components/products/ProductRow.tsx
'use client';

import { Product } from '@/src/types';
import { getScoreColor, getStatusColor }from '@/src/lib/utils';
import { highlightText } from '../../../utils/search';
import { useRouter } from 'next/navigation';

interface ProductRowProps {
    product: Product;
    searchQuery: string;
}

export default function ProductRow({ product, searchQuery }: ProductRowProps) {
    const router = useRouter();
    const highlightMatch = (text: string) => {
        if (!searchQuery.trim()) return text;
        return <span dangerouslySetInnerHTML={{ __html: highlightText(text, searchQuery) }} />;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group" onClick={() => router.push(`/analytics?product=${product.id}`)}>
            <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {highlightMatch(product.name)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                    {highlightMatch(product.description || '')}
                </div>

            </td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{highlightMatch(product.category)}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(product.score)}`}>
                        {product.score}
                    </span>
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`h-1.5 rounded-full ${product.score >= 80 ? 'bg-green-500' : product.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${product.score}%` }}
                        />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status.replace('_', ' ')}
                </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{formatDate(product.lastUpdated)}</td>
        </tr>
    );
}
