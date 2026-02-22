import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  onLocationSelect: (location: { city: string; country: string }) => void;
}

export default function LocationSelector({ onLocationSelect }: LocationSelectorProps) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      onLocationSelect({ city: city.trim(), country: country.trim() });
    }
  };

  return (
    <Card className="border-islamic-emerald/20 bg-card/50 backdrop-blur mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-islamic-gold">
          <MapPin className="w-5 h-5" />
          Select Your Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., Dubai"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border-islamic-emerald/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g., UAE"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border-islamic-emerald/30"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-islamic-emerald hover:bg-islamic-emerald/90"
            disabled={!city.trim() || !country.trim()}
          >
            Get Prayer Times
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
