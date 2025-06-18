
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Globe, Bell, Monitor, Sun, Moon } from 'lucide-react';
import { UserProfile } from '@/types';

interface SettingsPageProps {
  onBack: () => void;
  userProfile: UserProfile;
  language: string;
  onLanguageChange: (language: string) => void;
}

const SettingsPage = ({ onBack, userProfile, language, onLanguageChange }: SettingsPageProps) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Подесувања</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Јазик и регион
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Јазик на апликацијата</p>
                  <p className="text-sm text-muted-foreground">Избери го твојот претпочитан јазик</p>
                </div>
                <Select value={language} onValueChange={onLanguageChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mk">Македонски</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="al">Shqip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Известувања
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push известувања</p>
                  <p className="text-sm text-muted-foreground">Добивај известувања за важни настани</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email известувања</p>
                  <p className="text-sm text-muted-foreground">Добивај дневни резимеа на email</p>
                </div>
                <Switch checked={false} onCheckedChange={() => {}} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS потсетници</p>
                  <p className="text-sm text-muted-foreground">Потсетници пред часовите</p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Изглед и тема
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Темна тема</p>
                  <p className="text-sm text-muted-foreground">Префрли кон темен режим</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Компактен приказ</p>
                  <p className="text-sm text-muted-foreground">Прикажи повеќе содржина на екранот</p>
                </div>
                <Switch checked={false} onCheckedChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Кориснички профил</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Име</p>
                  <p className="font-medium">{userProfile.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Улога</p>
                  <p className="font-medium">{userProfile.role === 'teacher' ? 'Наставник' : 'Студент'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Училиште</p>
                  <p className="font-medium">{userProfile.school}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Класа/Година</p>
                  <p className="font-medium">{userProfile.yearGrade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
