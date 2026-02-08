export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          We respect your privacy. Any information submitted through our website is used only to respond to inquiries and provide services.
        </p>

        <ul className="space-y-3 text-gray-600 text-sm sm:text-base list-disc pl-5 leading-relaxed">
          <li>We do not sell or share your data.</li>
          <li>Contact details are used only for communication.</li>
          <li>No cookies are used for tracking.</li>
        </ul>

        <p className="mt-8 text-xs sm:text-sm text-gray-400 text-center">
          Last updated: 2026
        </p>

      </div>
    </div>
  );
}