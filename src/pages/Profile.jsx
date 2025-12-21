import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        street: user.addresses?.[0]?.street || '',
        city: user.addresses?.[0]?.city || '',
        state: user.addresses?.[0]?.state || '',
        zipCode: user.addresses?.[0]?.zipCode || '',
        country: user.addresses?.[0]?.country || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const address = {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      };

      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        addresses: [address]
      });

      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12 px-4 mt-20">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>Please log in to view your profile</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-display font-bold mb-8">My Profile</h1>
          
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details and address</CardDescription>
            </CardHeader>
            <CardContent>
              {message && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{message}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Default Address</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({...formData, street: e.target.value})}
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="New York"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          placeholder="NY"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip/Postal Code</Label>
                        <Input
                          id="zipCode"
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                          placeholder="10001"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                          placeholder="United States"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
