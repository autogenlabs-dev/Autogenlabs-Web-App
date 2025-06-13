'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Logo from "../../../public/logoAuto.webp"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(itemName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
  };

  // Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle section navigation
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const dropdownContent = {
    Company: {
      sections: [
        {
          title: "",
          items: [
            {
              name: "About Us",
              description: "Learn about our investors and what makes us us",
              icon: "🎯",
              sectionId: "aboutus",
              isSection: true  // Added this
            },
            {
              name: "Careers",
              description: "Come build the future of software development",
              icon: "💼",
              href: "/careers"
            },
            {
              name: "Security",
              description: "Enterprise-grade security, privacy and compliance",
              icon: "🪪",
              href: "/security"
            }
          ]
        },
        {
          title: "",
          items: [
            {
              name: "Blog",
              description: "Latest stories and insights",
              icon: "📝",
              href: "/blogs"
            },
            {
              name: "Partnerships",
              description: "Join our partner ecosystem",
              icon: "🤝",
              href: "/partnerships"
            },
            {
              name: "Contact",
              description: "For the best way to get in touch with us",
              icon: "🤝",
              sectionId: "contact",
              isSection: true
            }
          ]
        }
      ]
    },

    Resources: {
      sections: [
        {
          title: "",
          items: [
            {
              name: "Docs",
              description: "Documentation for AutoGen",
              icon: "📝",
              href: "/docs"
            },
            {
              name: "Community",
              description: "Connect with the AutoGen community",
              icon: "🤝",
              href: "/community"
            },
            {
              name: "Feature Requests",
              description: "Submit and vote on features you desire",
              icon: "🙏",
              href: "/feature-requests"
            }
          ]
        },
        {
          title: "",
          items: [
            {
              name: "Changelog",
              description: "Latest updates and changes for AutoGen",
              icon: "📊",
              href: "/changelog"
            },
            {
              name: "FAQ",
              description: "Find answers to common questions",
              icon: "❓",
              sectionId: "faq",
              isSection: true
            },
            {
              name: "Events",
              description: "Details on upcoming events and sessions",
              icon: "🌃",
              href: "/events"
            }
          ]
        }
      ]
    },
  };

  const navItems = [
    { name: 'Resources', hasDropdown: true },
    { name: 'Company', hasDropdown: true },
    { name: 'Pricing', hasDropdown: false, sectionId: 'pricing' },
    { name: 'Templates', hasDropdown: false, href: '/templates' },
    { name: 'Components', hasDropdown: false, href: '#' }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname === '/') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Small delay to ensure page is loaded
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <nav className={`w-full px-6 md:px-44 py-4 fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[rgb(19_17_28_/_90%)] backdrop-blur-[5px]' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"} className="flex items-center ">
          <Image src={Logo} width={30} height={30} alt='Company Logo' loading='lazy' />
          <span className="text-xl font-medium text-white">utoGen Labs</span>
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-8 relative">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.hasDropdown ? (
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-2">
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${hoveredItem === item.name ? 'rotate-180' : ''
                      }`}
                  />
                </button>
              ) : item.sectionId ? (
                // Section scroll button
                <button
                  onClick={(e) => handleSectionClick(e, item.sectionId)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-2"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ) : (
                // Regular page link
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-2"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.hasDropdown && hoveredItem === item.name && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2">
                  <div className="bg-[#0A0A0B] border border-gray-800 rounded-xl shadow-2xl p-6 min-w-[480px] max-w-[600px]">
                    <div className="grid grid-cols-2 gap-8">
                      {dropdownContent[item.name]?.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            {section.title}
                          </h3>
                          <div className="space-y-1">
                            {section.items.map((dropdownItem, itemIndex) => (
                              dropdownItem.isSection ? (
                                <button
                                  key={itemIndex}
                                  onClick={(e) => {
                                    handleSectionClick(e, dropdownItem.sectionId);
                                    setHoveredItem(null); // Close dropdown
                                  }}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group w-full text-left"
                                >
                                  <span className="text-lg flex-shrink-0 mt-0.5">{dropdownItem.icon}</span>
                                  <div>
                                    <div className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-gray-400 text-xs mt-0.5">
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                </button>
                              ) : (
                                <Link
                                  key={itemIndex}
                                  href={dropdownItem.href}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                                  onClick={() => setHoveredItem(null)} // Close dropdown
                                >
                                  <span className="text-lg flex-shrink-0 mt-0.5">{dropdownItem.icon}</span>
                                  <div>
                                    <div className="text-white text-sm font-medium group-hover:text-purple-400 transition-colors">
                                      {dropdownItem.name}
                                    </div>
                                    <div className="text-gray-400 text-xs mt-0.5">
                                      {dropdownItem.description}
                                    </div>
                                  </div>
                                </Link>
                              )
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Link
            href="/auth"
            className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
          >
            Sign in
          </Link>
          <Link
            href="/auth"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;