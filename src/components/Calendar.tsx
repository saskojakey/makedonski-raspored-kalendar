import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Plus, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useGestures } from '@/hooks/useGestures';
import { useIsMobile} from "@/hooks/use-mobile.tsx";

import DayDetailModal from './DayDetailModal';
import CourseDetailModal from './CourseDetailModal';

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
  courses?: any[];
  onAddStudentToCourse?: (courseId: string, studentId: string) => void;
  onRemoveStudentFromCourse?: (courseId: string, studentId: string) => void;
}

const Calendar = ({ events, onCreateEvent, courses = [], onAddStudentToCourse, onRemoveStudentFromCourse }: CalendarProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week'); // Default to week
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

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
      if (view === 'week') {
        navigateWeek('next');
      } else {
        navigateMonth('next');
      }
    } else if (direction === 'right') {
      if (view === 'week') {
        navigateWeek('prev');
      } else {
        navigateMonth('prev');
      }
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

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
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

  const handleDayClick = (day: number | Date) => {
    let clickedDate: Date;
    if (day instanceof Date) {
      clickedDate = day;
    } else {
      clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    }
    setSelectedDate(clickedDate);
    setIsDayModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const course = courses.find(c => c.id === event.courseId);
    if (course) {
      setSelectedCourse(course);
      setIsCourseModalOpen(true);
    }
  };

  const handleAddStudentToCourse = (courseId: string, studentId: string) => {
    if (onAddStudentToCourse) {
      onAddStudentToCourse(courseId, studentId);
    }
  };

  const handleRemoveStudentFromCourse = (courseId: string, studentId: string) => {
    if (onRemoveStudentFromCourse) {
      onRemoveStudentFromCourse(courseId, studentId);
    }
  };

  // Mobile day view with agenda-style layout
  const renderMobileDayView = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    
    const days = [
      { date: today, label: 'Денес' },
      { date: tomorrow, label: 'Утре' },
      { date: dayAfter, label: 'Задутре' }
    ];

    return (
      <div className="space-y-4">
        {days.map((day, index) => {
          const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === day.date.toDateString();
          });

          return (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => handleDayClick(day.date)}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{day.label}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {day.date.getDate()}/{day.date.getMonth() + 1}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayEvents.length > 0 ? (
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center gap-3 p-2 rounded-lg border-l-4 bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                        style={{ borderLeftColor: event.color }}
                        onClick={(e) => handleEventClick(event, e)}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Нема планирани часови
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const getWeekDates = () => {
    const weekStart = new Date(currentDate);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    weekStart.setDate(diff);
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const renderWeekView = () => {
    const weekDays = getWeekDates();

    return (
      <div className="space-y-4">
        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek('prev')}
            className="hover:scale-110 transition-all duration-200 hover:bg-blue-50 border-blue-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Претходна недела
          </Button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {weekDays[0].getDate()} {monthNames[weekDays[0].getMonth()]} - {weekDays[6].getDate()} {monthNames[weekDays[6].getMonth()]} {weekDays[0].getFullYear()}
            </h3>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateWeek('next')}
            className="hover:scale-110 transition-all duration-200 hover:bg-blue-50 border-blue-200"
          >
            Следна недела
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => {
            const dayEvents = events.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.toDateString() === day.toDateString();
            });
            
            const isCurrentDay = day.toDateString() === new Date().toDateString();
            
            return (
              <div key={index} className={`border rounded-lg p-3 min-h-[140px] cursor-pointer hover:shadow-md transition-all duration-200 ${
                isCurrentDay ? 'bg-blue-50 border-blue-300 shadow-sm' : 'hover:bg-gray-50 border-gray-200'
              }`}
                   onClick={() => handleDayClick(day)}>
                <div className={`text-center font-medium mb-3 ${
                  isCurrentDay ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  <div className="text-xs text-gray-500 mb-1">{dayNames[index]}</div>
                  <div className={`text-lg font-bold ${isCurrentDay ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                    {day.getDate()}
                  </div>
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-2 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                      style={{ backgroundColor: event.color }}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-90">{event.time}</div>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 text-center bg-gray-100 rounded p-1">
                      +{dayEvents.length - 3} повеќе
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
              className={`min-h-[80px] md:min-h-[100px] p-2 border rounded-lg transition-colors hover:bg-gray-50 touch-manipulation cursor-pointer ${
                day && isToday(day) ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
              onClick={() => day && handleDayClick(day)}
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
                        className="text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80"
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => handleEventClick(event, e)}
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

  const getHeaderTitle = () => {
    if (view === 'week') {
      const weekDays = getWeekDates();
      if (weekDays[0].getMonth() === weekDays[6].getMonth()) {
        return `${monthNames[weekDays[0].getMonth()]} ${weekDays[0].getFullYear()}`;
      } else {
        return `${monthNames[weekDays[0].getMonth()]} - ${monthNames[weekDays[6].getMonth()]} ${weekDays[0].getFullYear()}`;
      }
    }
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <CardTitle className="text-xl sm:text-2xl font-bold">
              {getHeaderTitle()}
            </CardTitle>
            {view !== 'week' && (
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
            )}
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {!isMobile && (
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
            )}
            
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
          {isMobile && (
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                <ZoomOut className="h-3 w-3" />
                <span>Притисни и повлечи за зум</span>
                <ZoomIn className="h-3 w-3" />
              </div>
            </div>
          )}
          
          <div className="transition-all duration-300 ease-in-out">
            {isMobile ? renderMobileDayView() : (
              <>
                {view === 'day' && renderMobileDayView()}
                {view === 'week' && renderWeekView()}
                {view === 'month' && renderMonthView()}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <DayDetailModal
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
        selectedDate={selectedDate}
        events={events}
      />

      <CourseDetailModal
        course={selectedCourse}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onAddStudent={handleAddStudentToCourse}
        onRemoveStudent={handleRemoveStudentFromCourse}
      />
    </>
  );
};

export default Calendar;
