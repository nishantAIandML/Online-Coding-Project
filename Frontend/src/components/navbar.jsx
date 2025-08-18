import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">CodePlatform</span>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/problems" className="hover:text-gray-300">
              Problems
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/logout" className="hover:text-gray-300">
              Logout
            </Link>
            <Link to="/contests" className="hover:text-gray-300">
              Contests
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded hover:bg-gray-700 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };


