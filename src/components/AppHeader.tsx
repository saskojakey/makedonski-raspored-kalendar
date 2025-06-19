
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { UserProfile } from '@/types';

interface AppHeaderProps {
  userProfile: UserProfile;
  language: string;
  unreadNotifications: number;
  onLanguageChange: (language: string) => void;
  onNavigate: (view: string) => void;
}

const AppHeader = ({ 
  userProfile, 
  language, 
  unreadNotifications, 
  onLanguageChange, 
  onNavigate 
}: AppHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 border-b border-blue-300 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fe60a9bb-9daf-411c-b439-53d4805a9306.png" 
              alt="TaskFlow Logo" 
              className="h-10 w-10 rounded-lg shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm">
                TaskFlow
              </h1>
              <p className="text-sm text-blue-100">
                Добредојдовте, {userProfile.name}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
          <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')} className="text-white hover:bg-white/20">
            <div className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs animate-bounce bg-red-500 hover:bg-red-600"
                  variant="destructive"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('settings')} className="text-white hover:bg-white/20">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar className="cursor-pointer hover:ring-2 hover:ring-white/30 transition-all border-2 border-white/50" onClick={() => onNavigate('profile')}>
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-blue-400 text-white font-semibold">
              {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
