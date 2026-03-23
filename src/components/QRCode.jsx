import { useState, useEffect } from "react";

/**
 * QRCode component - Generates and displays a QR code for the UTM URL
 * @param {Object} props - Component props
 * @param {string} props.url - The URL to generate QR code for
 */
const QRCode = ({ url }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // API endpoint for QR code generation
  const QR_API_URL = "https://api.qrserver.com/v1/create-qr-code/";

  useEffect(() => {
    // Don't try to generate a QR code if no URL is provided
    if (!url) {
      setQrCodeUrl("");
      return;
    }

    // Generate QR code when URL changes
    generateQRCode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  /**
   * Generate QR code using external API
   */
  const generateQRCode = async () => {
    if (!url) return;

    setIsLoading(true);
    setError("");

    try {
      // Create QR code URL with parameters
      const qrUrl = `${QR_API_URL}?data=${encodeURIComponent(
        url
      )}&size=200x200`;
      setQrCodeUrl(qrUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError("Failed to generate QR code");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't show anything if no URL has been generated
  if (!url) return null;

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-800 mb-4">QR Code:</h3>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 py-4">{error}</div>
      ) : qrCodeUrl ? (
        <div className="flex justify-center py-4">
          <img
            src={qrCodeUrl}
            alt="QR Code for UTM URL"
            className="border border-gray-300 rounded"
          />
        </div>
      ) : null}

      <p className="text-sm text-gray-600 mt-4 text-center">
        Scan this QR code to open the URL on a mobile device
      </p>
    </div>
  );
};

export default QRCode;
