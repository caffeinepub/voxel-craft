import { useState, useEffect } from 'react';
import { useIslamicCalendar } from '@/hooks/useQueries';
import FestivalCard from '@/components/FestivalCard';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CalendarPage() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const { data, isLoading, error } = useIslamicCalendar(selectedYear);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-islamic-gold">Islamic Calendar</h1>
        <p className="text-muted-foreground">Important dates and festivals in the Islamic year</p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
          <SelectTrigger className="w-full border-islamic-emerald/30">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-islamic-emerald" />
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-destructive">
          <p>Error loading calendar. Please try again.</p>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {data.map((festival, index) => (
            <FestivalCard key={index} festival={festival} />
          ))}
        </div>
      )}
    </div>
  );
}
