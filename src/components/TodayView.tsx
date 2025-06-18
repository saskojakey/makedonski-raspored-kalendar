
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Plus, Calendar as CalendarIcon } from 'lucide-react';

interface TodayEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  location?: string;
  participants?: number;
  color: string;
  type: 'class' | 'meeting' | 'exam' | 'event';
}

interface TodayViewProps {
  events: TodayEvent[];
  onCreateEvent: () => void;
}

const TodayView = ({ events, onCreateEvent }: TodayViewProps) => {
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('mk-MK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'class': return 'Час';
      case 'meeting': return 'Состанок';
      case 'exam': return 'Испит';
      case 'event': return 'Настан';
      default: return 'Настан';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
  
  const sortedEvents = events.sort((a, b) => {
    const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
    const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
    return timeA - timeB;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Денес</h1>
            <p className="opacity-90">{todayFormatted}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{events.length}</div>
            <div className="text-sm opacity-90">настани</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {events.filter(e => e.type === 'class').length}
            </div>
            <div className="text-sm text-gray-600">Часови</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.type === 'meeting').length}
            </div>
            <div className="text-sm text-gray-600">Состаноци</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {events.filter(e => e.type === 'event').length}
            </div>
            <div className="text-sm text-gray-600">Настани</div>
          </CardContent>
        </Card>
      </div>

      {/* Events Timeline */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Распоред за денес
          </CardTitle>
          <Button size="sm" onClick={onCreateEvent} className="hover:scale-105 transition-transform">
            <Plus className="h-4 w-4 mr-1" />
            Додај
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Немате планирани настани за денес</p>
              <Button variant="outline" onClick={onCreateEvent} className="mt-4">
                Создај настан
              </Button>
            </div>
          ) : (
            sortedEvents.map((event, index) => {
              const eventTime = parseInt(event.time.split(':')[0]) * 60 + parseInt(event.time.split(':')[1]);
              const isUpcoming = eventTime > currentTime;
              const isActive = eventTime <= currentTime && (eventTime + 60) > currentTime; // Assuming 1 hour duration
              
              return (
                <div
                  key={event.id}
                  className={`relative p-4 rounded-lg border transition-all hover:shadow-md ${
                    isActive 
                      ? 'bg-green-50 border-green-200 shadow-md animate-pulse' 
                      : isUpcoming 
                        ? 'bg-white border-gray-200' 
                        : 'bg-gray-50 border-gray-200 opacity-75'
                  }`}
                >
                  {/* Timeline connector */}
                  {index > 0 && (
                    <div className="absolute -top-3 left-6 w-0.5 h-6 bg-gray-200"></div>
                  )}
                  
                  {/* Time indicator */}
                  <div className={`absolute left-0 top-4 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                    isActive ? 'bg-green-500' : isUpcoming ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  
                  <div className="ml-6">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={getTypeColor(event.type)}>
                            {getTypeLabel(event.type)}
                          </Badge>
                          {isActive && (
                            <Badge className="bg-green-100 text-green-800 animate-bounce">
                              Активен
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {event.time} ({event.duration})
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                          
                          {event.participants && (
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.participants} учесници
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div 
                        className="w-4 h-16 rounded-full"
                        style={{ backgroundColor: event.color }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodayView;
