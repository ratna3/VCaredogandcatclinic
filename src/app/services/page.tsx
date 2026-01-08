import Link from 'next/link';

const services = [
  {
    icon: '🩺',
    title: 'General Health Checkups',
    description:
      'Comprehensive physical examinations to assess your pet\'s overall health. We check vital signs, body condition, dental health, and provide personalized recommendations.',
    features: ['Full body examination', 'Weight monitoring', 'Health assessment report', 'Personalized care plan'],
    price: 'From $50',
    color: 'from-amber-100 to-orange-100',
  },
  {
    icon: '💉',
    title: 'Vaccinations',
    description:
      'Complete vaccination programs to protect your pet from common and serious diseases. We offer core and lifestyle vaccines tailored to your pet\'s needs.',
    features: ['Core vaccines', 'Lifestyle vaccines', 'Vaccination schedule', 'Health certificate'],
    price: 'From $25',
    color: 'from-blue-100 to-indigo-100',
  },
  {
    icon: '🦷',
    title: 'Dental Care',
    description:
      'Professional dental services including cleanings, extractions, and oral surgery. Good dental health is essential for your pet\'s overall wellbeing.',
    features: ['Dental cleaning', 'Tooth extraction', 'Oral surgery', 'Dental X-rays'],
    price: 'From $150',
    color: 'from-cyan-100 to-teal-100',
  },
  {
    icon: '🔬',
    title: 'Laboratory Services',
    description:
      'Advanced diagnostic testing including blood work, urinalysis, and pathology. Quick and accurate results for better treatment decisions.',
    features: ['Blood tests', 'Urinalysis', 'Pathology', 'Rapid testing'],
    price: 'From $75',
    color: 'from-purple-100 to-pink-100',
  },
  {
    icon: '✂️',
    title: 'Surgical Services',
    description:
      'Safe and professional surgical procedures using modern equipment. From routine spays/neuters to complex surgeries.',
    features: ['Spay/neuter', 'Soft tissue surgery', 'Orthopedic surgery', 'Post-op care'],
    price: 'From $200',
    color: 'from-red-100 to-orange-100',
  },
  {
    icon: '🚨',
    title: '24/7 Emergency Care',
    description:
      'Round-the-clock emergency veterinary services for urgent situations. Our team is always ready to help when your pet needs it most.',
    features: ['24/7 availability', 'Critical care', 'Emergency surgery', 'Intensive monitoring'],
    price: 'Contact for pricing',
    color: 'from-red-100 to-rose-100',
  },
  {
    icon: '📷',
    title: 'Diagnostic Imaging',
    description:
      'State-of-the-art imaging services including X-rays and ultrasound for accurate diagnosis of internal conditions.',
    features: ['Digital X-rays', 'Ultrasound', 'Quick results', 'Expert interpretation'],
    price: 'From $100',
    color: 'from-slate-100 to-gray-100',
  },
  {
    icon: '🧴',
    title: 'Pet Grooming',
    description:
      'Professional grooming services to keep your pet looking and feeling their best. From baths to full grooming packages.',
    features: ['Bath & brush', 'Haircuts', 'Nail trimming', 'Ear cleaning'],
    price: 'From $40',
    color: 'from-pink-100 to-fuchsia-100',
  },
  {
    icon: '💊',
    title: 'Pharmacy',
    description:
      'In-house pharmacy with prescription medications, preventatives, and specialty diets. Convenient and reliable access to pet medications.',
    features: ['Prescription meds', 'Flea/tick prevention', 'Heartworm prevention', 'Specialty diets'],
    price: 'Varies',
    color: 'from-green-100 to-emerald-100',
  },
  {
    icon: '🏥',
    title: 'Hospitalization',
    description:
      'Comfortable and monitored hospitalization for pets requiring extended care or observation. 24-hour nursing care available.',
    features: ['24-hour monitoring', 'IV therapy', 'Oxygen therapy', 'Comfortable housing'],
    price: 'From $75/day',
    color: 'from-sky-100 to-blue-100',
  },
  {
    icon: '🐾',
    title: 'Microchipping',
    description:
      'Permanent identification for your pet. A microchip provides peace of mind and increases the chances of reunion if your pet is lost.',
    features: ['Permanent ID', 'Registration', 'Quick procedure', 'Lifetime protection'],
    price: 'From $45',
    color: 'from-amber-100 to-yellow-100',
  },
  {
    icon: '🥗',
    title: 'Nutrition Counseling',
    description:
      'Expert nutritional advice tailored to your pet\'s age, breed, and health conditions. Proper nutrition is the foundation of good health.',
    features: ['Diet assessment', 'Weight management', 'Special diets', 'Supplement advice'],
    price: 'From $30',
    color: 'from-lime-100 to-green-100',
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="royal-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive veterinary care for all your pet&apos;s needs.
            From routine checkups to emergency services, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="premium-card group overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="p-2">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center 
                                  bg-gradient-to-br ${service.color} mb-5 
                                  transition-transform duration-300 group-hover:scale-110`}>
                    <span className="text-3xl">{service.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-royal-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal-600 mb-5 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-charcoal-700">
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-5 border-t border-cream-300">
                    <span className="text-gradient font-bold text-lg">{service.price}</span>
                    <Link
                      href="/contact"
                      className="text-royal-800 hover:text-amber-600 font-semibold text-sm 
                                 flex items-center gap-1 transition-colors group/link"
                    >
                      Book Now
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-warm paw-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/80 text-amber-700 rounded-full text-sm font-semibold mb-4">
            Need Help?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-6">
            Not Sure What Your Pet Needs?
          </h2>
          <p className="text-charcoal-600 max-w-2xl mx-auto mb-10 text-lg">
            Our experienced veterinarians are here to help. Schedule a consultation
            and we&apos;ll recommend the best care plan for your pet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold text-lg">
              Schedule a Consultation
            </Link>
            <a href="tel:+918188000557" className="btn-outline text-lg">
              Call: +91 81880 00557
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 section-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: '18+ Years', subtitle: 'Experience' },
              { icon: '👨‍⚕️', title: '15+ Experts', subtitle: 'Veterinarians' },
              { icon: '🐾', title: '10K+ Pets', subtitle: 'Treated' },
              { icon: '⭐', title: '4.9 Rating', subtitle: 'Customer Reviews' },
            ].map((stat, index) => (
              <div key={index} className="stat-badge">
                <span className="text-4xl mb-3 block">{stat.icon}</span>
                <div className="stat-number">{stat.title}</div>
                <div className="text-charcoal-600 font-medium mt-1">{stat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
