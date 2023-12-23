'use client'
import React, { useState, useEffect, ChangeEvent, ReactNode } from "react";
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

type TableProps = {
    data: any[];
    children?: ReactNode
};

export function Table({ data, children }: TableProps) {
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [pages, setPages] = useState<number[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const countPerPage = [10, 20, 30, 50, 100];
    const [filteredData, setFilteredData] = useState<any[]>([]); // Adicione o estado para os dados filtrados

    const columns = Object.keys(data[0] || {});

    useEffect(() => {
        generatePages();
    }, [perPage, data, filterText]);

    useEffect(() => {
        // Aplicar o filtro aos dados completos
        const filtered = filterText.length > 0
            ? data.filter((item) =>
                Object.keys(item).some(
                    (key) => typeof item[key] === "string" && 
                        item[key].toString().toLowerCase().includes(filterText.toLowerCase())
                )
            )
            : data;
        
        // Atualize o estado dos dados filtrados
        setFilteredData(filtered);
    
        // Recalcular as páginas com base nos dados filtrados
        generatePages();
    }, [perPage, data, filterText]);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const displayedData = filteredData.slice(startIndex, endIndex);

    const generatePages = () => {
        const pagination = [];
        const numberOfPages = Math.ceil(data.length / perPage);

        for (let index = 1; index <= numberOfPages; index++) {
            pagination.push(index);
        }
        
        setPages(pagination);
    };

    const handlePrevPage = () => {
        if (page > 1) {
          setPage((prevPage) => prevPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (page < (pages.length || 1)) {
          setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPerPage(parseInt(e.target.value));
    };

    function handleFilterData(filterText: string) {
        setFilterText(filterText);
    }

    return (
        <div className="mt-6">
            <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="mb-6 flex justify-between">
                    <input 
                        className="shadow-md w-1/5 rounded-lg text-sm max-w-lg p-3" 
                        placeholder="Digite para pesquisar" 
                        onChange={(e) => handleFilterData(e.target.value)} 
                    />
                    {children}
                </div>

                <div className="w-full shadow-md overflow-auto">
                    <table className="w-full border-collapse rounded-2xl bg-white text-left text-sm text-gray-500 cursor-pointer">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((header, index) => (
                                    <th key={index} scope="col" className="px-6 py-6 uppercase font-bold text-xs text-gray-900">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="border-t border-gray">
                            {displayedData.map((item, i) => (
                                <tr key={i} className="hover:bg-gray-200">
                                    {columns.map((column, j) => (
                                        <td key={j} className="px-6 py-4">
                                            {item[column]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-center py-5">
                        <div className="w-full flex items-center border-t border-gray-200 gap-6 justify-end">
                            <div>
                                <span>Itens por página:</span>
                                <select
                                    value={perPage}
                                    className="table__per__page"
                                    onChange={handlePerPageChange}
                                >
                                    {countPerPage.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div> 
                            <div>
                                <span>Mostrando 1 a {perPage} de {data.length} resultados</span>
                            </div>
                            <div className="flex items-center text-gray-600" >
                                <HiChevronDoubleLeft 
                                    size={24} 
                                    className={`${page === 1 ? 'text-gray cursor-not-allowed' : 'hover:text-indigo-700 cursor-pointer'}`} 
                                    onClick={() => setPage(1)} 
                                />
                                <HiChevronLeft 
                                    size={24} 
                                    className={`${page === 1 ? 'text-gray cursor-not-allowed' : 'hover:text-indigo-700 cursor-pointer'}`}         
                                    onClick={handlePrevPage} 
                                />
                                <HiChevronRight 
                                    size={24} 
                                    className={`${page === pages.length ? 'text-gray cursor-not-allowed' : 'hover:text-indigo-700 cursor-pointer'}`} 
                                    onClick={handleNextPage} 
                                />   
                                <HiChevronDoubleRight 
                                    size={24} 
                                    className={`${page === pages.length ? 'text-gray cursor-not-allowed' : 'hover:text-indigo-700 cursor-pointer'}`} 
                                    onClick={() => setPage(pages.length)} 
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
