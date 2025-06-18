
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
  courseId: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  onCreateEvent: () => void;
}

const Calendar = ({ events, onCreateEvent }: CalendarProps) => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');

  const monthNames = [
    'Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
    'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];

  const dayNames = ['Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб', 'Нед'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 1; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('month')}
          >
            {t('month')}
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('week')}
          >
            {t('week')}
          </Button>
          <Button onClick={onCreateEvent} className="ml-2">
            <Plus className="h-4 w-4 mr-2" />
            {t('createCourse')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 border rounded-lg transition-colors hover:bg-gray-50 ${
                day && isToday(day) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-2 ${
                    isToday(day) ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDay(day).map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded text-white truncate"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.time} - {event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
