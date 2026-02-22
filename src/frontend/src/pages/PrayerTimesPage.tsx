import { useState } from 'react';
import { usePrayerTimes } from '@/hooks/useQueries';
import LocationSelector from '@/components/LocationSelector';
import PrayerTimeDisplay from '@/components/PrayerTimeDisplay';
import { Loader2 } from 'lucide-react';

export default function PrayerTimesPage() {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const { data, isLoading, error } = usePrayerTimes(location?.city || '', location?.country || '');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-islamic-gold">Prayer Times</h1>
        <p className="text-muted-foreground">Daily prayer times for your location</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <LocationSelector onLocationSelect={setLocation} />

        {isLoading && location && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-islamic-emerald" />
          </div>
        )}

        {error && location && (
          <div className="text-center py-20 text-destructive">
            <p>Error loading prayer times. Please check your location and try again.</p>
          </div>
        )}

        {data && location && <PrayerTimeDisplay data={data} location={location} />}

        {!location && (
          <div className="text-center py-20 text-muted-foreground">
            <p>Please select your location to view prayer times</p>
          </div>
        )}
      </div>
    </div>
  );
}
