import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SurahContentProps {
  data: any;
  onNavigate: (surahNumber: number) => void;
}

export default function SurahContent({ data, onNavigate }: SurahContentProps) {
  if (!data || !data.data) {
    return null;
  }

  const surah = data.data;
  const currentNumber = surah.number;

  return (
    <Card className="border-islamic-emerald/20 bg-card/50 backdrop-blur">
      <CardHeader className="border-b border-islamic-emerald/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-islamic-gold mb-1">
              {surah.englishName} ({surah.name})
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Surah {surah.number} • {surah.numberOfAyahs} verses • {surah.revelationType}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate(currentNumber - 1)}
              disabled={currentNumber === 1}
              className="border-islamic-emerald/30 hover:bg-islamic-emerald/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onNavigate(currentNumber + 1)}
              disabled={currentNumber === 114}
              className="border-islamic-emerald/30 hover:bg-islamic-emerald/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="p-6 space-y-6">
            {surah.ayahs.map((ayah: any) => (
              <div key={ayah.number} className="space-y-3 pb-6 border-b border-islamic-emerald/10 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-islamic-gold/20 flex items-center justify-center text-xs font-bold text-islamic-gold flex-shrink-0 mt-1">
                    {ayah.numberInSurah}
                  </div>
                  <div className="flex-1 space-y-3">
                    <p className="text-right text-2xl leading-loose font-arabic" dir="rtl" lang="ar">
                      {ayah.text}
                    </p>
                    <p className="text-base leading-relaxed text-foreground/90">{ayah.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
