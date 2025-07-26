'use client';
import { motion } from 'framer-motion';
import { Handshake, Users, Star, TrendingUp, Globe, Zap, Award, Heart, CheckCircle, ArrowRight, Mail, Phone, Calendar, DollarSign, Target, Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PartnershipsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const partnershipTypes = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Technology Partners",
      description: "Integrate your tools and services with our AI-powered development platform.",
      benefits: ["API access", "Co-marketing opportunities", "Technical support", "Joint solutions"],
      ideal: "SaaS platforms, developer tools, cloud providers"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Channel Partners",
      description: "Expand your portfolio by reselling AutoGen solutions to your customers.",
      benefits: ["Revenue sharing", "Sales enablement", "Marketing support", "Dedicated partner manager"],
      ideal: "System integrators, consultancies, agencies"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Startup Partners",
      description: "Join our startup program and get access to exclusive resources and support.",
      benefits: ["Free credits", "Mentorship", "Networking events", "Investment connections"],
      ideal: "Early-stage startups, incubators, accelerators"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Enterprise Partners",
      description: "Strategic partnerships for enterprise-scale implementations and solutions.",
      benefits: ["Custom integrations", "Priority support", "Joint go-to-market", "Revenue sharing"],
      ideal: "Fortune 500 companies, enterprise software vendors"
    }
  ];

  const partnerBenefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Revenue Growth",
      description: "Generate new revenue streams through commissions, referrals, and joint solutions."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Market Recognition",
      description: "Gain visibility in the AI and developer tools market with co-marketing opportunities."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Technical Excellence",
      description: "Access cutting-edge AI technology and integrate it into your offerings."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Success",
      description: "Help your customers build better software faster with AI-powered tools."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Access",
      description: "Join a network of innovative partners and thought leaders in the industry."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Support",
      description: "Get dedicated partner management and strategic business development support."
    }
  ];

  const partnerTestimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Partnerships",
      company: "DevTools Inc.",
      image: "/testimonials/sarah-chen.jpg",
      quote: "Partnering with AutoGen has transformed our development workflow. The AI capabilities have reduced our development time by 40% and improved code quality significantly.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "TechStart Solutions",
      image: "/testimonials/michael-rodriguez.jpg",
      quote: "The startup partner program gave us the resources and support we needed to scale quickly. The credits and mentorship were invaluable for our growth.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Partner Manager",
      company: "Enterprise Systems",
      image: "/testimonials/emily-johnson.jpg",
      quote: "AutoGen's enterprise partnership program has opened new market opportunities for us. The joint go-to-market strategy has been incredibly effective.",
      rating: 5
    }
  ];

  const applicationProcess = [
    {
      step: 1,
      title: "Submit Application",
      description: "Fill out our partnership application form with details about your business and partnership goals."
    },
    {
      step: 2,
      title: "Initial Review",
      description: "Our partnership team reviews your application and assesses potential synergies."
    },
    {
      step: 3,
      title: "Discovery Call",
      description: "Schedule a call with our partnership team to discuss opportunities and alignment."
    },
    {
      step: 4,
      title: "Partnership Agreement",
      description: "Finalize partnership terms and sign the agreement to start collaborating."
    },
    {
      step: 5,
      title: "Onboarding",
      description: "Complete partner onboarding with training, resources, and go-to-market planning."
    }
  ];

  const currentPartners = [
    { name: "Microsoft", logo: "/partners/microsoft.svg", type: "Technology" },
    { name: "AWS", logo: "/partners/aws.svg", type: "Cloud" },
    { name: "GitHub", logo: "/partners/github.svg", type: "Technology" },
    { name: "Docker", logo: "/partners/docker.svg", type: "Technology" },
    { name: "Stripe", logo: "/partners/stripe.svg", type: "Technology" },
    { name: "Vercel", logo: "/partners/vercel.svg", type: "Technology" },
    { name: "Notion", logo: "/partners/notion.svg", type: "Technology" },
    { name: "Slack", logo: "/partners/slack.svg", type: "Technology" }
  ];

  const partnershipStats = [
    { label: "Active Partners", value: "500+", description: "Growing partner ecosystem" },
    { label: "Revenue Generated", value: "$50M+", description: "Partner-driven revenue" },
    { label: "Customer Reach", value: "1M+", description: "Customers through partners" },
    { label: "Partner Satisfaction", value: "98%", description: "Partner retention rate" }
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-orange-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-full px-6 py-2 mb-8">
              <Handshake className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Partner Ecosystem</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-purple-400 bg-clip-text text-transparent">
              Build Together,
              <span className="block">Grow Together</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Join our partner ecosystem and help shape the future of AI-powered software development. 
              Create value for your customers while growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="#partnership-types"
                className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Explore Partnerships <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#apply"
                className="border border-gray-600 hover:border-orange-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-orange-600/10"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partnership Opportunities</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you&apos;re a technology provider, reseller, startup, or enterprise, 
              we have partnership programs designed to help you succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="text-orange-400 mb-4">{type.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                <p className="text-gray-300 mb-6">{type.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Benefits</h4>
                  <div className="space-y-2">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Ideal For</h4>
                  <p className="text-sm text-gray-400">{type.ideal}</p>
                </div>
                
                <button className="w-full bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Partner With Us?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join a growing ecosystem of partners who are transforming software development 
              and creating value for customers worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join a network of innovative companies who are already partnering with us 
              to deliver exceptional value to their customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {currentPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center p-4 bg-gray-900/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-300">{partner.name.charAt(0)}</span>
                </div>
                <div className="text-sm font-medium text-center">{partner.name}</div>
                <div className="text-xs text-gray-400">{partner.type}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Testimonials */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from partners who have successfully grown their business and 
              delivered value to customers through our partnership programs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {partnerTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How to Become a Partner</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our streamlined application process makes it easy to get started. 
              From application to onboarding, we&apos;ll support you every step of the way.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {applicationProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Partner?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join our partner ecosystem today and start building the future of software development together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/partnerships/apply"
                className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                Apply for Partnership <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:partnerships@autogenlabs.com"
                className="border border-gray-600 hover:border-orange-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-orange-600/10 inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Partnership Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
