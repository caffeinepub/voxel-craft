import { Link } from '@tanstack/react-router';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-islamic-gold">Islamic Companion</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your spiritual guide for Quran reading, prayer times, and Islamic calendar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Link to="/quran" className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-islamic-emerald/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-islamic-emerald/10 flex items-center justify-center mb-4 group-hover:bg-islamic-emerald/20 transition-colors">
                <BookOpen className="w-8 h-8 text-islamic-emerald" />
              </div>
              <CardTitle className="text-2xl text-islamic-gold">Holy Quran</CardTitle>
              <CardDescription className="text-base">
                Read and explore all 114 surahs with Arabic text and English translations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access the complete Quran with clear formatting and easy navigation
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/prayer-times" className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-islamic-emerald/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-islamic-teal/10 flex items-center justify-center mb-4 group-hover:bg-islamic-teal/20 transition-colors">
                <Clock className="w-8 h-8 text-islamic-teal" />
              </div>
              <CardTitle className="text-2xl text-islamic-gold">Prayer Times</CardTitle>
              <CardDescription className="text-base">
                Get accurate prayer times for your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Daily times for Fajr, Dhuhr, Asr, Maghrib, and Isha prayers
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/calendar" className="group">
          <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-islamic-emerald/20 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-islamic-gold/10 flex items-center justify-center mb-4 group-hover:bg-islamic-gold/20 transition-colors">
                <Calendar className="w-8 h-8 text-islamic-gold" />
              </div>
              <CardTitle className="text-2xl text-islamic-gold">Islamic Calendar</CardTitle>
              <CardDescription className="text-base">
                View important Islamic dates and festivals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Eid al-Fitr, Eid al-Adha, Ramadan, and other significant dates
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
