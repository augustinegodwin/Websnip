"use client";
import Link from "next/link";
import {
  Menu,
  Zap,
  Palette,
  Download,
  Eye,
  Code2,
  Smartphone,
  Shield,
  Settings,
  Globe,
  Loader2,
  ChevronDown,
  BookOpen,
  Newspaper,
  Image,
  Activity,
  ExternalLink,
  LinkIcon,
  Code,
  Upload,
  ArrowRight,
  Settings2,
  Github,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SyntaxHighlighter } from "./components/syntaxHighlighter";
import { SettingsModal, ConversionSettings } from "./components/settingsModal";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeToggle } from "./components/theme-toggle";
import { MobileMenu } from "./components/mobile-menu";
import { convertData } from "../../lib/convertData";

// Font configuration for the hero section
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500"],
});

// Configuration for the conversion type dropdown
const options = [
  { value: "website", label: "Website" },
  { value: "html", label: "HTML" },
];

// Features data for the features section
const features = [
  {
    icon: Globe,
    title: "URL to Image",
    description: "Capture any website by simply entering its URL - no coding required",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert HTML to images in milliseconds with our optimized rendering engine",
  },
  {
    icon: Eye,
    title: "Real-time Preview",
    description: "See your changes instantly with live preview before downloading",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Export as PNG, JPEG, WebP with customizable quality settings",
  },
  {
    icon: Palette,
    title: "Custom Styling",
    description: "Full CSS support with custom fonts, colors, and responsive layouts",
  },
  {
    icon: Settings,
    title: "Advanced Options",
    description: "Fine-tune dimensions, scale, quality, and output parameters",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Generate images for different screen sizes and device types",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All processing happens in your browser - no data sent to servers",
  },
  {
    icon: Code2,
    title: "Developer Friendly",
    description: "Clean API, extensive documentation, and code examples",
  },
];

// Type definition for tab states
type TabType = "website" | "html" | "upload";

/**
 * Tabs Component
 * 
 * Main interface component that handles:
 * - Different input methods (website, HTML, file upload)
 * - Form validation and submission
 * - Loading states and user feedback
 */
