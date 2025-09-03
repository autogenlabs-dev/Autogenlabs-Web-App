'use client';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Globe, Lightbulb, Award, TrendingUp, Code, Zap, Shield, Star, ArrowRight, Building, MapPin, Calendar, Quote } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  console.log('🔍 About Page: Component loaded');
  
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

  const stats = [
    {
      number: "10,000+",
      label: "Developers Served",
      description: "Developers worldwide using our platform daily"
    },
    {
      number: "500M+",
      label: "Lines of Code Generated",
      description: "AI-powered code generation and optimization"
    },
    {
      number: "99.9%",
      label: "Uptime SLA",
      description: "Reliable, enterprise-grade infrastructure"
    },
    {
      number: "50+",
      label: "Countries",
      description: "Global reach across continents"
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former Microsoft principal engineer with 15+ years in AI and developer tools. PhD in Computer Science from Stanford.",
      image: "/team/alex-chen.jpg",
      linkedin: "https://linkedin.com/in/alexchen",
      expertise: ["AI/ML", "Product Strategy", "Enterprise Software"]
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google staff engineer who led AI initiatives. MIT graduate with expertise in large-scale distributed systems.",
      image: "/team/sarah-rodriguez.jpg",
      linkedin: "https://linkedin.com/in/sarahrodriguez",
      expertise: ["System Architecture", "AI Research", "Engineering Leadership"]
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Previously at Amazon AWS, led teams building developer infrastructure used by millions of developers globally.",
      image: "/team/david-kim.jpg",
      linkedin: "https://linkedin.com/in/davidkim",
      expertise: ["Cloud Infrastructure", "DevOps", "Team Building"]
    },
    {
      name: "Emily Watson",
      role: "VP of Product",
      bio: "Former product leader at GitHub and Atlassian, passionate about developer experience and productivity tools.",
      image: "/team/emily-watson.jpg",
      linkedin: "https://linkedin.com/in/emilywatson",
      expertise: ["Product Management", "UX Design", "Developer Relations"]
    },
    {
      name: "Michael Brown",
      role: "Head of AI Research",
      bio: "PhD in Machine Learning from CMU, published 50+ papers in top AI conferences. Expert in code generation models.",
      image: "/team/michael-brown.jpg",
      linkedin: "https://linkedin.com/in/michaelbrown",
      expertise: ["Machine Learning", "NLP", "Research"]
    },
    {
      name: "Lisa Chang",
      role: "VP of Marketing",
      bio: "Built and scaled developer communities at HashiCorp and Docker. Expert in developer-focused go-to-market strategies.",
      image: "/team/lisa-chang.jpg",
      linkedin: "https://linkedin.com/in/lisachang",
      expertise: ["Developer Marketing", "Community Building", "Growth"]
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Codemurf was founded with a vision to democratize AI-powered software development.",
      icon: <Building className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "Seed Funding",
      description: "Raised $5M seed round led by Andreessen Horowitz to build our core AI platform.",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "First 1,000 Users",
      description: "Reached our first major milestone of 1,000 active developers using our platform.",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "Series A",
      description: "Secured $20M Series A funding to accelerate product development and team growth.",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Enterprise Launch",
      description: "Launched enterprise-grade features and security, onboarding Fortune 500 companies.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanded to serve 10,000+ developers across 50+ countries worldwide.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer-First",
      description: "Every decision we make prioritizes the developer experience. We build tools that developers actually want to use, making their daily work more productive and enjoyable."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Research",
      description: "We push the boundaries of what's possible with AI and software development. Our research team continuously explores new frontiers in code generation and developer productivity."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Transparency & Trust",
      description: "We believe in open communication, ethical AI practices, and building long-term relationships based on trust with our developer community."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Our mission is to democratize software development worldwide, making advanced AI tools accessible to developers regardless of their location or background."
    }
  ];

  const testimonials = [
    {
      quote: "Codemurf has transformed how our team approaches software development. The AI-powered code generation has increased our productivity by 40%.",
      author: "Jennifer Liu",
      role: "Senior Software Engineer",
      company: "TechCorp Inc."
    },
    {
      quote: "The quality of generated code is exceptional. It's like having a senior developer pair programming with you 24/7.",
      author: "Marcus Johnson",
      role: "Lead Developer",
      company: "StartupXYZ"
    },
    {
      quote: "What impressed me most is how Codemurf understands context and generates code that actually follows our team's coding standards.",
      author: "Priya Patel",
      role: "Engineering Manager",
      company: "Enterprise Solutions Ltd."
    }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-400 bg-clip-text text-transparent"
            >
              About Codemurf
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We&apos;re on a mission to democratize software development through AI, making advanced coding tools 
              accessible to developers worldwide and transforming how software is built.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-full border border-purple-500/20">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                To democratize software development by making AI-powered coding tools accessible to every 
                developer, regardless of their experience level or background. We believe that powerful 
                development tools should not be exclusive to tech giants.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our platform empowers developers to build better software faster, automate repetitive tasks, 
                and focus on creative problem-solving rather than boilerplate code.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <Lightbulb className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-4xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                A world where every developer has access to AI-powered tools that amplify their creativity 
                and productivity. We envision a future where software development is more accessible, 
                efficient, and enjoyable for everyone.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                By 2030, we aim to be the leading platform that enables millions of developers worldwide 
                to build innovative software solutions with the power of AI assistance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by developers worldwide, we&apos;re proud of the impact we&apos;ve made in the software development community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do, from product development to customer relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the experienced leaders driving innovation and building the future of AI-powered software development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-purple-400 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={member.linkedin}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                  >
                    LinkedIn Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From a small startup to serving thousands of developers worldwide, here&apos;s how we&apos;ve grown.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-500/30"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-lg mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white relative z-10">
                    {milestone.icon}
                  </div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Developers Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from the developers who are building amazing software with Codemurf.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <Quote className="w-8 h-8 text-purple-400 mb-4" />
                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-purple-400">{testimonial.company}</div>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of the future of software development. Whether you&apos;re a developer looking to boost your productivity 
              or a talented individual wanting to join our team, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/careers"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Join Our Team <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/contact"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

