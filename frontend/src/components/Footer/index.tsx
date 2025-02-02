function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-white shadow-sm z-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="flex items-center hidden sm:inline-flex text-sm text-gray-600">
            Made with 🫶 by
            <a
              href="https://github.com/mateuseap"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold hover:underline text-[#3498DB] hover:text-blue-700"
            >
              @mateuseap
            </a>
          </span>
          <span className="flex items-center sm:hidden inline-flex text-sm text-gray-600">
            Made by
            <a
              href="https://github.com/mateuseap"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold hover:underline text-[#3498DB] hover:text-blue-700"
            >
              @mateuseap
            </a>
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600">© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
