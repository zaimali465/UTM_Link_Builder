import { useState } from "react";
import UTMForm from "./components/UTMForm";
import URLDisplay from "./components/URLDisplay";
import QRCode from "./components/QRCode";
import { Analytics } from "@vercel/analytics/react";

/**
 * Main App component - Combines UTM form, URL display, and QR code generator
 */
function App() {
  // State to store the generated UTM URL
  const [generatedUrl, setGeneratedUrl] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">UTM Link Builder</h1>
          <p className="text-gray-600 mt-2">
            Create UTM-tagged URLs for your marketing campaigns
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-1">
          {/* UTM Form Component */}
          <UTMForm onGenerateUrl={setGeneratedUrl} />

          {/* URL Display Component */}
          <URLDisplay url={generatedUrl} />

          {/* QR Code Component */}
          <QRCode url={generatedUrl} />
        </div>
      </div>
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
