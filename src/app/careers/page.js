'use client';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Users, Zap, Heart, Globe, Code, Briefcase, Star, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Lead the development of next-generation AI-powered development tools. Work with React, Node.js, and cutting-edge AI technologies.",
      requirements: ["5+ years experience", "React/Node.js expertise", "AI/ML knowledge preferred"],
      featured: true
    },
    {
      id: 2,
      title: "Product Manager - AI Tools",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$130k - $200k",
      description: "Drive product strategy for our AI-powered development platform. Shape the future of software development.",
      requirements: ["Product management experience", "Technical background", "AI product experience"],
      featured: true
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      salary: "$110k - $160k",
      description: "Build and maintain scalable infrastructure for our AI development platform. Work with Kubernetes, AWS, and modern DevOps tools.",
      requirements: ["DevOps experience", "Cloud platforms", "Container orchestration"],
      featured: false
    },
    {
      id: 4,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / Los Angeles",
      type: "Full-time",
      salary: "$90k - $140k",
      description: "Design intuitive interfaces for complex AI development tools. Create user experiences that make AI accessible to all developers.",
      requirements: ["UI/UX design experience", "Design systems", "Developer tool experience"],
      featured: false
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      department: "AI Research",
      location: "Remote / Seattle",
      type: "Full-time",
      salary: "$140k - $220k",
      description: "Research and develop next-generation AI models for code generation and software development automation.",
      requirements: ["ML engineering experience", "Python/PyTorch", "Research background"],
      featured: true
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      description: "Help enterprise customers succeed with our AI development platform. Build relationships and drive product adoption.",
      requirements: ["Customer success experience", "Technical aptitude", "B2B software experience"],
      featured: false
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipends."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours. We provide home office setup and co-working space allowances."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Compensation",
      description: "Competitive salaries, equity packages, and performance bonuses. Regular compensation reviews."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Learning & Development",
      description: "$2,000 annual learning budget. Conference attendance, courses, and professional development support."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Off",
      description: "Unlimited PTO policy with minimum 3 weeks encouraged. Sabbatical program after 5 years."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Culture",
      description: "Collaborative, innovative environment. Regular team events, off-sites, and company retreats."
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI and software development.",
      icon: "🚀"
    },
    {
      title: "Developer-Centric",
      description: "Everything we build is designed to make developers' lives better and more productive.",
      icon: "👩‍💻"
    },
    {
      title: "Open Collaboration",
      description: "We believe in transparency, open communication, and shared success.",
      icon: "🤝"
    },
    {
      title: "Quality Excellence",
      description: "We maintain the highest standards in everything we create and deliver.",
      icon: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Build the Future of
              <span className="block">Software Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join a team of world-class engineers, designers, and visionaries creating AI-powered tools 
              that will transform how software is built.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#open-positions"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                View Open Positions <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#culture"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Learn About Our Culture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section id="culture" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We&apos;re building more than just software – we&apos;re creating a culture where innovation thrives 
              and every team member can do their best work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Join Codemurf?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive benefits and perks designed to support your career growth, 
              well-being, and work-life balance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Open Positions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our growing team and help shape the future of AI-powered software development.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gray-900/50 border rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 ${
                  job.featured ? 'border-purple-500/30 bg-purple-900/10' : 'border-gray-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{job.title}</h3>
                      {job.featured && (
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, reqIndex) => (
                        <span
                          key={reqIndex}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-green-400" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:ml-6">
                    <button className="w-full lg:w-auto bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 justify-center">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Don&apos;t See Your Role?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;re always looking for exceptional talent. Send us your resume and tell us how 
              you&apos;d like to contribute to the future of software development.
            </p>
            <Link 
              href="mailto:careers@codemurf.com"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              Contact Our Team <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
