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
  },
  {
    icon: '💉',
    title: 'Vaccinations',
    description: 'Complete vaccination programs to protect your pet from diseases.',
  },
  {
    icon: '🦷',
    title: 'Dental Care',
    description: 'Professional dental cleaning and oral health treatments.',
  },
  {
    icon: '🔬',
    title: 'Laboratory Services',
    description: 'Advanced diagnostic testing for accurate health assessments.',
  },
  {
    icon: '✂️',
    title: 'Surgery',
    description: 'Safe surgical procedures with modern equipment and expertise.',
  },
  {
    icon: '🚨',
    title: 'Emergency Care',
    description: '24/7 emergency services for urgent pet health situations.',
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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative hero-pattern bg-white overflow-hidden">
        <div className="absolute inset-0 royal-gradient-light opacity-50"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 text-gold-700 rounded-full mb-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">Premium Pet Healthcare</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-royal-900 mb-6">
                Royal Care for Your{' '}
                <span className="text-gold-500">Beloved Pets</span>
              </h1>
              <p className="text-lg md:text-xl text-royal-700 mb-8 max-w-xl mx-auto lg:mx-0">
                At VCare Dog and Cat Clinic, we provide exceptional veterinary care 
                for all animals. From routine checkups to emergency services, your 
                pet&apos;s health is our priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="btn-royal text-center">
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-3 border-2 border-royal-900 text-royal-900 font-semibold 
                             rounded-lg hover:bg-royal-50 transition-all duration-300 text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-royal-200 rounded-full blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 border border-royal-100">
                  <ModelCarousel models={petModels.slice(0, 4)} title="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animals We Treat Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-4">
              We Treat All Your Furry Friends
            </h2>
            <p className="text-royal-600 max-w-2xl mx-auto">
              From common household pets to exotic animals, our experienced veterinarians 
              provide specialized care for every type of animal.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {petTypes.map((pet) => (
              <div
                key={pet.name}
                className="bg-royal-50 rounded-xl p-6 text-center 
                           hover:bg-royal-100 hover:shadow-lg 
                           transition-all duration-300 cursor-pointer
                           border border-royal-100"
              >
                <span className="text-5xl mb-3 block">{pet.emoji}</span>
                <h3 className="font-display font-semibold text-royal-900">{pet.name}</h3>
                <p className="text-sm text-royal-600 mt-1">{pet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dogs Section */}
      <section className="py-16 royal-gradient-light">
        <div className="container mx-auto px-4">
          <ModelCarousel models={dogModels} title="Meet Our Canine Friends 🐕" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-royal-600 max-w-2xl mx-auto">
              We offer a comprehensive range of veterinary services to ensure your 
              pet receives the best possible care.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-display font-semibold text-royal-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-royal-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-gold inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cats Section */}
      <section className="py-16 royal-gradient-light">
        <div className="container mx-auto px-4">
          <ModelCarousel models={catModels} title="Meet Our Feline Friends 🐈" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-6">
                Why Choose VCare Clinic?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: 'Experienced Veterinarians',
                    description: 'Our team has over 20 years of combined experience in animal care.',
                  },
                  {
                    title: 'Modern Facilities',
                    description: 'State-of-the-art equipment and comfortable environment for your pets.',
                  },
                  {
                    title: '24/7 Emergency Care',
                    description: 'We are always available when your pet needs urgent medical attention.',
                  },
                  {
                    title: 'Affordable Pricing',
                    description: 'Quality healthcare that won&apos;t break the bank. Flexible payment plans available.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold-100 
                                    flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gold-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-royal-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-royal-50 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-6">👑</div>
              <h3 className="text-2xl font-display font-bold text-royal-900 mb-4">
                Royal Treatment for Every Pet
              </h3>
              <p className="text-royal-600 mb-6">
                Your pets deserve nothing but the best. At VCare, we treat every 
                animal like royalty with personalized care and attention.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-gold-500">10K+</div>
                  <div className="text-sm text-royal-600">Happy Pets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold-500">15+</div>
                  <div className="text-sm text-royal-600">Expert Vets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gold-500">24/7</div>
                  <div className="text-sm text-royal-600">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Give Your Pet Royal Treatment?
          </h2>
          <p className="text-royal-100 max-w-2xl mx-auto mb-8">
            Book an appointment today and experience the VCare difference. 
            Your pet&apos;s health and happiness are our top priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-lg 
                         hover:bg-gold-600 transition-all duration-300 shadow-lg"
            >
              Book Appointment Now
            </Link>
            <a
              href="tel:+15551234567"
              className="px-8 py-4 bg-white text-royal-900 font-semibold rounded-lg 
                         hover:bg-royal-50 transition-all duration-300"
            >
              Call: +1 (555) 123-4567
            </a>
          </div>
        </div>
      </section>

      {/* 3D Model Credits Section */}
      <section className="py-12 bg-royal-50">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-display font-semibold text-royal-800 mb-6 text-center">
            3D Model Credits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {petModels.map((model) => (
              <div key={model.id} className="bg-white rounded-lg p-4 border border-royal-100">
                <p className="font-medium text-royal-900 mb-1">{model.name}</p>
                <p className="text-royal-600">
                  by{' '}
                  <a
                    href={model.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-700 hover:underline"
                  >
                    {model.author}
                  </a>
                </p>
                <p className="text-royal-500 text-xs mt-1">
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
