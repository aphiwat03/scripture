"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Language } from "@/lib/data/types";
import { Sidebar } from "@/components/Sidebar";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  languages: Language[];
  currentLang: string;
  currentCategory: string;
}

export function MobileMenu({
  languages,
  currentLang,
  currentCategory,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 -ml-2 mr-1 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
        aria-label="Open mobile menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
              onClick={() => setIsOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 z-[1000] w-72 bg-white dark:bg-gray-950 shadow-2xl lg:hidden flex flex-col transform transition-transform duration-300">
              <div className="flex items-center justify-between px-4 h-14 border-b border-gray-200 dark:border-gray-800 shrink-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  เมนู
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="-mt-14">
                  <style>{`
                    #docs-sidebar {
                      width: 100% !important;
                      height: 100% !important;
                      position: static !important;
                      border-right: none !important;
                      padding-top: 3.5rem !important; /* ชดเชย -mt-14 เพื่อหลบ Header ของ Drawer */
                    }
                  `}</style>
                  <Sidebar
                    languages={languages}
                    currentLang={currentLang}
                    currentCategory={currentCategory}
                  />
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
