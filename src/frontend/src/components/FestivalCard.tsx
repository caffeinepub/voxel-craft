import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface Festival {
  name: string;
  gregorianDate: string;
  hijriDate: string;
  description?: string;
}

interface FestivalCardProps {
  festival: Festival;
}

export default function FestivalCard({ festival }: FestivalCardProps) {
  return (
    <Card className="border-islamic-emerald/20 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-islamic-gold/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-islamic-gold" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg text-islamic-gold mb-1">{festival.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gregorian:</span>
            <span className="font-semibold">{festival.gregorianDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hijri:</span>
            <span className="font-semibold">{festival.hijriDate}</span>
          </div>
        </div>
        {festival.description && (
          <p className="text-sm text-muted-foreground pt-2 border-t border-islamic-emerald/10">
            {festival.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
