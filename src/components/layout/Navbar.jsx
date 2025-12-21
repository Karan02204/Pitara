import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Gift, Menu, X, User, LogOut, Package } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const Navbar = () => {
    const { totalItems } = useCart();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/catalog', label: 'Gift Catalog' },
        { path: '/hampers', label: 'Create Hamper' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Gift className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110"/>
                        </div>
                        <span className="font-display text-2xl md:text-3xl font-bold tracking-wide">
                            <span className="text-gradient">Pitara</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={cn("relative font-body text-sm font-medium transition-colors duration-300", isActive(link.path)
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground")}>
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 gradient-gold rounded-full"/>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingBag className="w-5 h-5"/>
                                {totalItems > 0 && (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 gradient-gold rounded-full text-xs text-primary-foreground flex items-center justify-center font-medium">
                                        {totalItems}
                                    </motion.span>
                                )}
                            </Button>
                        </Link>

                        {/* User Auth */}
                        {user ? (
                            <div className="relative">
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="relative"
                                >
                                    <User className="w-5 h-5" />
                                </Button>
                                
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 z-50"
                                        >
                                            <div className="px-4 py-2 border-b border-neutral-100">
                                                <p className="text-sm font-medium text-neutral-900 truncate">{user.name}</p>
                                                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                            </div>
                                            <Link 
                                                to="/profile" 
                                                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                Profile
                                            </Link>
                                            <Link 
                                                to="/orders" 
                                                className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                <Package className="h-4 w-4 mr-2" />
                                                Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="ghost" size="sm" className="font-medium">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm" className="font-medium hidden md:flex">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-border py-4">
                            {navLinks.map((link) => (
                                <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className={cn("block py-3 px-4 font-body text-sm font-medium transition-colors rounded-lg", isActive(link.path)
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                                    {link.label}
                                </Link>
                            ))}
                            {!user && (
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 font-body text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                                    Login
                                </Link>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};
export default Navbar;
