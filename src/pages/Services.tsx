import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      category: 'Entertainment & Display',
      items: [
        'DVD/Video activation while driving',
        'CarPlay Wi-Fi activation',
        'M or Alpina display activation (BMW)',
        'RS lights activation (AUDI)',
        'S or RS display mode (AUDI)',
        'M logo activation on display',
      ],
    },
    {
      category: 'Driving & Safety',
      items: [
        'Autopilot and lane keeping',
        'Parking sensors on display',
        'Fog lights activation with steering',
        'Start/Stop memory (deactivation)',
        'Mirror folding when locking',
        'Mirror tilt in reverse',
      ],
    },
    {
      category: 'Customization',
      items: [
        'Ambient Colors activation',
        'Needle sweep activation',
        'LED daytime running lights',
        'R view with 320km/h graphics',
        'Trunk remote control',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Professional programming services for premium vehicles including BMW, AUDI, LAMBORGHINI, VW, SKODA, and SEAT
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-blue-600 text-white py-4 px-6">
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                </div>
                <ul className="p-6 space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <FaCheck className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Need Our Services?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us via WhatsApp or Viber at (+383) 49-599-931
          </p>
          <p className="text-gray-600">
            Locations: Prishtinë - Tiranë - Durrës
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services; 