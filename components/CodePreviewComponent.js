"use client";

import { useRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import gsap from "gsap";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

/**
 * CodePreviewComponent - A reusable component for displaying and demonstrating GSAP code
 *
 * @param {Object} props
 * @param {string} props.title - Title of the animation demo
 * @param {string} props.code - The code to display and execute
 * @param {Object} props.defaultConfig - Default config for the animation preview
 * @param {Function} props.renderPreview - Function to render the preview content
 * @param {string} props.language - The language of the code (default: 'jsx')
 * @param {boolean} props.executeOnMount - Whether to execute the animation when component mounts
 */

export default function CodePreviewComponent({
  title = "GSAP Animation Demo",
  code,
  defaultConfig = {},
  renderPreview,
  language = "jsx",
  executeOnMount = false,
}) {
  const [showFullCode, setShowFullCode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState("split"); // 'split', 'preview', 'code'
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const refreshKey = useRef(0);

  // Handle animation
  const executeAnimation = () => {
    if (isPlaying) return;

    // Clear any previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Reset preview by forcing a re-render with a key change
    refreshKey.current += 1;
    setIsPlaying(true);

    // Small delay to ensure DOM elements are ready after refresh
    setTimeout(() => {
      try {
        // Call the animation function that was passed in
        animationRef.current = renderPreview(previewRef);

        // Reset the playing state when animation completes
        if (animationRef.current && animationRef.current.eventCallback) {
          animationRef.current.eventCallback("onComplete", () => {
            setIsPlaying(false);
          });
        } else {
          // If no timeline is returned, reset after a reasonable delay
          setTimeout(() => setIsPlaying(false), 2000);
        }
      } catch (error) {
        console.error("Error executing animation:", error);
        setIsPlaying(false);
      }
    }, 100);
  };

  const resetAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }
    refreshKey.current += 1;
    setIsPlaying(false);
  };

  // Run animation on mount if specified
  useEffect(() => {
    if (executeOnMount) {
      executeAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Copy code to clipboard
  const copyCode = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        const copyBtn = document.getElementById("copy-button");
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      },
    );
  };

  return (
    <div
      ref={containerRef}
      className="overflow-hidden border border-gray-700 bg-gray-900 shadow-lg mb-8 min-h-screen"
    >
      {/* Header with controls */}
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <div className="flex flex-row space-x-4 justify-center items-center">
          <h2 className="font-medium text-gray-200">{title}</h2>
          <BreadcrumbMenu />
        </div>

        <div className="flex items-center space-x-2">
          {/* View mode switcher */}
          <div className="bg-gray-700 rounded-md p-0.5 flex text-sm">
            <button
              onClick={() => setViewMode("split")}
              className={`px-3 py-1 rounded ${viewMode === "split" ? "bg-indigo-600 text-white" : "text-gray-300 hover:text-white"}`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1 rounded ${viewMode === "preview" ? "bg-indigo-600 text-white" : "text-gray-300 hover:text-white"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setViewMode("code")}
              className={`px-3 py-1 rounded ${viewMode === "code" ? "bg-indigo-600 text-white" : "text-gray-300 hover:text-white"}`}
            >
              Code
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex ${viewMode === "split" ? "flex-col md:flex-row" : "flex-col"}`}
      >
        {/* Preview Section */}
        {viewMode !== "code" && (
          <div className="flex-1 bg-slate-900 p-6 flex flex-col">
            <div
              key={refreshKey.current}
              className="flex-1 flex justify-center items-center h-full"
            >
              <div ref={previewRef} className="w-full">
                {renderPreview && renderPreview.preview
                  ? renderPreview.preview
                  : null}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={executeAnimation}
                disabled={isPlaying}
                className={`flex items-center gap-1 px-4 py-2 rounded-md ${isPlaying ? "bg-gray-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {isPlaying ? "Playing..." : "Play Animation"}
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center gap-1 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Code Section */}
        {viewMode !== "preview" && (
          <div
            className={`${viewMode === "split" ? "flex-1 md:max-w-[50%] border-t md:border-t-0 md:border-l border-gray-700" : "flex-1"}`}
          >
            <div className="bg-[#011627] rounded-b-lg relative">
              <div className="flex justify-between items-center p-2 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <button
                    id="copy-button"
                    onClick={copyCode}
                    className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="relative h-full">
                <SyntaxHighlighter
                  language={language}
                  style={nightOwl}
                  wrapLines={true}
                  customStyle={{
                    margin: 0,
                    borderRadius: "0 0 0.5rem 0.5rem",
                    maxHeight: "400px",
                  }}
                >
                  {showFullCode
                    ? code
                    : code.split("\n").slice(0, 15).join("\n")}
                </SyntaxHighlighter>

                {code.split("\n").length > 15 && (
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#011627] to-transparent h-16 flex items-end justify-center pb-2">
                    <button
                      className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1 rounded-md text-sm flex items-center"
                      onClick={() => setShowFullCode(!showFullCode)}
                    >
                      {showFullCode ? (
                        <>
                          Show Less <span className="ml-1">▲</span>
                        </>
                      ) : (
                        <>
                          Show More <span className="ml-1">▼</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BreadcrumbMenu() {
  return (
    <div className="p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/tweens">Tweens</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
