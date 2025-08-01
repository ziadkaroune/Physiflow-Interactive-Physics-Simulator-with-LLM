import './App.css';
import './index.css';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-purple-400">
      <nav className="flex justify-between items-center px-10 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-white cursor-pointer">
          physi<span className="italic text-purple-600">Flow</span>
        </div>

        {/* Nav / Right side */}
        <ul className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <li className="text-xs text-white font-semibold select-none">v1.0</li>
          <li>
            <button
              className="px-4 py-2 rounded-full text-white bg-purple-600 hover:bg-purple-700 transition shadow-md font-semibold"
            >
              Upgrade
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
