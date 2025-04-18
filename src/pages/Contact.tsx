import { motion } from 'framer-motion';
import { FaWhatsapp, FaViber, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const locations = [
    {
      city: 'Prishtinë',
      address: 'Rruga B, Pristina 10000',
    },
    {
      city: 'Tiranë',
      address: 'Central Location',
    },
    {
      city: 'Durrës',
      address: 'Central Location',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get in touch with us for professional car programming services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <FaWhatsapp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">WhatsApp</h3>
                  <p className="text-gray-600">(+383) 49-599-931</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 p-3 rounded-full">
                  <FaViber className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Viber</h3>
                  <p className="text-gray-600">(+383) 49-599-931</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-3 rounded-full">
                  <FaPhone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Phone</h3>
                  <p className="text-gray-600">(+383) 49-599-931</p>
                </div>
              </div>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Locations</h2>
              <div className="grid gap-6">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4"
                  >
                    <FaMapMarkerAlt className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold">{location.city}</h3>
                      <p className="text-gray-600">{location.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Business Hours</h2>
          <p className="text-xl text-gray-600">
            Monday - Saturday: 9:00 AM - 6:00 PM
          </p>
          <p className="text-gray-600">
            Sunday: Closed
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact; 