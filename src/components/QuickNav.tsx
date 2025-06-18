
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Bell, User, Home, Plus } from 'lucide-react';

interface QuickNavProps {
  onNavigate: (view: string) => void;
  currentView: string;
  todayEventCount: number;
  unreadNotifications: number;
}

const QuickNav = ({ onNavigate, currentView, todayEventCount, unreadNotifications }: QuickNavProps) => {
  const navItems = [
    {
      id: 'calendar',
      label: 'Календар',
      icon: Calendar,
      active: currentView === 'calendar'
    },
    {
      id: 'today',
      label: 'Денес',
      icon: Clock,
      badge: todayEventCount,
      active: currentView === 'today'
    },
    {
      id: 'notifications',
      label: 'Известувања',
      icon: Bell,
      badge: unreadNotifications,
      active: currentView === 'notifications'
    },
    {
      id: 'profile',
      label: 'Профил',
      icon: User,
      active: currentView === 'profile'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                item.active ? 'animate-pulse' : ''
              }`}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && item.badge > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs animate-bounce"
                    variant={item.id === 'notifications' ? 'destructive' : 'default'}
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
        
        {/* Quick Add Button */}
        <Button
          size="sm"
          onClick={() => onNavigate('create')}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform"
        >
          <Plus className="h-5 w-5" />
          <span className="text-xs">Додај</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickNav;
