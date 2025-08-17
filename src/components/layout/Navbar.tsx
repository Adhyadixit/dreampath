
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-border">
      <div className="container-wide flex items-center justify-between py-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-dreampath-primary">
            DreamPath<span className="text-dreampath-secondary">Solutions</span>
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md lg:hidden"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-dreampath-primary" />
          ) : (
            <Menu className="h-6 w-6 text-dreampath-primary" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            Services
          </Link>
          <Link
            to="/portfolio"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            Portfolio
          </Link>
          <Link
            to="/blogs"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/contact"
            className="text-foreground hover:text-dreampath-secondary transition-colors"
          >
            Contact
          </Link>
          <Link to="/signup">
            <Button className="bg-dreampath-primary hover:bg-dreampath-dark">
              Sign Up
            </Button>
          </Link>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden absolute w-full bg-white border-b border-border">
          <nav className="container-wide flex flex-col py-4">
            <Link
              to="/"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              Portfolio
            </Link>
            <Link
              to="/blogs"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="px-4 py-3 text-foreground hover:bg-muted rounded-md"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Link
              to="/signup"
              className="mt-3 px-4 py-3 bg-dreampath-primary text-white text-center rounded-md"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
