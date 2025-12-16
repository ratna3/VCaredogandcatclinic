import Link from 'next/link';

const team = [
  {
    name: 'Dr. Rahul Chandra',
    role: 'Chief Veterinarian',
    specialty: 'MVSC in Gynecology',
    image: '👩‍⚕️',
    bio: 'With over 30+ years of experience, Dr. Chandra leads our team with expertise in internal medicine and preventive care.',
  },
  {
    name: 'Dr. Shabina Nisha',
    role: 'Junior Veterinary Doctor',
    specialty: 'BVSc&AH',
    image: '👨‍⚕️',
    bio: 'Dr. Nisha is our excellent clinician who is good in clinical diagnostics and laboratory diagnostics ',
  },
  {
    name: 'Dr. Pulkit Tiwari',
    role: 'Junior Veterinary Doctor',
    specialty: 'Machine Operator & Laboratory Diagnostics',
    image: '👩‍⚕️',
    bio: 'Dr. Tiwari specializes in diagnostic imaging and laboratory work, ensuring accurate diagnoses for our patients.',
  },
  {
    name: 'Dr. Vaishnavi Agarwal',
    role: 'Veterinarian Intern',
    specialty: 'BVSc&AH',
    image: '👨‍⚕️',
    bio: 'Dr. Agarwal focuses on assisting junior doctors and providing compassionate care to all animals.',
  },
];

const values = [
  {
    icon: '❤️',
    title: 'Compassion',
    description: 'We treat every pet with love and kindness, understanding they are family members.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    description: 'We strive for the highest standards in veterinary medicine and patient care.',
  },
  {
    icon: '🤝',
    title: 'Trust',
    description: 'We build lasting relationships with pet owners based on transparency and honesty.',
  },
  {
    icon: '📚',
    title: 'Education',
    description: 'We empower pet owners with knowledge to make informed decisions about their pet\'s health.',
  },
];

const milestones = [
  { year: '2007', event: 'VCare Dog and Cat Clinic founded' },
  { year: '2010', event: 'Expanded to 24/7 emergency services' },
  { year: '2015', event: 'Opened state-of-the-art surgical wing' },
  { year: '2018', event: 'Added exotic animal care services' },
  { year: '2020', event: 'Celebrated 10,000+ happy pets treated' },
  { year: '2023', event: 'Introduced advanced diagnostic imaging' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            About VCare Clinic
          </h1>
          <p className="text-xl text-royal-100 max-w-2xl mx-auto">
            Your trusted partner in pet healthcare since 2007. 
            We&apos;re committed to providing royal treatment for every pet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-royal-700">
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
            <div className="bg-royal-50 rounded-2xl p-8">
              <div className="text-8xl text-center mb-6">🏥</div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-royal-900">18+</div>
                  <div className="text-royal-600">Years of Service</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-royal-900">10K+</div>
                  <div className="text-royal-600">Happy Pets</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-royal-900">15+</div>
                  <div className="text-royal-600">Expert Staff</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-royal-900">24/7</div>
                  <div className="text-royal-600">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-royal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-royal-600 max-w-2xl mx-auto">
              These principles guide our practice and shape the care we provide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center 
                           shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="text-5xl block mb-4">{value.icon}</span>
                <h3 className="text-xl font-display font-semibold text-royal-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-royal-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-royal-600 max-w-2xl mx-auto">
              Our experienced veterinarians and staff are dedicated to your pet&apos;s health.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-royal-100 overflow-hidden 
                           hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-royal-100 p-8 text-center">
                  <span className="text-7xl">{member.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-royal-900">
                    {member.name}
                  </h3>
                  <p className="text-gold-600 font-medium text-sm">{member.role}</p>
                  <p className="text-royal-500 text-sm mt-1">{member.specialty}</p>
                  <p className="text-royal-600 text-sm mt-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-royal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-royal-900 mb-4">
              Our Journey
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-royal-900 text-white 
                                  flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="pt-3">
                  <p className="text-royal-800 font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Join the VCare Family?
          </h2>
          <p className="text-royal-100 max-w-2xl mx-auto mb-8">
            Schedule your first visit today and experience the difference of royal pet care.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-gold-500 text-white font-semibold rounded-lg 
                       hover:bg-gold-600 transition-all duration-300 shadow-lg inline-block"
          >
            Book Your First Visit
          </Link>
        </div>
      </section>
    </div>
  );
}
