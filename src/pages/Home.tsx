import { motion } from 'framer-motion';
import { FaCar, FaTools, FaCog, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CarShowcase from '../components/CarShowcase';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { language, translations } = useLanguage();

  const features = [
    {
      icon: <FaCar className="h-8 w-8 text-blue-500" />,
      title: language === 'en' ? 'Multiple Car Brands' : 'Shumë Brende të Veturave',
      description: language === 'en' 
        ? 'Expert programming for BMW, AUDI, LAMBORGHINI, VW, SKODA, and SEAT vehicles'
        : 'Programim ekspert për veturat BMW, AUDI, LAMBORGHINI, VW, SKODA, dhe SEAT',
    },
    {
      icon: <FaTools className="h-8 w-8 text-blue-500" />,
      title: language === 'en' ? 'Professional Services' : 'Shërbime Profesionale',
      description: language === 'en'
        ? 'Comprehensive programming solutions including feature activation and customization'
        : 'Zgjidhje gjithëpërfshirëse të programimit duke përfshirë aktivizimin dhe personalizimin e veçorive',
    },
    {
      icon: <FaCog className="h-8 w-8 text-blue-500" />,
      title: language === 'en' ? 'Advanced Features' : 'Veçori të Avancuara',
      description: language === 'en'
        ? 'Unlock premium features like CarPlay, ambient lighting, and parking assistance'
        : 'Zhbllokoni veçori premium si CarPlay, ndriçimi ambiental dhe asistenca e parkimit',
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-blue-500" />,
      title: language === 'en' ? 'Licensed & Guaranteed' : 'I Licencuar & I Garantuar',
      description: language === 'en'
        ? 'All programming services are licensed and come with a satisfaction guarantee'
        : 'Të gjitha shërbimet e programimit janë të licencuara dhe vijnë me garanci të kënaqësisë',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {translations['hero.title'][language]}
            </h1>
            <p className="text-xl mb-8">
              {translations['hero.subtitle'][language]}
            </p>
            <Link
              to="/services"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              {translations['hero.cta'][language]}
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {translations['features.title'][language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Car Showcase Section */}
      <CarShowcase />

      {/* CTA Section */}
      <section className="bg-blue-600 text-white">
        <div className="container-custom py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              {translations['cta.title'][language]}
            </h2>
            <p className="mb-8">
              {translations['cta.subtitle'][language]}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              {translations['cta.button'][language]}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 