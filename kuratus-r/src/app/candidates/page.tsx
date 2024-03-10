"use client"
import { Cell, Column, RowHeaderCell, RowHeaderCellProps, Table2 } from "@blueprintjs/table";
import data from './output.json'
import { JSXElementConstructor, ReactElement } from "react";
import { PencilIcon } from "@heroicons/react/16/solid";
const rows = data as any;
export default function Candidate() {
  const columnNames: string[] = [
    // '',
    'First Name',
    'Last Name',
    'Email Address',
    'Phone Number',
    'Job Title',
    'Application Date',
    'Resume/CV',
    'Cover Letter',
    'Current Company',
    'Job Title (Current)',
    'Location',
    'Education',
    'Skills',
    'Experience'
  ];

  const renderCell = (rowIndex: number, column: string) => {
    if(column==''){
      return <Cell><PencilIcon className="w-4"/></Cell>
    }
    return <Cell>{rows[rowIndex][column]}</Cell>;
  }

  const columns = columnNames.map(c => <Column name={c} cellRenderer={(rowIndex) => renderCell(rowIndex, c)}></Column>);

  return (
    <main className="flex flex-col">

      <form className="">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Candidates, Skills..." required />
        </div>
      </form>

      <div className="w-full my-10 text-center">
        <p className="mb-5 text-base text-gray-700 sm:text-lg dark:text-gray-400"><strong className="text-bold">Welcome!</strong> Upload your candidate database and make it live now.</p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
          <button type="submit" className="inline-flex text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-500 dark:focus:ring-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="pl-2">Import Candidate Database</span>
          </button>
        </div>

      </div>
      <div className="h-screen">
        <Table2
          numRows={data.length}
          enableGhostCells={true}
          enableRowReordering={true}
        // rowHeaderCellRenderer={renderRowHeader}
        >
          {columns}
        </Table2>
        My table
      </div>


    </main>
  );
}
