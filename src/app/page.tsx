'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { petModels, dogModels, catModels } from '@/data/models';

const ModelCarousel = dynamic(() => import('@/components/ModelCarousel'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="canvas-container flex items-center justify-center">
        <span className="loader"></span>
      </div>
    </div>
  ),
});

const services = [
  {
    icon: '🩺',
    title: 'General Checkups',
    description: 'Comprehensive health examinations to keep your pet in top condition.',
    color: 'from-amber-50 to-amber-100',
  },
  {
    icon: '💉',
    title: 'Vaccinations',
    description: 'Complete vaccination programs to protect your pet from diseases.',
    color: 'from-orange-50 to-orange-100',
  },
  {
    icon: '🦷',
    title: 'Dental Care',
    description: 'Professional dental cleaning and oral health treatments.',
    color: 'from-yellow-50 to-yellow-100',
  },
  {
    icon: '🔬',
    title: 'Laboratory Services',
    description: 'Advanced diagnostic testing for accurate health assessments.',
    color: 'from-amber-50 to-yellow-100',
  },
  {
    icon: '✂️',
    title: 'Surgery',
    description: 'Safe surgical procedures with modern equipment and expertise.',
    color: 'from-orange-50 to-amber-100',
  },
  {
    icon: '🚨',
    title: 'Emergency Care',
    description: '24/7 emergency services for urgent pet health situations.',
    color: 'from-red-50 to-orange-100',
  },
];

const petTypes = [
  { emoji: '🐕', name: 'Dogs', description: 'All breeds welcome' },
  { emoji: '🐈', name: 'Cats', description: 'Feline specialists' },
  { emoji: '🐦', name: 'Birds', description: 'Avian care experts' },
  { emoji: '🐹', name: 'Small Pets', description: 'Rabbits, hamsters & more' },
  { emoji: '🐢', name: 'Reptiles', description: 'Exotic pet care' },
  { emoji: '🐠', name: 'Fish', description: 'Aquatic health' },
];

export default function HomePage() {
  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="relative hero-pattern dynamic-bg overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 paw-pattern opacity-40"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 
                              text-royal-800 rounded-full mb-8 shadow-warm border border-amber-200/50">
                <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-sm">Premium Pet Healthcare</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                <span className="text-royal-900">Royal Care for Your</span>{' '}
                <span className="text-gradient">Beloved Pets</span>
              </h1>

              <p className="text-lg md:text-xl text-charcoal-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                At VCare Dog and Cat Clinic, we provide exceptional veterinary care
                for all animals. From routine checkups to emergency services, your
                pet&apos;s health is our priority.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="btn-gold text-center text-lg">
                  Book Appointment
                </Link>
                <Link href="/services" className="btn-outline text-center text-lg">
                  Our Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-charcoal-700 font-medium">18+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-charcoal-700 font-medium">24/7 Emergency</span>
                </div>
              </div>
            </div>

            {/* 3D Model Section */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-6 bg-gradient-to-r from-amber-200 via-orange-200 to-amber-200 
                                rounded-full blur-3xl opacity-40"></div>
                <div className="relative glass-card p-4">
                  <ModelCarousel models={petModels.slice(0, 4)} title="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="divider-warm"></div>

      {/* Animals We Treat Section */}
      <section className="py-20 mesh-bg diamond-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              All Pets Welcome
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-4">
              We Treat All Your Furry Friends
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto text-lg">
              From common household pets to exotic animals, our experienced veterinarians
              provide specialized care for every type of animal.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {petTypes.map((pet, index) => (
              <div
                key={pet.name}
                className="premium-card text-center group cursor-pointer hover-glow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {pet.emoji}
                </div>
                <h3 className="font-display font-semibold text-royal-900 mb-1">{pet.name}</h3>
                <p className="text-sm text-charcoal-500">{pet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dogs Section */}
      <section className="py-20 section-warm paw-pattern">
        <div className="container mx-auto px-4">
          <ModelCarousel models={dogModels} title="Meet Our Canine Friends 🐕" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto text-lg">
              We offer a comprehensive range of veterinary services to ensure your
              pet receives the best possible care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="service-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`icon-badge mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-royal-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-charcoal-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-gold inline-block text-lg">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cats Section */}
      <section className="py-20 section-warm paw-pattern">
        <div className="container mx-auto px-4">
          <ModelCarousel models={catModels} title="Meet Our Feline Friends 🐈" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                Why Us
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-8">
                Why Choose VCare Clinic?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Experienced Veterinarians',
                    description: 'Our team has over 20 years of combined experience in animal care.',
                    icon: '👨‍⚕️',
                  },
                  {
                    title: 'Modern Facilities',
                    description: 'State-of-the-art equipment and comfortable environment for your pets.',
                    icon: '🏥',
                  },
                  {
                    title: '24/7 Emergency Care',
                    description: 'We are always available when your pet needs urgent medical attention.',
                    icon: '🚨',
                  },
                  {
                    title: 'Affordable Pricing',
                    description: 'Quality healthcare that won&apos;t break the bank. Flexible payment plans available.',
                    icon: '💰',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="icon-badge-dark flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-charcoal-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="premium-card text-center">
              <div className="text-6xl mb-6">👑</div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-royal-900 mb-4">
                Royal Treatment for Every Pet
              </h3>
              <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
                Your pets deserve nothing but the best. At VCare, we treat every
                animal like royalty with personalized care and attention.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="stat-badge">
                  <div className="stat-number">10K+</div>
                  <div className="text-sm text-charcoal-600 font-medium mt-1">Happy Pets</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">15+</div>
                  <div className="text-sm text-charcoal-600 font-medium mt-1">Expert Vets</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">24/7</div>
                  <div className="text-sm text-charcoal-600 font-medium mt-1">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="royal-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Give Your Pet Royal Treatment?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Book an appointment today and experience the VCare difference.
            Your pet&apos;s health and happiness are our top priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-royal-900 font-bold rounded-xl 
                         hover:bg-cream-100 transition-all duration-300 shadow-xl 
                         hover:shadow-2xl hover:-translate-y-1 text-lg"
            >
              Book Appointment Now
            </Link>
            <a
              href="tel:+918188000557"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl 
                         hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Call: +91 81880 00557
            </a>
          </div>
        </div>
      </section>

      {/* 3D Model Credits Section */}
      <section className="py-16 section-cream paw-pattern">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-display font-semibold text-royal-800 mb-8 text-center">
            3D Model Credits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {petModels.map((model) => (
              <div key={model.id} className="premium-card p-4">
                <p className="font-semibold text-royal-900 mb-1">{model.name}</p>
                <p className="text-charcoal-600">
                  by{' '}
                  <a
                    href={model.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                  >
                    {model.author}
                  </a>
                </p>
                <p className="text-charcoal-500 text-xs mt-1">
                  <a
                    href={model.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {model.license}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
