'use client';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, CheckCircle, FileText, Users, Globe, ArrowRight, Download, Star, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and security protocols protect your code and data at all times.",
      details: ["AES-256 encryption", "TLS 1.3 in transit", "Zero-trust architecture", "Multi-layer security"]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Data Protection",
      description: "Your intellectual property remains yours. We never train on your private code.",
      details: ["Private code isolation", "No model training on your data", "Automatic data purging", "GDPR compliant"]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Privacy by Design",
      description: "Privacy is built into every aspect of our platform from the ground up.",
      details: ["Minimal data collection", "Anonymized analytics", "Opt-in telemetry", "Transparent policies"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Infrastructure Security",
      description: "Hardened infrastructure with continuous monitoring and threat detection.",
      details: ["AWS security standards", "24/7 monitoring", "Automated threat response", "Regular security audits"]
    }
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description: "Certified for security, availability, and confidentiality",
      status: "Certified",
      icon: "🛡️"
    },
    {
      name: "GDPR Compliance",
      description: "Full compliance with EU data protection regulations",
      status: "Compliant",
      icon: "🇪🇺"
    },
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      status: "In Progress",
      icon: "📋"
    },
    {
      name: "HIPAA Ready",
      description: "Healthcare data protection compliance available",
      status: "Available",
      icon: "🏥"
    }
  ];

  const securityPractices = [
    {
      category: "Access Control",
      practices: [
        "Multi-factor authentication (MFA) required for all accounts",
        "Role-based access control (RBAC) with principle of least privilege",
        "Single Sign-On (SSO) integration with enterprise identity providers",
        "Regular access reviews and automated deprovisioning"
      ]
    },
    {
      category: "Data Security",
      practices: [
        "End-to-end encryption for all data transmission and storage",
        "Data tokenization and pseudonymization where applicable",
        "Secure data deletion and retention policies",
        "Regular data backup and disaster recovery testing"
      ]
    },
    {
      category: "Network Security",
      practices: [
        "Web Application Firewall (WAF) protection",
        "DDoS mitigation and traffic filtering",
        "Network segmentation and microsegmentation",
        "Intrusion detection and prevention systems"
      ]
    },
    {
      category: "Monitoring & Response",
      practices: [
        "24/7 Security Operations Center (SOC) monitoring",
        "Real-time threat detection and analysis",
        "Automated incident response workflows",
        "Regular penetration testing and vulnerability assessments"
      ]
    }
  ];

  const privacyPrinciples = [
    {
      title: "Data Minimization",
      description: "We collect only the data necessary to provide our services and enhance your experience."
    },
    {
      title: "Purpose Limitation",
      description: "Data is used only for the specific purposes for which it was collected and consented to."
    },
    {
      title: "Transparency",
      description: "Clear, understandable privacy policies and data usage notifications for all users."
    },
    {
      title: "User Control",
      description: "Full control over your data with easy options to view, export, modify, or delete your information."
    }
  ];

  const trustMetrics = [
    { label: "Uptime SLA", value: "99.9%", description: "Guaranteed service availability" },
    { label: "Security Incidents", value: "0", description: "Major security breaches to date" },
    { label: "Data Centers", value: "Global", description: "Geographically distributed infrastructure" },
    { label: "Penetration Tests", value: "Quarterly", description: "Third-party security assessments" }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-2 mb-8">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Enterprise-Grade Security</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-green-400 bg-clip-text text-transparent">
              Security & Privacy
              <span className="block">You Can Trust</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your code, data, and privacy are protected by enterprise-grade security measures, 
              industry certifications, and transparent practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#security-features"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Explore Security Features <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#compliance"
                className="border border-gray-600 hover:border-blue-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-blue-600/10"
              >
                View Compliance
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security-features" className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Security Architecture</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Multi-layered security approach designed to protect your most valuable assets - 
              your code and intellectual property.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section id="compliance" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Compliance & Certifications</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We meet the highest industry standards and regulatory requirements to ensure 
              your data is handled with the utmost care and compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-green-500/50 transition-colors"
              >
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{cert.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  cert.status === 'Certified' || cert.status === 'Compliant' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {cert.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Security Practices</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive security measures implemented across all aspects of our platform 
              and operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-400">{category.category}</h3>
                <div className="space-y-4">
                  {category.practices.map((practice, practiceIndex) => (
                    <div key={practiceIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{practice}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Privacy Principles</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our commitment to protecting your privacy goes beyond compliance - 
              it&apos;s fundamental to how we build and operate our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">{principle.title}</h3>
                <p className="text-gray-300">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Resources */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Security Resources</h2>
            <p className="text-xl text-gray-300 mb-8">
              Access our security documentation, policies, and resources to learn more about 
              how we protect your data and maintain security standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/security/whitepaper"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Security Whitepaper
              </Link>
              <Link 
                href="/security/privacy-policy"
                className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link 
                href="/security/terms"
                className="border border-gray-600 hover:border-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Security Issue?</h3>
              <p className="text-gray-300 mb-6">
                If you&apos;ve discovered a security vulnerability or have concerns about our security practices, 
                please contact our security team immediately.
              </p>
              <Link 
                href="mailto:security@codemurf.com"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                Report Security Issue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

