
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  Home, 
  Calendar, 
  Clock, 
  Bell, 
  User, 
  Settings,
  BookOpen,
  Plus
} from 'lucide-react';

interface MobileSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  unreadNotifications: number;
  userName: string;
  userRole: string;
  courses: Array<{ id: string; name: string; color: string; students: string[] }>;
}

const MobileSidebar = ({ 
  currentView, 
  onNavigate, 
  unreadNotifications, 
  userName, 
  userRole,
  courses 
}: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  const menuItems = [
    {
      id: 'calendar',
      label: 'Мој Календар',
      icon: Calendar,
      active: currentView === 'calendar'
    },
    {
      id: 'today',
      label: 'Денешни Часови',
      icon: Clock,
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
      label: 'Мој Профил',
      icon: User,
      active: currentView === 'profile'
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden hover:scale-105 transition-transform"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
          <SheetHeader className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <SheetTitle className="text-white text-left">{userName}</SheetTitle>
                <p className="text-blue-100 text-sm">{userRole === 'student' ? 'Ученик' : 'Наставник'}</p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 p-4 space-y-6">
            {/* Main Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Главно Мени</h3>
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={item.active ? "default" : "ghost"}
                      className={`w-full justify-start px-3 py-3 h-auto transition-all duration-200 ${
                        item.active 
                          ? 'bg-blue-500 text-white shadow-lg scale-105' 
                          : 'hover:bg-blue-50 hover:scale-102'
                      }`}
                      onClick={() => handleNavigate(item.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && item.badge > 0 && (
                          <Badge 
                            className={`animate-pulse ${
                              item.id === 'notifications' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                          >
                            {item.badge > 9 ? '9+' : item.badge}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Брзи Акции</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start px-3 py-3 h-auto hover:bg-green-50 hover:border-green-300 transition-all"
                  onClick={() => handleNavigate('create')}
                >
                  <Plus className="h-5 w-5 mr-3 text-green-600" />
                  <span>Создај Нов Курс</span>
                </Button>
              </div>
            </div>

            {/* My Courses */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 px-2">Мои Курсеви</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {courses.map(course => (
                  <div
                    key={course.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border bg-white/50 hover:bg-white transition-all"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.students.length} студенти</p>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Немате креирано курсеви</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-3 h-auto hover:bg-gray-100"
              onClick={() => handleNavigate('settings')}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Поставки</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
