'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import ShoppingCartModal from '../ui/ShoppingCartModal';
import AnimatedLogo from '../ui/AnimatedLogo';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const timeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  
  // Handle auth context gracefully for SSR
  let user = null, isAuthenticated = false, logout = () => {}, loading = false;
  try {
    const auth = useAuth();
    user = auth.user;
    isAuthenticated = auth.isAuthenticated;
    logout = auth.logout;
    loading = auth.loading;
  } catch (error) {
    // During SSR or when AuthProvider is not available, use defaults
  }
  
  // Handle cart context gracefully for SSR
  let cartCount = 0;
  try {
    const cart = useCart();
    cartCount = cart.cartCount;
  } catch (error) {
    // During SSR or when CartProvider is not available, use defaults
  }

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
    }, 300);
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

  // Enhanced authentication check for ALL navbar links
  const handleLinkClick = (e, href, name) => {
    e.preventDefault(); // Prevent default navigation
    
    console.log(`🔍 Navbar Debug: Clicking on ${name}, href: ${href}`);
    console.log(`🔍 Current pathname: ${pathname}`);
    console.log(`🔍 Router available: ${!!router}`);
    console.log(`🔍 User authenticated: ${isAuthenticated}`);
    
    // Public routes that don't require authentication
    const publicRoutes = [
      '/',
      '/auth',
      '/blogs',
      '/about',
      '/about-us',
      '/careers',
      '/security',
      '/partnerships',
      '/contact',
      '/community',
      '/feature-requests',
      '/changelog',
      '/events',
      '/docs',
      '/pricing',
      '/templates',
      '/components'
    ];

    // Check if the route is public (allowed without authentication)
    const isPublicRoute = publicRoutes.some(route => href === route || href.startsWith(route));
    
    // If it's NOT a public route and user is NOT authenticated, redirect to login
    if (!isPublicRoute && !isAuthenticated) {
      console.log(`🔒 Navbar: Redirecting to /auth - route ${href} requires authentication`);
      // Store the intended URL so user can be redirected back after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedUrl', href);
      }
      router.push('/auth');
      return;
    }
    
    // If authenticated or accessing public route, allow navigation
    if (href.startsWith('/')) {
      console.log(`✅ Navigating to: ${href}`);
      router.push(href);
    }
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
              href: "/about"
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
              icon: "📞",
              href: "/contact"
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
              description: "Connect with the CodeMurf community",
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
              description: "Latest updates and changes for CodeMurf",
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
    ...(isAuthenticated ? [{ name: 'Dashboard', hasDropdown: false, href: '/dashboard' }] : []),
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
            <AnimatedLogo />
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
          <AnimatedLogo />
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
                // Regular page link with authentication protection
                <button
                  onClick={(e) => handleLinkClick(e, item.href, item.name)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-2"
                >
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
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
                                <button
                                  key={itemIndex}
                                  onClick={(e) => {
                                    console.log(`🔍 Dropdown Link clicked: ${dropdownItem.name}, href: ${dropdownItem.href}`);
                                    handleLinkClick(e, dropdownItem.href, dropdownItem.name);
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
          {/* Shopping Cart Icon */}
          {isAuthenticated && (
            <button
              onClick={() => setCartModalOpen(true)}
              className="relative text-gray-300 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          )}

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
                    onClick={async () => {
                      try {
                        await logout();
                        setUserMenuOpen(false);
                        router.push('/');
                      } catch (error) {
                        console.error('Logout error:', error);
                        setUserMenuOpen(false);
                        router.push('/');
                      }
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
                href="/auth?mode=signin"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/auth?mode=signup"
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
                            <button
                              key={itemIndex}
                              onClick={(e) => {
                                console.log(`🔍 Mobile Link clicked: ${dropdownItem.name}, href: ${dropdownItem.href}`);
                                handleLinkClick(e, dropdownItem.href, dropdownItem.name);
                                setMobileMenuOpen(false);
                              }}
                              className="block text-gray-300 hover:text-white transition-colors text-sm w-full text-left"
                            >
                              {dropdownItem.icon} {dropdownItem.name}
                            </button>
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
                  <button
                    onClick={(e) => {
                      console.log(`🔍 Mobile Nav Link clicked: ${item.name}, href: ${item.href}`);
                      handleLinkClick(e, item.href, item.name);
                      setMobileMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white transition-colors text-sm font-medium w-full text-left"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Actions */}
            <div className="border-t border-gray-800 pt-4 mt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      handleLinkClick(e, '/dashboard', 'Dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white transition-colors text-sm w-full text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={(e) => {
                      handleLinkClick(e, '/profile', 'Profile');
                      setMobileMenuOpen(false);
                    }}
                    className="block text-gray-300 hover:text-white transition-colors text-sm w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await logout();
                        setMobileMenuOpen(false);
                        router.push('/');
                      } catch (error) {
                        console.error('Logout error:', error);
                        setMobileMenuOpen(false);
                        router.push('/');
                      }
                    }}
                    className="block text-red-400 hover:text-red-300 transition-colors text-sm"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth?mode=signin"
                    className="block text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth?mode=signup"
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

      {/* Shopping Cart Modal */}
      <ShoppingCartModal 
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
