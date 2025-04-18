import { Link } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaViber, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Car Programming</h3>
            <p className="text-gray-400">
              Professional vehicle programming and customization services for premium brands
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span className="text-gray-400">(+383) 49-599-931</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="text-gray-400" />
                <span className="text-gray-400">WhatsApp</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaViber className="text-gray-400" />
                <span className="text-gray-400">Viber</span>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Locations</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Prishtinë</li>
              <li className="text-gray-400">Tiranë</li>
              <li className="text-gray-400">Durrës</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Car Programming. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/Programuesiveturave"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            <a
              href="https://wa.me/38349599931"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaWhatsapp className="h-6 w-6" />
            </a>
            <a
              href="viber://chat?number=%2B38349599931"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaViber className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 