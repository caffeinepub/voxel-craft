import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface PrayerTimeDisplayProps {
  data: any;
  location: { city: string; country: string };
}

const prayerNames = [
  { key: 'Fajr', label: 'Fajr', description: 'Dawn Prayer' },
  { key: 'Dhuhr', label: 'Dhuhr', description: 'Noon Prayer' },
  { key: 'Asr', label: 'Asr', description: 'Afternoon Prayer' },
  { key: 'Maghrib', label: 'Maghrib', description: 'Sunset Prayer' },
  { key: 'Isha', label: 'Isha', description: 'Night Prayer' },
];

export default function PrayerTimeDisplay({ data, location }: PrayerTimeDisplayProps) {
  if (!data || !data.data || !data.data.timings) {
    return null;
  }

  const timings = data.data.timings;
  const date = data.data.date;

  const getCurrentPrayer = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < prayerNames.length; i++) {
      const prayerTime = timings[prayerNames[i].key];
      if (prayerTime) {
        const [hours, minutes] = prayerTime.split(':').map(Number);
        const prayerMinutes = hours * 60 + minutes;
        
        if (currentTime < prayerMinutes) {
          return prayerNames[i].key;
        }
      }
    }
    return prayerNames[0].key;
  };

  const currentPrayer = getCurrentPrayer();

  return (
    <div className="space-y-6">
      <Card className="border-islamic-emerald/20 bg-card/50 backdrop-blur">
        <CardHeader className="border-b border-islamic-emerald/20">
          <CardTitle className="text-xl text-islamic-gold">
            Prayer Times for {location.city}, {location.country}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {date.readable} • {date.hijri.month.en} {date.hijri.day}, {date.hijri.year}
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {prayerNames.map((prayer) => {
              const time = timings[prayer.key];
              const isCurrent = prayer.key === currentPrayer;
              
              return (
                <div
                  key={prayer.key}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                    isCurrent
                      ? 'bg-islamic-emerald/20 border-2 border-islamic-emerald'
                      : 'bg-muted/30 border border-islamic-emerald/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCurrent ? 'bg-islamic-emerald text-white' : 'bg-islamic-gold/20 text-islamic-gold'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-semibold ${isCurrent ? 'text-islamic-emerald' : 'text-foreground'}`}>
                        {prayer.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{prayer.description}</div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${isCurrent ? 'text-islamic-emerald' : 'text-foreground'}`}>
                    {time}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
