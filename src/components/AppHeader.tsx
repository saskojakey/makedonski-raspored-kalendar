
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
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            EduКалендар
          </h1>
          <p className="text-sm text-muted-foreground">
            Добредојдовте, {userProfile.name}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
          <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>
            <div className="relative">
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs animate-bounce"
                  variant="destructive"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all" onClick={() => onNavigate('profile')}>
            <AvatarFallback>
              {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
