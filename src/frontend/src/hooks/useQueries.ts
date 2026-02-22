import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

interface Festival {
  name: string;
  gregorianDate: string;
  hijriDate: string;
  description: string;
}

export function useQuranSurah(surahNumber: number) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['quran', surahNumber],
    queryFn: async () => {
      if (!actor) return null;
      const response = await actor.fetchQuranSurah(BigInt(surahNumber));
      return JSON.parse(response);
    },
    enabled: !!actor && !isFetching && surahNumber >= 1 && surahNumber <= 114,
  });
}

export function usePrayerTimes(city: string, country: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['prayerTimes', city, country],
    queryFn: async () => {
      if (!actor) return null;
      const response = await actor.fetchPrayerTimes(city, country);
      return JSON.parse(response);
    },
    enabled: !!actor && !isFetching && !!city && !!country,
  });
}

export function useIslamicCalendar(year: number) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['islamicCalendar', year],
    queryFn: async () => {
      if (!actor) return null;
      const response = await actor.fetchIslamicCalendar(BigInt(year));
      const data = JSON.parse(response);
      
      // Extract important Islamic dates
      const importantDates: Festival[] = [];
      
      if (data.data) {
        // Process the calendar data to extract major festivals
        for (const month of data.data) {
          for (const day of month) {
            const hijriDate = day.hijri;
            const gregorianDate = day.gregorian;
            
            // Check for major Islamic holidays
            if (hijriDate.holidays && hijriDate.holidays.length > 0) {
              for (const holiday of hijriDate.holidays) {
                importantDates.push({
                  name: holiday,
                  gregorianDate: `${gregorianDate.day} ${gregorianDate.month.en} ${gregorianDate.year}`,
                  hijriDate: `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}`,
                  description: getHolidayDescription(holiday),
                });
              }
            }
          }
        }
      }
      
      return importantDates;
    },
    enabled: !!actor && !isFetching,
  });
}

function getHolidayDescription(holiday: string): string {
  const descriptions: Record<string, string> = {
    'Eid al-Fitr': 'Festival of Breaking the Fast, celebrated after Ramadan',
    'Eid al-Adha': 'Festival of Sacrifice, commemorating Ibrahim\'s willingness to sacrifice his son',
    'Ramadan': 'The holy month of fasting',
    'Laylat al-Qadr': 'The Night of Power, when the Quran was first revealed',
    'Mawlid al-Nabi': 'Birthday of Prophet Muhammad (peace be upon him)',
    'Isra and Mi\'raj': 'The Night Journey and Ascension of Prophet Muhammad',
    'Day of Arafah': 'The most important day of Hajj pilgrimage',
    'Ashura': 'Day of remembrance observed on the 10th of Muharram',
  };
  
  for (const [key, desc] of Object.entries(descriptions)) {
    if (holiday.includes(key)) {
      return desc;
    }
  }
  
  return '';
}
