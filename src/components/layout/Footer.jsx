import { Gift, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (<footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary-foreground"/>
              </div>
              <span className="font-display text-primary text-xl font-semibold">
                Pitara
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curating exceptional gifts for life's most precious moments. 
              Every gift tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Catalog', 'Create Hamper', 'About Us'].map((item) => (<li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Food & Treats', 'Home & Living', 'Beauty', 'Fashion'].map((item) => (<li key={item}>
                  <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary"/>
                hello@Pitara.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary"/>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary"/>
                New York, NY
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Pitara. All rights reserved. Crafted with love.
          </p>
        </div>
      </div>
    </footer>);
};
export default Footer;
