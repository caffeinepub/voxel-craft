import { useState } from 'react';
import { useQuranSurah } from '@/hooks/useQueries';
import SurahList from '@/components/SurahList';
import SurahContent from '@/components/SurahContent';
import { Loader2 } from 'lucide-react';

export default function QuranPage() {
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const { data, isLoading, error } = useQuranSurah(selectedSurah);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-islamic-gold">Holy Quran</h1>
        <p className="text-muted-foreground">Read and reflect upon the words of Allah</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SurahList selectedSurah={selectedSurah} onSelectSurah={setSelectedSurah} />
        </div>

        <div className="lg:col-span-3">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-islamic-emerald" />
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-destructive">
              <p>Error loading surah. Please try again.</p>
            </div>
          )}

          {data && <SurahContent data={data} onNavigate={setSelectedSurah} />}
        </div>
      </div>
    </div>
  );
}
