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
    // In a real app, this would send the data to a server
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
      <div className="bg-white min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-green-50 rounded-xl p-8">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-display font-bold text-green-800 mb-4">
              Appointment Request Received!
            </h2>
            <p className="text-green-700 mb-6">
              Thank you for choosing VCare Dog and Cat Clinic. We&apos;ll contact you 
              within 24 hours to confirm your appointment.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-royal"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="royal-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-royal-100 max-w-2xl mx-auto">
            Have questions or ready to book an appointment? 
            We&apos;re here to help your pet get the care they deserve.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-display font-bold text-royal-900 mb-6">
                Book an Appointment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                      placeholder="+91 81880 00557"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Pet Type *
                    </label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                    >
                      <option value="">Select pet type</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="reptile">Reptile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-royal-200 
                               focus:outline-none focus:ring-2 focus:ring-royal-500"
                  >
                    <option value="">Select a service</option>
                    <option value="checkup">General Checkup</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="dental">Dental Care</option>
                    <option value="surgery">Surgery Consultation</option>
                    <option value="emergency">Emergency Care</option>
                    <option value="grooming">Grooming</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-royal-700 mb-1">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-royal-200 
                                 focus:outline-none focus:ring-2 focus:ring-royal-500"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (9AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-royal-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-royal-200 
                               focus:outline-none focus:ring-2 focus:ring-royal-500"
                    placeholder="Tell us about your pet's condition or any specific concerns..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-gold">
                  Request Appointment
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-bold text-royal-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="bg-royal-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-royal-900 text-white 
                                    flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-1">
                        Our Location
                      </h3>
                      <p className="text-royal-600">
                        GF-96, Khazana Market Chauraha,<br />
                        Sector K, Ashiyana,<br />
                        Lucknow, Uttar Pradesh 226012
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-royal-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-royal-900 text-white 
                                    flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-1">
                        Phone Numbers
                      </h3>
                      <p className="text-royal-600">
                        Main: +91 81880 00557<br />
                        Emergency: +91 81880 00557
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-royal-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-royal-900 text-white 
                                    flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-1">
                        Email Address
                      </h3>
                      <p className="text-royal-600">
                        info@vcaredogandcat.com<br />
                        appointments@vcaredogandcat.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-royal-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-royal-900 text-white 
                                    flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-royal-900 mb-1">
                        Working Hours
                      </h3>
                      <p className="text-royal-600">
                        Monday - Friday: 8AM - 8PM<br />
                        Saturday: 9AM - 6PM<br />
                        Sunday: 10AM - 4PM<br />
                        <span className="text-gold-600 font-medium">
                          Emergency: 24/7
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-royal-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-royal-600">
                  <svg
                    className="w-16 h-16 mx-auto mb-2 text-royal-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>Interactive Map</p>
                  <p className="text-sm">(Google Maps integration here)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🚨</div>
              <div>
                <h3 className="text-xl font-display font-bold text-red-800">
                  Pet Emergency?
                </h3>
                <p className="text-red-700">
                  We&apos;re available 24/7 for emergencies. Don&apos;t wait!
                </p>
              </div>
            </div>
            <a
              href="tel:+918188000557"
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg 
                         hover:bg-red-700 transition-colors shadow-lg"
            >
              Call Emergency Line: +91 81880 00557
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
