'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Logo from "../../../public/logoAuto.webp"
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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
              description: "Complete guide and documentation",
              icon: "📚",
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
    { name: 'Pricing', hasDropdown: false, href: '/pricing' },
    { name: 'Templates', hasDropdown: false, href: '/templates' },
    { name: 'Components', hasDropdown: false, href: '/components' }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="w-full px-6 md:px-44 py-4 fixed top-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src={Logo} width={30} height={30} alt='Company Logo' loading='lazy' />
            <span className="text-xl font-medium text-white">utoGen Labs</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/pricing" className="text-gray-300 text-sm font-medium">Pricing</Link>
            <Link href="/templates" className="text-gray-300 text-sm font-medium">Templates</Link>
            <Link href="/components" className="text-gray-300 text-sm font-medium">Components</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          ) : isAuthenticated ? (
            /* User Menu */
            <div className="relative user-menu">              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.firstName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium hidden md:block">{user?.firstName || user?.name || user?.email}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {userMenuOpen && (                <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white text-sm font-medium">{user?.firstName || user?.name || 'User'}</p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors text-sm"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Guest Menu */
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B] border-t border-gray-800">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div className="space-y-2">
                    <div className="text-white font-medium text-sm">{item.name}</div>
                    {dropdownContent[item.name]?.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="ml-4 space-y-2">
                        {section.items.map((dropdownItem, itemIndex) => (
                          dropdownItem.isSection ? (
                            <button
                              key={itemIndex}
                              onClick={(e) => {
                                handleSectionClick(e, dropdownItem.sectionId);
                                setMobileMenuOpen(false);
                              }}
                              className="block text-gray-300 hover:text-white transition-colors text-sm"
                            >
                              {dropdownItem.icon} {dropdownItem.name}
                            </button>
                          ) : (
                            <Link
                              key={itemIndex}
                              href={dropdownItem.href}
                              className="block text-gray-300 hover:text-white transition-colors text-sm"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropdownItem.icon} {dropdownItem.name}
                            </Link>
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                ) : item.sectionId ? (
                  <button
                    onClick={(e) => {
                      handleSectionClick(e, item.sectionId);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Actions */}
            <div className="border-t border-gray-800 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block text-red-400 hover:text-red-300 transition-colors text-sm"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth"
                    className="block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;