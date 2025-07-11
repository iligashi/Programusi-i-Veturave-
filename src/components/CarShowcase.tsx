import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import seat from './seat.png';
import VW from './VW.png';

const CarShowcase = () => {
  const { language } = useLanguage();

  const carBrands = [
    {
      name: 'BMW',
      image: 'https://cdn.jdpower.com/JDP_2024%20BMW%20i5%20eDrive40%20Silver%20Front%20Quarter%20View%20Action.jpeg',
      features: language === 'en' 
        ? ['M/Alpina Display', 'Ambient Lighting', 'Gesture Control']
        : ['Ekrani M/Alpina', 'Ndriçimi Ambiental', 'Kontrolli me Gjeste']
    },
    {
      name: 'AUDI',
      image: 'https://media.whatcar.com/wc-image/2022-03/a221151_large.jpg',
      features: language === 'en'
        ? ['RS Lights', 'Virtual Cockpit Plus', 'Matrix LED']
        : ['Dritat RS', 'Virtual Cockpit Plus', 'Matrix LED']
    },
    {
      name: 'LAMBORGHINI',
      image: 'https://media.ed.edmunds-media.com/lamborghini/revuelto/2024/oem/2024_lamborghini_revuelto_coupe_base_fq_oem_1_1600.jpg',
      features: language === 'en'
        ? ['Sport Display', 'Dynamic Mode', 'Launch Control']
        : ['Ekrani Sport', 'Modaliteti Dinamik', 'Kontrolli i Nisjes']
    },
    {
      name: 'VW',
      image: VW,
      features: language === 'en'
        ? ['Digital Cockpit Pro', 'IQ.DRIVE', 'Area View']
        : ['Digital Cockpit Pro', 'IQ.DRIVE', 'Pamja e Zonës']
    },
    {
      name: 'SKODA',
      image: 'https://www.ixbt.com/img/n1/news/2024/1/3/skoda-octavia-2024%20%281%29_large.png',
      features: language === 'en'
        ? ['Virtual Cockpit', 'LED Matrix', 'Park Assist']
        : ['Virtual Cockpit', 'LED Matrix', 'Asistenca e Parkimit']
    },
    {
      name: 'SEAT',
      image: seat,
      features: language === 'en'
        ? ['Digital Cockpit', 'Full Link', 'Dynamic Control']
        : ['Digital Cockpit', 'Full Link', 'Kontrolli Dinamik']
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {language === 'en' ? 'Supported Brands & Features' : 'Brendet dhe Veçoritë e Mbështetura'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carBrands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 md:h-64">
                <img
                  src={brand.image}
                  alt={`${brand.name} Car`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/800x600/0284c7/ffffff?text=${brand.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {brand.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  {language === 'en' ? 'Available Programming Features:' : 'Veçoritë e Programimit në Dispozicion:'}
                </h4>
                <ul className="space-y-2">
                  {brand.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarShowcase; 