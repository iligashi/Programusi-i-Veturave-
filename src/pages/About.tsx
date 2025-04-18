import { motion } from 'framer-motion';
import { FaCheckCircle, FaCar, FaTools, FaAward } from 'react-icons/fa';

const About = () => {
  const expertise = [
    {
      icon: <FaCar className="h-8 w-8 text-blue-500" />,
      title: 'Premium Brands',
      description: 'Specialized in BMW, AUDI, LAMBORGHINI, VW, SKODA, and SEAT vehicles',
    },
    {
      icon: <FaTools className="h-8 w-8 text-blue-500" />,
      title: 'Professional Tools',
      description: 'Using the latest diagnostic and programming equipment',
    },
    {
      icon: <FaAward className="h-8 w-8 text-blue-500" />,
      title: 'Certified Expertise',
      description: 'Licensed and certified car programming specialists',
    },
  ];

  const features = [
    'Licensed and guaranteed programming services',
    'Years of experience in vehicle customization',
    'State-of-the-art programming equipment',
    'Professional customer service',
    'Multiple convenient locations',
    'Competitive pricing',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your trusted partner in professional car programming and customization
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We specialize in premium vehicle programming and customization,
              offering a wide range of services to enhance your driving experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <FaCheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To provide professional and reliable car programming services that enhance
                your vehicle's capabilities while ensuring customer satisfaction and safety.
              </p>
              <p className="text-gray-600">
                We are committed to using the latest technology and maintaining the highest
                standards in automotive programming and customization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 