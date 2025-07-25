"use client";

import { useState } from "react";
import { TableColumn } from "@/types";
import { cn } from "@/utils/cn";

interface ManageColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: TableColumn[];
  visibleColumns: string[];
  onApply: (visibleColumns: string[]) => void;
}

interface ColumnState {
  key: string;
  name: string;
  isVisible: boolean;
  pinPosition: "none" | "left" | "right";
}

export function ManageColumnsModal({
  isOpen,
  onClose,
  columns,
  visibleColumns,
  onApply,
}: ManageColumnsModalProps) {
  const [columnStates, setColumnStates] = useState<ColumnState[]>(() =>
    columns.map((col) => ({
      key: col.key,
      name: col.label,
      isVisible: visibleColumns.includes(col.key),
      pinPosition: "none" as const,
    }))
  );

  const [openPinDropdown, setOpenPinDropdown] = useState<string | null>(null);

  const handleToggleColumn = (columnKey: string) => {
    setColumnStates((prev) =>
      prev.map((col) =>
        col.key === columnKey ? { ...col, isVisible: !col.isVisible } : col
      )
    );
  };

  const handlePinChange = (
    columnKey: string,
    position: "none" | "left" | "right"
  ) => {
    setColumnStates((prev) =>
      prev.map((col) =>
        col.key === columnKey ? { ...col, pinPosition: position } : col
      )
    );
    setOpenPinDropdown(null);
  };

  const handleApply = () => {
    const newVisibleColumns = columnStates
      .filter((col) => col.isVisible)
      .map((col) => col.key);
    onApply(newVisibleColumns);
    onClose();
  };

  const handleReset = () => {
    setColumnStates(
      columns.map((col) => ({
        key: col.key,
        name: col.label,
        isVisible: true,
        pinPosition: "none" as const,
      }))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-start justify-end z-[200]">
      <div className="bg-white rounded-lg shadow-xl w-[600px] h-screen flex flex-col mr-4 mt-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Manage Columns
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Column Headers */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div>Column</div>
            <div className="text-center">Pin</div>
            <div className="text-right">Show</div>
          </div>

          {/* Column List */}
          <div className="space-y-2">
            {columnStates.map((column) => (
              <div
                key={column.key}
                className="grid grid-cols-3 gap-4 items-center py-2"
              >
                {/* Column Name */}
                <div className="text-sm text-gray-900">
                  {column.name === "% Price Δ 3-Mo" ||
                  column.name === "% Price Δ 12-Mo" ? (
                    <span className="ml-4">
                      {column.name.replace("% Price Δ ", "")}
                    </span>
                  ) : (
                    column.name
                  )}
                </div>

                {/* Pin Control */}
                <div className="flex justify-center">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenPinDropdown(
                          openPinDropdown === column.key ? null : column.key
                        )
                      }
                      className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span>
                        {column.pinPosition === "none"
                          ? "None"
                          : column.pinPosition}
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {openPinDropdown === column.key && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                        {(["none", "left", "right"] as const).map(
                          (position) => (
                            <button
                              key={position}
                              onClick={() =>
                                handlePinChange(column.key, position)
                              }
                              className={cn(
                                "w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center justify-between",
                                column.pinPosition === position && "bg-green-50"
                              )}
                            >
                              <span className="capitalize">{position}</span>
                              {column.pinPosition === position && (
                                <svg
                                  className="w-4 h-4 text-green-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Show Toggle */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleToggleColumn(column.key)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                      column.isVisible ? "bg-green-600" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        column.isVisible ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Reset settings
          </button>
          <button
            onClick={handleApply}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
}
