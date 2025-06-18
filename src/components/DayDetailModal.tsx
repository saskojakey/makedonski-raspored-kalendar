
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarEvent } from '@/types';
import { X, Calendar, Clock, Sparkles, Sun } from 'lucide-react';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  events: CalendarEvent[];
}

const DayDetailModal = ({ isOpen, onClose, selectedDate, events }: DayDetailModalProps) => {
  if (!selectedDate) return null;

  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('mk-MK', options);
  };

  const funMessages = [
    "Ура! Слободен си денес! 🎉",
    "Денес нема часови - време за одмор! ☕",
    "Перфектен ден за релаксација! 🌸",
    "Време е за твоите хобија! 🎨",
    "Уживај во слободното време! 🌞"
  ];

  const getRandomMessage = () => {
    return funMessages[Math.floor(Math.random() * funMessages.length)];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md backdrop-blur-sm bg-white/95 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 rounded-lg -z-10" />
        
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              {formatDate(selectedDate)}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/50">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {dayEvents.length > 0 ? (
            <>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  {dayEvents.length} {dayEvents.length === 1 ? 'час' : 'часови'} планирани
                </p>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {dayEvents.map(event => (
                  <Card key={event.id} className="border-l-4 hover:shadow-md transition-shadow bg-white/70 backdrop-blur-sm" 
                        style={{ borderLeftColor: event.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                        </div>
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm"
                          style={{ backgroundColor: event.color }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <Sparkles className="h-6 w-6 text-yellow-500 mx-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {getRandomMessage()}
              </h3>
              <p className="text-sm text-muted-foreground">
                Нема планирани часови за овој ден
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DayDetailModal;
