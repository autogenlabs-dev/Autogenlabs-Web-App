'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, Building, Globe, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  console.log('🔍 Contact Page: Component loaded');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Support",
      description: "Get help from our support team",
      contact: "support@autogenlabs.com",
      availability: "24/7",
      responseTime: "Within 4 hours"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      contact: "Available on our platform",
      availability: "Mon-Fri, 9AM-6PM PST",
      responseTime: "Instant"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9AM-6PM PST",
      responseTime: "Immediate"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Enterprise Support",
      description: "Dedicated support for enterprise clients",
      contact: "enterprise@autogenlabs.com",
      availability: "24/7 SLA",
      responseTime: "Within 1 hour"
    }
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Technology Drive, Suite 400",
      region: "CA 94107, United States",
      phone: "+1 (555) 123-4567",
      type: "Headquarters",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      city: "New York",
      address: "456 Innovation Ave, Floor 15",
      region: "NY 10001, United States", 
      phone: "+1 (555) 987-6543",
      type: "East Coast Office",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      city: "London",
      address: "789 Tech Park, Canary Wharf",
      region: "E14 5AB, United Kingdom",
      phone: "+44 20 7123 4567",
      type: "European Office",
      coordinates: { lat: 51.5074, lng: -0.1278 }
    },
    {
      city: "Singapore",
      address: "321 Digital Hub, Marina Bay",
      region: "018956, Singapore",
      phone: "+65 6123 4567",
      type: "Asia-Pacific Office",
      coordinates: { lat: 1.3521, lng: 103.8198 }
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'careers', label: 'Careers' },
    { value: 'media', label: 'Media & Press' },
    { value: 'security', label: 'Security Issue' },
    { value: 'enterprise', label: 'Enterprise Solutions' }
  ];

  const faqs = [
    {
      question: "What are your support hours?",
      answer: "Our general support is available 24/7 via email and chat. Phone support is available Monday-Friday, 9AM-6PM PST. Enterprise customers have 24/7 phone support."
    },
    {
      question: "How can I get a demo of your platform?",
      answer: "You can request a personalized demo by filling out our contact form or emailing sales@autogenlabs.com. Our team will schedule a live demonstration tailored to your needs."
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Yes, we offer comprehensive enterprise solutions including dedicated support, custom integrations, advanced security features, and SLA guarantees."
    },
    {
      question: "How do I report a security vulnerability?",
      answer: "Please report security issues to security@autogenlabs.com. We take security seriously and will respond to all reports promptly."
    }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <div className="p-4 bg-green-500/10 rounded-full border border-green-500/20">
                <MessageCircle className="w-16 h-16 text-green-400" />
              </div>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-blue-400 bg-clip-text text-transparent"
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Have questions about our platform? Need help getting started? Want to explore enterprise solutions? 
              We&apos;re here to help you succeed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs. We&apos;re committed to providing 
              exceptional support and quick responses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-green-400 mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="text-white font-medium">{method.contact}</div>
                  <div className="text-gray-400">
                    <Clock className="w-4 h-4 inline mr-2" />
                    {method.availability}
                  </div>
                  <div className="text-green-400">
                    Response: {method.responseTime}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type of Inquiry
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  required
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Company and Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none resize-none"
                  placeholder="Please provide details about your inquiry..."
                  required
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>
                    {submitStatus === 'success' 
                      ? 'Message sent successfully! We\'ll get back to you soon.' 
                      : 'Failed to send message. Please try again or contact us directly.'
                    }
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Global Offices</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              With offices around the world, we&apos;re always close to our customers and partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-6 h-6 text-blue-400" />
                  <div>
                    <h3 className="text-lg font-bold">{office.city}</h3>
                    <p className="text-sm text-blue-400">{office.type}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-gray-300">{office.address}</div>
                      <div className="text-gray-400">{office.region}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{office.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3 text-green-400">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who are already building amazing software with AutoGen. 
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth"
                className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/pricing"
                className="border border-gray-600 hover:border-green-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-green-600/10"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
