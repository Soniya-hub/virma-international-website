export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-4 text-sm sm:text-base leading-relaxed">
          By accessing this website, you agree to comply with the following terms and conditions.
        </p>

        <ul className="space-y-3 text-gray-600 text-sm sm:text-base list-disc pl-5 leading-relaxed">
          <li>All content including images and branding belongs to Virma International.</li>
          <li>No material may be reused without written permission.</li>
          <li>Product pricing and availability may change without notice.</li>
          <li>We are not responsible for indirect damages from website usage.</li>
        </ul>

        <p className="mt-8 text-xs sm:text-sm text-gray-400 text-center">
          Last updated: 2026
        </p>

      </div>
    </div>
  );
}