function Tabs({ handleQuickGenerate }: { handleQuickGenerate: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>("website");
  const [websiteUrl, setWebsiteUrl] = useState("");
  
  // Default HTML template for demonstration
  const [html, setHtml] = useState(`<div class="text-center" style="width:500px; margin-top:3em;  margin-left:auto; margin-right:auto; padding: 5px">
  <span class="tweet-text">
    This is Little Bear. He tolerates baths because he knows how phenomenal his floof will appear. 13/10
  </span>
 
  <div class="is-center" style="margin-top:2em; margin-bottom:1em">
    <img src="https://docs.htmlcsstoimage.com/assets/images/dog.jpg" class="is-rounded shadow border mt-4" width="100px">
  </div>
  <h4 class="bg-dark text-white is-center" style="max-width:fit-content; margin-left:auto;margin-right:auto; padding:0.5em 1.5em; border-radius:0.5em; font-family:monospace;">
    WeRateDogs
  </h4>
  <span class="text-grey">@dog_rates</span>
</div>

<!-- Include external CSS, JavaScript or Fonts! -->
<link rel="stylesheet" href="https://unpkg.com/chota@0.9.2/dist/chota.min.css">`);
  
  // Form validation states
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  /**
   * URL validation function
   * Checks if the entered URL is valid and uses HTTP/HTTPS protocol
   */
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return true; // Empty is valid (not required)

    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Validate URL whenever it changes after user has started typing
  useEffect(() => {
    if (hasTyped) {
      setIsValid(validateUrl(websiteUrl));
    }
  }, [websiteUrl, hasTyped]);

  /**
   * Handle input changes with validation
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value);
    if (!hasTyped) setHasTyped(true);
  };

  /**
   * Handle form submission
   * Validates input and triggers the generation process
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!websiteUrl.trim()) return;

    const urlIsValid = validateUrl(websiteUrl);
    setIsValid(urlIsValid);
    setHasTyped(true);

    if (!urlIsValid) return;

    setIsLoading(true);
    // API call would go here
    // For now, we'll just open the settings modal
     e.preventDefault()
    setIsLoading(true)

    const result = await convertData({ url: websiteUrl, width: '400', height: '800' })
    console.log("Conversion result:", result)
    setIsLoading(false)

    
  };
  const canSubmit = websiteUrl.trim() && isValid && !isLoading;

  /**
   * Render content based on active tab
   */
 

  const renderTabContent = () => {
    switch (activeTab) {
      case "website":
        return (
          <div className="relative select-none">
            <input
              type="url"
              id="website_url"
              name="website_url"
              value={websiteUrl}
              onChange={handleInputChange}
              className={`w-full p-4 focus:outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-500 bg-transparent text-sm transition-all duration-200 border-2 rounded-xl ${
                hasTyped && !isValid
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 dark:border-gray-600 focus:border-blue-500"
              }`}
              placeholder="https://example-website.com..."
              translate="no"
              disabled={isLoading}
              style={{
                height: 50,
                overflowY: "hidden",
              }}
            />
            <button
              disabled={!canSubmit}
              onClick={handleSubmit}
              className={`absolute z-10 flex justify-center items-center top-[8px] right-[10px] p-1 rounded-xl size-[34px] transition-all duration-200 ${
                canSubmit
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              <div className="text-lg text-white">
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </div>
            </button>
          </div>
        );
      case "html":
        return (
          <div className="relative select-none h-80">
            <SyntaxHighlighter code={html} language="html" onChange={setHtml} />
          </div>
        );
      case "upload":
        return (
          <div className="relative select-none">
            <div className="w-full pl-4 pt-4 pr-16 text-sm" style={{ minHeight: 76 }}>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  Supports: Images, PDFs, Code files, Documents
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative px-4 w-full max-w-xl mx-auto">
      {/* Main Interface Container */}
      <div className="relative shadow-2xl overflow-clip rounded-[11px]">
        <div className="relative bg-white dark:bg-[rgba(31,31,31,0.95)] backdrop-blur-[7px]">
          <form onSubmit={handleSubmit} className="relative select-none">
            {renderTabContent()}
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Home Component
 * 
 * The main landing page component that includes:
 * - Header with navigation and theme toggle
 * - Hero section with conversion interface
 * - Features showcase section
 * - Footer with links and information
 */
export default function Home() {
  // State management for various UI components
  const [selectedOption, setSelectedOption] = useState("website");
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  /**
   * Handle quick generate button click
   * Opens the settings modal for customization
   */
  const handleQuickGenerate = () => {
    setSettingsOpen(true);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ||
    "Website";

  const handleOptionSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
  };

  /**
   * Handle image generation with custom settings
   */
  const handleGenerate = async (settings: ConversionSettings) => {
    setIsGenerating(true);

    try {
      // API call would be implemented here
      console.log("Generating with settings:", settings);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Generation complete");
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Fixed Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                Websnip
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Community
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Enterprise
              </Link>
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {/* Resources dropdown would be implemented here */}
              </div>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </nav>

            {/* Header Actions: GitHub, Theme Toggle, Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* GitHub Link */}
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                aria-label="View on GitHub"
              >
                <Github className="h-4 w-4" />
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="min-h-screen pt-16 flex items-center grid-pattern ">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Hero Section */}
        <div className="flex flex-col flex-grow relative z-10">
          <div className="flex flex-col mx-4">
            {/* Main Heading with Interactive Dropdown */}
            <h1
              className={`${bricolage.className} text-3xl md:text-[44px] flex flex-wrap items-center justify-center text-center font-semibold tracking-tight leading-tight text-gray-900 dark:text-white`}
            >
              Convert 
              
              {/* Conversion Type Dropdown */}
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="pl-5 pr-2 py-[2px] ml-3 mr-3 mb-2 md:mb-0 items-center flex justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 border border-blue-100 dark:border-blue-800 rounded-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                >
                  <span className="mr-1 text-gray-900 dark:text-white">{selectedLabel}</span>
                  <ChevronDown
                    className={`size-[30px] md:size-[44px] text-gray-900 dark:text-white transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full min-w-[140px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleOptionSelect(option.value)}
                        className={`w-full px-4 py-3 text-lg text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-200 ${
                          selectedOption === option.value
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/70 dark:to-purple-900/70 text-blue-800 dark:text-blue-200"
                            : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <span> to stunning images.</span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-6 text-center text-gray-600 dark:text-gray-300 max-w-[400px] mx-auto">
              Convert websites &amp; HTML code to high-quality images with
              customization options.
            </p>
          </div>
          
          {/* Main Conversion Interface */}
          <div>
            <Tabs handleQuickGenerate={handleQuickGenerate} />
          </div>
          
          {/* Settings Button */}
          <div className="relative flex flex-col gap-9 w-full max-w-4xl mx-auto flex justify-center mt-2 2xl:max-w-[70rem]">
            <div className="flex text-sm items-center align-baseline gap-4 justify-center">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Customize image output
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleQuickGenerate()}
                  className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 text-xs transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings2 size={16} />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section - Fixed styling for light/dark mode */}
      <section id="features" className="py-20 max-w-5xl mx-auto">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything you need to convert HTML & URLs to images
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful features designed for developers, designers, and content
              creators who need high-quality image generation from HTML code and
              website URLs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl p-6 shadow-sm hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Feature Icon */}
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors duration-200">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                
                {/* Feature Title */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                
                {/* Feature Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/5 bg-white dark:bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Websnip
              </div>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Support
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <Newspaper className="h-4 w-4 mr-2" />
                    Blog
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Gallery
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Status
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Social
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    YouTube
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              © 2025 Websnip - All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        closeModal={() => setSettingsOpen(false)}
        onGenerate={handleGenerate}
      />
    </>
  );
}