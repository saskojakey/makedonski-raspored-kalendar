
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useGestures } from '@/hooks/useGestures';

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
  const [view, setView] = useState<'day' | 'week' | 'month'>('month');
  const [zoomLevel, setZoomLevel] = useState(1);

  const monthNames = [
    'Јануари', 'Февруари', 'Март', 'Април', 'Мај', 'Јуни',
    'Јули', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
  ];

  const dayNames = ['Пон', 'Вто', 'Сре', 'Чет', 'Пет', 'Саб', 'Нед'];

  // Handle pinch-to-zoom for view switching
  const handlePinch = (scale: number) => {
    setZoomLevel(scale);
    if (scale < 0.7 && view !== 'month') {
      setView('month');
    } else if (scale > 1.3 && view !== 'day') {
      setView('day');
    } else if (scale >= 0.7 && scale <= 1.3 && view !== 'week') {
      setView('week');
    }
  };

  // Handle swipe gestures for navigation
  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (direction === 'left') {
      navigateMonth('next');
    } else if (direction === 'right') {
      navigateMonth('prev');
    }
  };

  const { gestureHandlers } = useGestures({
    onPinch: handlePinch,
    onSwipe: handleSwipe,
    minScale: 0.5,
    maxScale: 2
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    const days = [];
    
    for (let i = 1; i < startingDay; i++) {
      days.push(null);
    }
    
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

  const renderDayView = () => {
    const today = new Date();
    const todayEvents = getEventsForDay(today.getDate());
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold">
            {today.getDate()} {monthNames[today.getMonth()]}
          </h3>
          <p className="text-gray-600">Денешни часови</p>
        </div>
        <div className="space-y-3">
          {todayEvents.map(event => (
            <div
              key={event.id}
              className="p-4 rounded-lg border-l-4 bg-white shadow-sm"
              style={{ borderLeftColor: event.color }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: event.color }}
                />
              </div>
            </div>
          ))}
          {todayEvents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Немате планирани часови денес</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }

    return (
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => {
          const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === day.toDateString();
          });
          
          return (
            <div key={index} className="border rounded-lg p-2 min-h-[120px]">
              <div className={`text-center font-medium mb-2 ${
                day.toDateString() === new Date().toDateString() 
                  ? 'text-blue-600 bg-blue-50 rounded px-2 py-1' 
                  : ''
              }`}>
                <div className="text-xs text-gray-500">{dayNames[index]}</div>
                <div>{day.getDate()}</div>
              </div>
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded text-white truncate"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.time}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center font-medium text-muted-foreground text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[80px] md:min-h-[100px] p-2 border rounded-lg transition-colors hover:bg-gray-50 touch-manipulation ${
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
                    {getEventsForDay(day).slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className="text-xs p-1 rounded text-white truncate"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.time}
                      </div>
                    ))}
                    {getEventsForDay(day).length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{getEventsForDay(day).length - 2}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="hover:scale-110 transition-transform"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="hover:scale-110 transition-transform"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1">
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('day')}
              className="hover:scale-105 transition-transform"
            >
              Ден
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('week')}
              className="hover:scale-105 transition-transform"
            >
              Недела
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
              className="hover:scale-105 transition-transform"
            >
              Месец
            </Button>
          </div>
          
          <Button 
            onClick={onCreateEvent} 
            className="hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-purple-600"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Додај
          </Button>
        </div>
      </CardHeader>
      
      <CardContent 
        className="touch-manipulation"
        {...gestureHandlers}
        style={{ touchAction: 'manipulation' }}
      >
        {/* Zoom indicator for mobile */}
        <div className="md:hidden flex justify-center mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            <ZoomOut className="h-3 w-3" />
            <span>Притисни и повлечи за зум</span>
            <ZoomIn className="h-3 w-3" />
          </div>
        </div>
        
        <div className="transition-all duration-300 ease-in-out">
          {view === 'day' && renderDayView()}
          {view === 'week' && renderWeekView()}
          {view === 'month' && renderMonthView()}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar;
