import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-gray-900"
            >
              Coder or Talker
            </NavLink>
          </div>
          <div className="flex items-center">
            <a
              href="https://github.com/mateuseap/coder-or-talker"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center bg-[#3498DB] hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-150"
            >
              <FaGithub className="mr-2 text-lg" />
              Star on GitHub
            </a>
            <a
              href="https://github.com/mateuseap/coder-or-talker"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center bg-[#3498DB] hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded-md transition duration-150"
            >
              <FaGithub className="mr-1 text-lg" />
              Star
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
