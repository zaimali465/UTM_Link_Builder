import { useState } from "react";

/**
 * URLDisplay component - Displays the generated UTM URL with a copy button
 * @param {Object} props - Component props
 * @param {string} props.url - The generated UTM URL to display
 */
const URLDisplay = ({ url }) => {
  const [copyStatus, setCopyStatus] = useState("");

  /**
   * Copy URL to clipboard and show temporary success message
   */
  const handleCopy = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("Copied!");

      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus("");
      }, 2000);
    } catch (err) {
      setCopyStatus("Failed to copy");
      console.error("Failed to copy text: ", err);
    }
  };

  // Don't show anything if no URL has been generated yet
  if (!url) return null;

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-3">
        Generated UTM URL:
      </h3>

      <div className="flex items-center">
        <div className="bg-white p-4 rounded border border-gray-300 w-full overflow-x-auto">
          <p className="text-gray-800 font-mono text-sm break-all">{url}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center">
        <button onClick={handleCopy} className="btn-primary flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copy to Clipboard
        </button>

        {copyStatus && (
          <span className="ml-3 text-green-600 text-sm font-medium">
            {copyStatus}
          </span>
        )}
      </div>
    </div>
  );
};

export default URLDisplay;
