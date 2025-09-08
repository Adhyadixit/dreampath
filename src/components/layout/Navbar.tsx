
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "#reviews" },
  { name: "Contact", path: "/contact" }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detect CityService routes to keep burger icon dark from the start on these pages
  const isCityServicePage = useMemo(() => {
    const p = location.pathname.toLowerCase();
    const services = '(mobile-app-development|website-development|web-app-development|seo-services|local-seo|google-ads|meta-ads|review-management)';
    const serviceFirst = new RegExp(`^/(?:${services})/[a-z-]+/?$`);
    const cityFirst = new RegExp(`^/[a-z-]+-(?:${services})(?:/)?$`);
    return serviceFirst.test(p) || cityFirst.test(p);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    
    if (path.startsWith('#')) {
      // If we're not on the home page, navigate to home with hash
      if (location.pathname !== '/') {
        window.location.href = `/${path}`;
      } else {
        // If we're already on home, just scroll to the section
        const element = document.querySelector(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Handle regular page navigation
      window.location.href = path;
    }
  };
  
  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll for navbar background and text color
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection ? heroSection.offsetHeight : 0;
      const scrollPosition = window.scrollY;
      
      // Change text color based on scroll position relative to hero section
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-4 right-4 z-50 rounded-xl transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-lg border border-white/20 shadow-lg text-foreground'
          : 'bg-transparent backdrop-blur-md border border-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-lime-400" />
            <Link to="/" className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
                DreamPath
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavigation(item.path, e)}
                className={`${
                  location.pathname === item.path.split('#')[0] ||
                  (item.path === '#reviews' && location.hash === '#reviews')
                    ? isScrolled
                      ? 'text-dreampath-secondary font-medium'
                      : 'text-white font-medium'
                    : isScrolled
                      ? 'text-foreground hover:text-dreampath-secondary/80'
                      : 'text-white/90 hover:text-white'
                } transition-colors cursor-pointer`}
              >
                {item.name}
              </a>
            ))}
            <Button
              asChild
              className="ml-4 bg-dreampath-secondary hover:bg-dreampath-accent"
            >
              <Link to="/contact">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden z-50">
            <button
              className="focus:outline-none p-2 rounded-md transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${(isCityServicePage || isScrolled) ? 'text-foreground' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${(isCityServicePage || isScrolled) ? 'text-foreground' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-1 bg-white/95 backdrop-blur-md shadow-xl rounded-xl overflow-hidden z-40">
            <div className="flex flex-col space-y-1 p-2">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`block px-6 py-4 text-base font-medium border-b border-gray-100 ${
                    location.pathname === item.path.split('#')[0]
                      ? 'bg-brand-50 text-dreampath-secondary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-dreampath-secondary'
                  } transition-colors duration-200 cursor-pointer`}
                  onClick={(e) => handleNavigation(item.path, e)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                asChild
                className="mt-2 bg-dreampath-secondary hover:bg-dreampath-accent"
                onClick={closeMenu}
              >
                <Link to="/contact" className="w-full justify-center">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
