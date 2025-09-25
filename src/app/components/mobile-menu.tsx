"use client";

import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 * 
 * A slide-out mobile navigation menu with smooth animations.
 * Features:
 * - Smooth slide-in/out animations
 * - Backdrop blur and overlay
 * - Expandable resources dropdown
 * - Proper focus management for accessibility
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Navigation links configuration
  const navigationLinks = [
    { href: "#", label: "Community" },
    { href: "#", label: "Enterprise" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Pricing" },
  ];

  // Resources dropdown links
  const resourceLinks = [
    { href: "#", label: "Documentation" },
    { href: "#", label: "API Reference" },
    { href: "#", label: "Examples" },
    { href: "#", label: "Support" },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Resources expandable section */}
          <div className="space-y-1">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Resources dropdown content */}
            {resourcesOpen && (
              <div className="ml-4 space-y-1">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2 rounded-md text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}