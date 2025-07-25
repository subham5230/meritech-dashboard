"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";

interface CompanySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCompanies: string[];
  onApply: (companies: string[]) => void;
  companies: { id: string; name: string }[];
}

export function CompanySelectorModal({
  isOpen,
  onClose,
  selectedCompanies,
  onApply,
  companies,
}: CompanySelectorModalProps) {
  const [activeTab, setActiveTab] = useState<"custom" | "saved">("custom");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(selectedCompanies);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset selected companies when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelected(selectedCompanies);
    }
  }, [isOpen, selectedCompanies]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filter companies based on search
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanyToggle = (companyId: string) => {
    setSelected((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleRemoveSelected = (companyId: string) => {
    setSelected((prev) => prev.filter((id) => id !== companyId));
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  const getCompanyInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getCompanyColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 z-[200] flex justify-end py-4">
      <div
        ref={modalRef}
        className="w-[600px] h-full bg-white flex flex-col rounded-l-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Company Selector
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Filter by custom selection or defined lists.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("custom")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors cursor-pointer",
                activeTab === "custom"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              Create your own list
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={cn(
                "pb-3 text-sm font-medium transition-colors cursor-pointer",
                activeTab === "saved"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              My Saved Lists
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 pt-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a company"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Selected Companies */}
        {selected.length > 0 && (
          <div className="px-6 pt-4">
            <div className="flex flex-wrap gap-2">
              {selected.map((companyId) => {
                const company = companies.find((c) => c.id === companyId);
                if (!company) return null;
                return (
                  <div
                    key={companyId}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                  >
                    <span>{company.name}</span>
                    <button
                      onClick={() => handleRemoveSelected(companyId)}
                      className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Company Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-3 gap-3">
            {filteredCompanies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanyToggle(company.id)}
                className={cn(
                  "flex items-center p-3 border rounded-lg text-left transition-colors cursor-pointer",
                  selected.includes(company.id)
                    ? "bg-green-50 border-green-300"
                    : "bg-white border-gray-200 hover:border-gray-300"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3",
                    getCompanyColor(company.name)
                  )}
                >
                  {getCompanyInitial(company.name)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {company.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    ({company.id.toUpperCase()})
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            + Create a new list from selection
          </button>
          <button
            onClick={handleApply}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
