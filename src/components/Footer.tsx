import { Plane, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const links = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Contact", href: "#contact" }
    ],
    products: [
      { name: "Military Mode", href: "#military" },
      { name: "Civil Aviation", href: "#civil" },
      { name: "Beta Kit", href: "#beta-kit" },
      { name: "Pricing", href: "#pricing" }
    ],
    resources: [
      { name: "Documentation", href: "#docs" },
      { name: "Support", href: "#support" },
      { name: "FAQ", href: "#faq" },
      { name: "Blog", href: "#blog" }
    ]
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-sky p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FlyAuqab</span>
              <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded-full font-medium">
                Beta
              </span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Powered by vision. Built for the skies. Revolutionizing pilot training 
              with affordable, scalable VR technology for the next generation of aviators.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:hello@flyauqab.com" className="text-primary-foreground hover:text-primary transition-colors">
                  hello@flyauqab.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+1-555-0123" className="text-primary-foreground hover:text-primary transition-colors">
                  +1 (555) 012-3456
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-primary-foreground">San Francisco, CA & Remote</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 FlyAuqab. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;