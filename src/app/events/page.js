'use client';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Globe, Video, ExternalLink, ArrowRight, Ticket, Star, Trophy, Zap, Code, Mic, Coffee, Award } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const eventStats = [
    {
      number: "50+",
      label: "Events This Year",
      description: "Workshops, meetups, conferences",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      number: "25,000+",
      label: "Total Attendees",
      description: "Developers worldwide",
      icon: <Users className="w-6 h-6" />
    },
    {
      number: "100+",
      label: "Expert Speakers",
      description: "Industry leaders and innovators",
      icon: <Mic className="w-6 h-6" />
    },
    {
      number: "40+",
      label: "Countries",
      description: "Global community reach",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const eventCategories = [
    { value: 'all', label: 'All Events', count: '25' },
    { value: 'conference', label: 'Conferences', count: '8' },
    { value: 'workshop', label: 'Workshops', count: '12' },
    { value: 'meetup', label: 'Meetups', count: '15' },
    { value: 'webinar', label: 'Webinars', count: '20' },
    { value: 'hackathon', label: 'Hackathons', count: '6' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Codemurf Developer Conference 2025",
      description: "Our biggest event of the year featuring keynotes, workshops, and networking opportunities with the Codemurf community.",
      category: "conference",
      date: "March 15-17, 2025",
      time: "9:00 AM - 6:00 PM EST",
      location: "Virtual & San Francisco, CA",
      type: "Hybrid",
      attendees: "5,000+ expected",
      price: "Free",
      status: "Early Bird",
      image: "/events/dev-conference-2025.jpg",
      highlights: [
        "Keynote by Codemurf founders",
        "50+ technical sessions",
        "Hands-on workshops",
        "Community showcase",
        "Networking opportunities"
      ],
      speakers: [
        { name: "Alex Chen", role: "CEO, Codemurf", company: "Codemurf" },
        { name: "Sarah Rodriguez", role: "CTO, Codemurf", company: "Codemurf" },
        { name: "John Smith", role: "VP Engineering", company: "Microsoft" }
      ]
    },
    {
      id: 2,
      title: "AI Code Generation Masterclass",
      description: "Deep dive into advanced AI code generation techniques with hands-on labs and real-world examples.",
      category: "workshop",
      date: "February 28, 2025",
      time: "2:00 PM - 5:00 PM EST",
      location: "Online",
      type: "Virtual",
      attendees: "500 spots",
      price: "Free",
      status: "Registration Open",
      image: "/events/ai-masterclass.jpg",
      highlights: [
        "Advanced prompt engineering",
        "Custom model training",
        "Performance optimization",
        "Best practices",
        "Q&A with experts"
      ],
      speakers: [
        { name: "Dr. Emily Watson", role: "AI Research Lead", company: "Codemurf" },
        { name: "Mike Chen", role: "Senior AI Engineer", company: "Codemurf" }
      ]
    },
    {
      id: 3,
      title: "Community Showcase & Networking",
      description: "Monthly event where community members present their projects and connect with fellow developers.",
      category: "meetup",
      date: "February 14, 2025",
      time: "7:00 PM - 9:00 PM EST",
      location: "Online",
      type: "Virtual",
      attendees: "1,000+ participants",
      price: "Free",
      status: "Open",
      image: "/events/community-showcase.jpg",
      highlights: [
        "Community project demos",
        "Networking breakout rooms",
        "Lightning talks",
        "Prize giveaways",
        "Open discussions"
      ],
      speakers: [
        { name: "Community Members", role: "Various", company: "Codemurf Community" }
      ]
    },
    {
      id: 4,
      title: "Building Production AI Apps",
      description: "Learn how to build, deploy, and scale AI-powered applications in production environments.",
      category: "webinar",
      date: "February 10, 2025",
      time: "1:00 PM - 2:30 PM EST",
      location: "Online",
      type: "Virtual",
      attendees: "Unlimited",
      price: "Free",
      status: "Registration Open",
      image: "/events/production-ai-apps.jpg",
      highlights: [
        "Production deployment strategies",
        "Scaling considerations",
        "Monitoring and debugging",
        "Security best practices",
        "Live Q&A session"
      ],
      speakers: [
        { name: "David Kim", role: "VP Engineering", company: "Codemurf" },
        { name: "Lisa Chang", role: "DevOps Lead", company: "Codemurf" }
      ]
    },
    {
      id: 5,
      title: "Codemurf Global Hackathon",
      description: "48-hour global hackathon building innovative AI-powered applications using Codemurf tools.",
      category: "hackathon",
      date: "April 5-7, 2025",
      time: "All Day",
      location: "Global (Virtual)",
      type: "Virtual",
      attendees: "2,000+ hackers",
      price: "Free",
      status: "Registration Opens Soon",
      image: "/events/global-hackathon.jpg",
      highlights: [
        "$50,000 in prizes",
        "Mentorship from experts",
        "Real-time support",
        "Demo day presentations",
        "Job opportunities"
      ],
      speakers: [
        { name: "Codemurf Team", role: "Mentors & Judges", company: "Codemurf" }
      ]
    },
    {
      id: 6,
      title: "Mobile AI Development Workshop",
      description: "Hands-on workshop for building AI-powered mobile applications using Codemurf mobile toolkit.",
      category: "workshop",
      date: "March 8, 2025",
      time: "10:00 AM - 4:00 PM EST",
      location: "New York, NY",
      type: "In-Person",
      attendees: "100 seats",
      price: "$99",
      status: "Early Bird",
      image: "/events/mobile-workshop.jpg",
      highlights: [
        "React Native development",
        "Flutter integration",
        "Mobile-specific AI features",
        "App store optimization",
        "Lunch and networking"
      ],
      speakers: [
        { name: "Michael Brown", role: "Mobile Lead", company: "Codemurf" },
        { name: "Jennifer Liu", role: "React Native Expert", company: "Facebook" }
      ]
    }
  ];

  const pastEvents = [
    {
      title: "Codemurf Developer Summit 2024",
      date: "November 2024",
      attendees: "3,500+",
      highlights: "Product roadmap reveal, community awards"
    },
    {
      title: "AI Code Quality Workshop",
      date: "October 2024",
      attendees: "800+",
      highlights: "Code review automation, quality metrics"
    },
    {
      title: "Open Source Contribution Day",
      date: "September 2024",
      attendees: "1,200+",
      highlights: "50+ contributions, documentation updates"
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Virtual':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In-Person':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Hybrid':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Early Bird':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Registration Open':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Registration Opens Soon':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Sold Out':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredEvents = upcomingEvents.filter(event => {
    if (selectedCategory === 'all') return true;
    return event.category === selectedCategory;
  });

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
              Events & Meetups
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Join our global community at conferences, workshops, and meetups. Learn from experts, 
              network with peers, and stay ahead of AI development trends.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="#upcoming-events"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                View Events
              </Link>
              <Link 
                href="#subscribe"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Get Notifications
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {eventStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-purple-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Event */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Event</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don&apos;t miss our biggest event of the year - the Codemurf Developer Conference 2025.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor('Early Bird')}`}>
                    Early Bird Registration
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor('Hybrid')}`}>
                    Hybrid Event
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Codemurf Developer Conference 2025</h3>
                <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                  Join 5,000+ developers for the ultimate AI development experience. Three days of keynotes, 
                  workshops, and networking with the Codemurf community.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>March 15-17, 2025</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Virtual & San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span>5,000+ expected attendees</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Ticket className="w-5 h-5 text-purple-400" />
                    <span>Free registration</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/events/dev-conference-2025"
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <Ticket className="w-5 h-5" />
                    Register Now
                  </Link>
                  <Link 
                    href="/events/dev-conference-2025/agenda"
                    className="border border-gray-600 hover:border-purple-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
                  >
                    View Agenda
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4 text-purple-400">Event Highlights</h4>
                  <ul className="space-y-3">
                    {upcomingEvents[0].highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <Star className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-4 text-purple-400">Featured Speakers</h4>
                  <div className="space-y-3">
                    {upcomingEvents[0].speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {speaker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-white">{speaker.name}</div>
                          <div className="text-sm text-gray-400">{speaker.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {eventCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming-events" className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover upcoming events where you can learn, network, and grow with the Codemurf community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-r from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                  <Code className="w-16 h-16 text-purple-400" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-3 hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-400">{event.price}</div>
                    <Link 
                      href={`/events/${event.id}`}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Past Events</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Missed our previous events? Check out recordings and highlights from our recent gatherings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <h3 className="text-lg font-bold mb-3">{event.title}</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{event.highlights}</p>
                <Link 
                  href={`/events/past/${event.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                >
                  View Recording <Video className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Never Miss an Event</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our event notifications and be the first to know about upcoming workshops, 
              conferences, and community gatherings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Get notified about events, early bird discounts, and exclusive community updates.
            </p>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Want to Host an Event?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Interested in organizing a local Codemurf meetup or workshop? We&apos;d love to support you with 
              resources, speakers, and promotional assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/community/host-event"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Become an Organizer
              </Link>
              <Link 
                href="/contact"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

