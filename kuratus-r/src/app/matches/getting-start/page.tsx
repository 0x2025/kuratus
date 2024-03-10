'use client';
import { useCallback, useContext, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { MatchesContext, MatchingContext } from "../context";
import { useRouter } from 'next/navigation';

pdfjs.GlobalWorkerOptions.workerSrc = '/static/js/pdf.worker.min.js';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;

type PDFFile = string | File | null;

export default function Matching() {
  const router = useRouter();
  const [analyzing, setAnalyzing] = useState(true);
  const { files } = useContext(MatchesContext) as MatchingContext;
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  // if (!files) {
  //   router.push('/matches');
  //   return;
  // }
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const analyzingTimeout = setTimeout(() => {
    setAnalyzing(false);
    clearTimeout(analyzingTimeout);
  }, 3000)

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="w-full lg:flex">
        <div className="flex border-2 border-gray-300 border-dashed">
          <div ref={setContainerRef}>
            <Document className="h-svh scroll-smooth overflow-auto" file={files?.item(0) || null} onLoadSuccess={onDocumentLoadSuccess} options={options} loading={LoadingIndicator}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              ))}
            </Document>
          </div>

        </div>
        <div className="flex w-full px-2">
          {analyzing ? <>
            <LoadingIndicator></LoadingIndicator>
          </> : <div className='grid justify-items-center'>
            <div>
              <button disabled type="button" className=" justify-items-center py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
                Finding candidates...
              </button>
            </div>
          </div>}
        </div>
      </div>
    </main>
  );
}


const LoadingIndicator = () => <>
  <div role="status" className="space-y-2.5 animate-pulse w-full">
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[440px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[360px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[440px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[360px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[440px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[360px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[480px]">
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
    </div>
    <div className="flex items-center w-full max-w-[440px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
    </div>
    <div className="flex items-center w-full max-w-[360px]">
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
      <div className="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
      <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
</>