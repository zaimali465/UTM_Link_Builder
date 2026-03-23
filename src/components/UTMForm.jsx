import { useState } from "react";

/**
 * UTMForm component - Handles user input for UTM parameters
 * @param {Object} props - Component props
 * @param {Function} props.onGenerateUrl - Callback function when UTM URL is generated
 */
const UTMForm = ({ onGenerateUrl }) => {
  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    baseUrl: "",
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });

  // Track validation errors
  const [errors, setErrors] = useState({});

  /**
   * Handle input changes and update form state
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /**
   * Validate form inputs
   * @returns {boolean} Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.baseUrl) {
      newErrors.baseUrl = "Base URL is required";
    } else if (
      !formData.baseUrl.startsWith("http://") &&
      !formData.baseUrl.startsWith("https://")
    ) {
      newErrors.baseUrl = "URL must start with http:// or https://";
    }

    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.medium) newErrors.medium = "Medium is required";
    if (!formData.campaign) newErrors.campaign = "Campaign name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Build UTM URL
      let url = formData.baseUrl;

      // Add ? or & depending on if the URL already has parameters
      const separator = url.includes("?") ? "&" : "?";

      // Add required UTM parameters
      url += `${separator}utm_source=${encodeURIComponent(formData.source)}`;
      url += `&utm_medium=${encodeURIComponent(formData.medium)}`;
      url += `&utm_campaign=${encodeURIComponent(formData.campaign)}`;

      // Add optional parameters if they exist
      if (formData.term) {
        url += `&utm_term=${encodeURIComponent(formData.term)}`;
      }

      if (formData.content) {
        url += `&utm_content=${encodeURIComponent(formData.content)}`;
      }

      // Pass generated URL to parent component
      onGenerateUrl(url);
    }
  };

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setFormData({
      baseUrl: "",
      source: "",
      medium: "",
      campaign: "",
      term: "",
      content: "",
    });
    setErrors({});
    onGenerateUrl(""); // Clear the generated URL
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Create UTM Link</h2>
      <p className="text-sm mb-6 text-gray-800">Fill out all fields marked with an asterisk (*), and the campaign URL will be generated for you.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Base URL */}
        <div>
          <label
            htmlFor="baseUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Base URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="baseUrl"
            name="baseUrl"
            placeholder="https://example.com"
            value={formData.baseUrl}
            onChange={handleChange}
            className={`input-field ${
              errors.baseUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.baseUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.baseUrl}</p>
          )}
        </div>

        {/* Campaign Source */}
        <div>
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Campaign Source <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="source"
            name="source"
            placeholder="google, newsletter, facebook"
            value={formData.source}
            onChange={handleChange}
            className={`input-field ${
              errors.source ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.source && (
            <p className="mt-1 text-sm text-red-500">{errors.source}</p>
          )}
        </div>

        {/* Campaign Medium */}
        <div>
          <label
            htmlFor="medium"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Campaign Medium <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="medium"
            name="medium"
            placeholder="cpc, email, social"
            value={formData.medium}
            onChange={handleChange}
            className={`input-field ${
              errors.medium ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.medium && (
            <p className="mt-1 text-sm text-red-500">{errors.medium}</p>
          )}
        </div>

        {/* Campaign Name */}
        <div>
          <label
            htmlFor="campaign"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="campaign"
            name="campaign"
            placeholder="summer_sale, product_launch"
            value={formData.campaign}
            onChange={handleChange}
            className={`input-field ${
              errors.campaign ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.campaign && (
            <p className="mt-1 text-sm text-red-500">{errors.campaign}</p>
          )}
        </div>

        {/* Campaign Term (Optional) */}
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Campaign Term <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            id="term"
            name="term"
            placeholder="running+shoes"
            value={formData.term}
            onChange={handleChange}
            className="input-field border-gray-300"
          />
        </div>

        {/* Campaign Content (Optional) */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Campaign Content <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="top_banner, sidebar"
            value={formData.content}
            onChange={handleChange}
            className="input-field border-gray-300"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="btn-primary">
            Generate URL
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default UTMForm;
