import Link from 'next/link';

const team = [
  {
    name: 'Dr. Rahul Chandra',
    role: 'Chief Veterinarian',
    specialty: 'MVSC in Gynecology',
    image: '👨‍⚕️',
    bio: 'With over 30+ years of experience, Dr. Chandra leads our team with expertise in internal medicine and preventive care.',
  },
  {
    name: 'Dr. Shabina Nisha',
    role: 'Junior Veterinary Doctor',
    specialty: 'BVSc&AH',
    image: '👩‍⚕️',
    bio: 'Dr. Nisha is our excellent clinician who is good in clinical diagnostics and laboratory diagnostics ',
  },
  {
    name: 'Dr. Pulkit Tiwari',
    role: 'Junior Veterinary Doctor',
    specialty: 'BVSc&AH',
    image: '👨‍⚕️',
    bio: 'Dr. Tiwari specializes in diagnostic imaging and laboratory work, ensuring accurate diagnoses for our patients.',
  },
  {
    name: 'Dr. Vaishnavi Agarwal',
    role: 'Veterinarian Intern',
    specialty: 'BVSc&AH',
    image: '👩‍⚕️',
    bio: 'Dr. Agarwal focuses on assisting junior doctors and providing compassionate care to all animals.',
  },
];

const values = [
  {
    icon: '❤️',
    title: 'Compassion',
    description: 'We treat every pet with love and kindness, understanding they are family members.',
    color: 'from-red-100 to-orange-100',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    description: 'We strive for the highest standards in veterinary medicine and patient care.',
    color: 'from-amber-100 to-yellow-100',
  },
  {
    icon: '🤝',
    title: 'Trust',
    description: 'We build lasting relationships with pet owners based on transparency and honesty.',
    color: 'from-blue-100 to-indigo-100',
  },
  {
    icon: '📚',
    title: 'Education',
    description: 'We empower pet owners with knowledge to make informed decisions about their pet\'s health.',
    color: 'from-green-100 to-emerald-100',
  },
];

const milestones = [
  { year: '2007', event: 'VCare Dog and Cat Clinic founded', icon: '🎉' },
  { year: '2010', event: 'Expanded to 24/7 emergency services', icon: '🚨' },
  { year: '2015', event: 'Opened state-of-the-art surgical wing', icon: '🏥' },
  { year: '2018', event: 'Added exotic animal care services', icon: '🦎' },
  { year: '2020', event: 'Celebrated 10,000+ happy pets treated', icon: '🎊' },
  { year: '2023', event: 'Introduced advanced diagnostic imaging', icon: '📷' },
];

export default function AboutPage() {
  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="royal-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            About VCare Clinic
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Your trusted partner in pet healthcare since 2007.
            We&apos;re committed to providing royal treatment for every pet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-charcoal-600 leading-relaxed">
                <p>
                  VCare Dog and Cat Clinic was founded in 2007 with a simple mission:
                  to provide exceptional veterinary care with compassion and expertise.
                  What started as a small neighborhood clinic has grown into a
                  full-service animal hospital serving thousands of pets each year.
                </p>
                <p>
                  Our founder, Dr. Rahul Chandra, believed that every pet deserves
                  royal treatment. This philosophy guides everything we do, from our
                  gentle handling techniques to our state-of-the-art medical equipment.
                </p>
                <p>
                  Today, we&apos;re proud to serve not just dogs and cats, but all kinds
                  of animals including birds, rabbits, reptiles, and other exotic pets.
                  Our diverse team of specialists ensures that every animal receives
                  the specialized care they need.
                </p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="premium-card text-center">
              <div className="text-8xl mb-8">🏥</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-badge">
                  <div className="stat-number">18+</div>
                  <div className="text-charcoal-600 font-medium mt-1">Years of Service</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">10K+</div>
                  <div className="text-charcoal-600 font-medium mt-1">Happy Pets</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">15+</div>
                  <div className="text-charcoal-600 font-medium mt-1">Expert Staff</div>
                </div>
                <div className="stat-badge">
                  <div className="stat-number">24/7</div>
                  <div className="text-charcoal-600 font-medium mt-1">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 section-warm paw-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-white/80 text-amber-700 rounded-full text-sm font-semibold mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto text-lg">
              These principles guide our practice and shape the care we provide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="premium-card text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center 
                                bg-gradient-to-br ${value.color} transition-transform duration-300 
                                group-hover:scale-110`}>
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-royal-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 section-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              The Experts
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-charcoal-600 max-w-2xl mx-auto text-lg">
              Our experienced veterinarians and staff are dedicated to your pet&apos;s health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="premium-card overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 text-center 
                                -mx-8 -mt-8 mb-6 relative">
                  <div className="absolute inset-0 paw-pattern opacity-30"></div>
                  <span className="text-7xl relative z-10 transition-transform duration-300 
                                   inline-block group-hover:scale-110">{member.image}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-display font-semibold text-royal-900 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-gradient font-medium text-sm mt-1">{member.role}</p>
                  <p className="text-charcoal-500 text-sm mt-1">{member.specialty}</p>
                  <p className="text-charcoal-600 text-sm mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 section-warm paw-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-white/80 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Milestones
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-royal-900 mb-4">
              Our Journey
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0 group">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-royal-800 to-royal-950 
                                  text-white flex flex-col items-center justify-center shadow-lg 
                                  group-hover:shadow-warm transition-all duration-300 group-hover:scale-105">
                    <span className="text-xl">{milestone.icon}</span>
                    <span className="text-sm font-bold mt-1">{milestone.year}</span>
                  </div>
                </div>
                <div className="pt-5">
                  <p className="text-charcoal-800 font-medium text-lg">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="royal-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Join the VCare Family?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            Schedule your first visit today and experience the difference of royal pet care.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white text-royal-900 font-bold rounded-xl 
                       hover:bg-cream-100 transition-all duration-300 shadow-xl 
                       hover:shadow-2xl hover:-translate-y-1 inline-block text-lg"
          >
            Book Your First Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
