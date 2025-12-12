import Link from 'next/link';

const services = [
  {
    icon: '🩺',
    title: 'General Health Checkups',
    description:
      'Comprehensive physical examinations to assess your pet\'s overall health. We check vital signs, body condition, dental health, and provide personalized recommendations.',
    features: ['Full body examination', 'Weight monitoring', 'Health assessment report', 'Personalized care plan'],
    price: 'From $50',
  },
  {
    icon: '💉',
    title: 'Vaccinations',
    description:
      'Complete vaccination programs to protect your pet from common and serious diseases. We offer core and lifestyle vaccines tailored to your pet\'s needs.',
    features: ['Core vaccines', 'Lifestyle vaccines', 'Vaccination schedule', 'Health certificate'],
    price: 'From $25',
  },
  {
    icon: '🦷',
    title: 'Dental Care',
    description:
      'Professional dental services including cleanings, extractions, and oral surgery. Good dental health is essential for your pet\'s overall wellbeing.',
    features: ['Dental cleaning', 'Tooth extraction', 'Oral surgery', 'Dental X-rays'],
    price: 'From $150',
  },
  {
    icon: '🔬',
    title: 'Laboratory Services',
    description:
      'Advanced diagnostic testing including blood work, urinalysis, and pathology. Quick and accurate results for better treatment decisions.',
    features: ['Blood tests', 'Urinalysis', 'Pathology', 'Rapid testing'],
    price: 'From $75',
  },
  {
    icon: '✂️',
    title: 'Surgical Services',
    description:
      'Safe and professional surgical procedures using modern equipment. From routine spays/neuters to complex surgeries.',
    features: ['Spay/neuter', 'Soft tissue surgery', 'Orthopedic surgery', 'Post-op care'],
    price: 'From $200',
  },
  {
    icon: '🚨',
    title: '24/7 Emergency Care',
    description:
      'Round-the-clock emergency veterinary services for urgent situations. Our team is always ready to help when your pet needs it most.',
    features: ['24/7 availability', 'Critical care', 'Emergency surgery', 'Intensive monitoring'],
    price: 'Contact for pricing',
  },
  {
    icon: '📷',
    title: 'Diagnostic Imaging',
    description:
      'State-of-the-art imaging services including X-rays and ultrasound for accurate diagnosis of internal conditions.',
    features: ['Digital X-rays', 'Ultrasound', 'Quick results', 'Expert interpretation'],
    price: 'From $100',
  },
  {
    icon: '🧴',
    title: 'Pet Grooming',
    description:
      'Professional grooming services to keep your pet looking and feeling their best. From baths to full grooming packages.',
    features: ['Bath & brush', 'Haircuts', 'Nail trimming', 'Ear cleaning'],
    price: 'From $40',
  },
  {
    icon: '💊',
    title: 'Pharmacy',
    description:
      'In-house pharmacy with prescription medications, preventatives, and specialty diets. Convenient and reliable access to pet medications.',
    features: ['Prescription meds', 'Flea/tick prevention', 'Heartworm prevention', 'Specialty diets'],
    price: 'Varies',
  },
  {
    icon: '🏥',
    title: 'Hospitalization',
    description:
      'Comfortable and monitored hospitalization for pets requiring extended care or observation. 24-hour nursing care available.',
    features: ['24-hour monitoring', 'IV therapy', 'Oxygen therapy', 'Comfortable housing'],
    price: 'From $75/day',
  },
  {
    icon: '🐾',
    title: 'Microchipping',
    description:
      'Permanent identification for your pet. A microchip provides peace of mind and increases the chances of reunion if your pet is lost.',
    features: ['Permanent ID', 'Registration', 'Quick procedure', 'Lifetime protection'],
    price: 'From $45',
  },
  {
    icon: '🥗',
    title: 'Nutrition Counseling',
    description:
      'Expert nutritional advice tailored to your pet\'s age, breed, and health conditions. Proper nutrition is the foundation of good health.',
    features: ['Diet assessment', 'Weight management', 'Special diets', 'Supplement advice'],
    price: 'From $30',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-royal-100 max-w-2xl mx-auto">
            Comprehensive veterinary care for all your pet&apos;s needs. 
            From routine checkups to emergency services, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-royal-100 
                           overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <span className="text-5xl block mb-4">{service.icon}</span>
                  <h3 className="text-xl font-display font-semibold text-royal-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-royal-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-royal-700">
                        <svg
                          className="w-4 h-4 text-gold-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-royal-100">
                    <span className="font-semibold text-gold-600">{service.price}</span>
                    <Link
                      href="/contact"
                      className="text-royal-700 hover:text-royal-900 font-medium text-sm"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-royal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-royal-900 mb-4">
            Not Sure What Your Pet Needs?
          </h2>
          <p className="text-royal-600 max-w-2xl mx-auto mb-8">
            Our experienced veterinarians are here to help. Schedule a consultation 
            and we&apos;ll recommend the best care plan for your pet.
          </p>
          <Link href="/contact" className="btn-gold inline-block">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
