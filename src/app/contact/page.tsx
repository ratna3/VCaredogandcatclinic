'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petType: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="bg-cream-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto premium-card p-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 
                            mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-royal-900 mb-4">
              Appointment Request Received!
            </h2>
            <p className="text-charcoal-600 mb-8">
              Thank you for choosing VCare Dog and Cat Clinic. We&apos;ll contact you
              within 24 hours to confirm your appointment.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-gold w-full"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="royal-gradient-premium py-20 relative overflow-hidden">
        <div className="absolute inset-0 paw-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Have questions or ready to book an appointment?
            We&apos;re here to help your pet get the care they deserve.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="premium-card">
              <h2 className="text-2xl font-display font-bold text-royal-900 mb-8">
                Book an Appointment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="+91 81880 00557"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Pet Type *
                    </label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">🐕 Dog</option>
                      <option value="cat">🐈 Cat</option>
                      <option value="bird">🐦 Bird</option>
                      <option value="rabbit">🐰 Rabbit</option>
                      <option value="reptile">🦎 Reptile</option>
                      <option value="other">🐾 Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a service</option>
                    <option value="checkup">🩺 General Checkup</option>
                    <option value="vaccination">💉 Vaccination</option>
                    <option value="dental">🦷 Dental Care</option>
                    <option value="surgery">✂️ Surgery Consultation</option>
                    <option value="emergency">🚨 Emergency Care</option>
                    <option value="grooming">🧴 Grooming</option>
                    <option value="other">📋 Other</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">🌅 Morning (9AM - 12PM)</option>
                      <option value="afternoon">☀️ Afternoon (12PM - 5PM)</option>
                      <option value="evening">🌆 Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your pet's condition or any specific concerns..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-gold text-lg py-4">
                  Request Appointment
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-bold text-royal-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-5">
                {/* Location */}
                <div className="premium-card group">
                  <div className="flex items-start gap-5">
                    <div className="icon-badge-dark flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-2 text-lg">
                        Our Location
                      </h3>
                      <p className="text-charcoal-600 leading-relaxed">
                        GF-96, Khazana Market Chauraha,<br />
                        Sector K, Ashiyana,<br />
                        Lucknow, Uttar Pradesh 226012
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="premium-card group">
                  <div className="flex items-start gap-5">
                    <div className="icon-badge-dark flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-2 text-lg">
                        Phone Numbers
                      </h3>
                      <p className="text-charcoal-600">
                        <a href="tel:+918188000557" className="hover:text-amber-600 transition-colors">
                          Main: +91 81880 00557
                        </a><br />
                        <a href="tel:+918188000557" className="hover:text-amber-600 transition-colors">
                          Emergency: +91 81880 00557
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="premium-card group">
                  <div className="flex items-start gap-5">
                    <div className="icon-badge-dark flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-2 text-lg">
                        Email Address
                      </h3>
                      <p className="text-charcoal-600">
                        <a href="mailto:vcaredogandcatcliniclko@gmail.com" className="hover:text-amber-600 transition-colors">
                          vcaredogandcatcliniclko@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="premium-card group">
                  <div className="flex items-start gap-5">
                    <div className="icon-badge-dark flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-2 text-lg">
                        Working Hours
                      </h3>
                      <div className="text-charcoal-600 space-y-1">
                        <p>Monday - Friday: 8AM - 8PM</p>
                        <p>Saturday: 9AM - 6PM</p>
                        <p>Sunday: 10AM - 4PM</p>
                        <p className="text-forest-600 font-semibold flex items-center gap-2 mt-2">
                          <span className="w-2 h-2 rounded-full bg-forest-500 animate-pulse"></span>
                          Emergency: 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 premium-card h-64 flex items-center justify-center">
                <div className="text-center text-charcoal-500">
                  <div className="icon-badge mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="font-semibold text-charcoal-700">Interactive Map</p>
                  <p className="text-sm">(Google Maps integration here)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-y border-red-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 
                              flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-3xl">🚨</span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-red-800">
                  Pet Emergency?
                </h3>
                <p className="text-red-700">
                  We&apos;re available 24/7 for emergencies. Don&apos;t wait!
                </p>
              </div>
            </div>
            <a
              href="tel:+918188000557"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white 
                         font-bold rounded-xl hover:from-red-700 hover:to-red-800 
                         transition-all duration-300 shadow-lg hover:shadow-xl 
                         hover:-translate-y-1 text-lg"
            >
              Call Emergency: +91 81880 00557
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
