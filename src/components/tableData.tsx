import React from "react";
import UpdateStatusModal from "./updateStatus.tsx";
import {dataType} from "../types";



interface SimpleTableProps {
    data: dataType[];
}

const TableData: React.FC<SimpleTableProps> = ({ data }) => {


    return (

                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Name</th>
                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Status</th>
                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Last
                                        Updated
                                    </th>
                                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">Actions</th>
                                </tr>
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                {data && data.length > 0  ? (
                                    data.map((row: dataType, rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.name}</td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
              <span className={row.status ? "text-green-500" : "text-red-500"}>
                {row.status ? "True" : "False"}
              </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            {new Date(row.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">

                                                <UpdateStatusModal id={row._id} status={row.status}/>
                                            </div>
                                        </td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
                                        >
                                            No data available
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
    );
}

export default TableData