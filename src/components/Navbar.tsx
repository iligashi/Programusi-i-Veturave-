import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  const navigation = [
    { name: translations['nav.home'][language], href: '/' },
    { name: translations['nav.services'][language], href: '/services' },
    { name: translations['nav.about'][language], href: '/about' },
    { name: translations['nav.contact'][language], href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sq' : 'en');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center">
              <img
                src="/logo.svg"
                alt="Car Programming"
                className="h-12 w-12"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900">
                  Car Programming
                </span>
                <span className="block text-sm text-gray-500">
                  Professional Vehicle Services
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/programues_i_veturave/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              title="View our work on Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {language === 'en' ? 'SQ' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Instagram Link (Mobile) */}
            <a
              href="https://www.instagram.com/programues_i_veturave/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              title="View our work on Instagram"
            >
              <FaInstagram className="h-5 w-5" />
            </a>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Toggle Button */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full mt-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-base font-medium text-left"
              >
                {language === 'en' ? 'Shqip' : 'English'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 