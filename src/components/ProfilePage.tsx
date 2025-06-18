
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, User, School, BookOpen, Phone, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

interface UserProfile {
  name: string;
  role: 'student' | 'teacher';
  school: string;
  subjects: string[];
  yearGrade: string;
  phoneNumber: string;
  preferredLanguage: string;
}

interface ProfilePageProps {
  onBack: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

const ProfilePage = ({ onBack, userProfile, onUpdateProfile }: ProfilePageProps) => {
  const { t, language, setLanguage } = useTranslation();
  const [profile, setProfile] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdateProfile(profile);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Мој Профил</h1>
        </div>

        {/* Profile Card */}
        <Card className="animate-fade-in">
          <CardHeader className="text-center pb-4">
            <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/10">
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {getInitials(profile.name || 'User')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="flex items-center justify-between">
              <span>{profile.name || 'Корисник'}</span>
              <Button
                variant={isEditing ? 'default' : 'outline'}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? 'Зачувај' : 'Уреди'}
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Име и презиме
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phoneNumber}
                    onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Улога
                  </Label>
                  <Select
                    value={profile.role}
                    onValueChange={(value: 'student' | 'teacher') => 
                      setProfile({ ...profile, role: value })
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Ученик</SelectItem>
                      <SelectItem value="teacher">Наставник</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="school" className="flex items-center gap-2">
                    <School className="h-4 w-4" />
                    Училиште
                  </Label>
                  <Input
                    id="school"
                    value={profile.school}
                    onChange={(e) => setProfile({ ...profile, school: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearGrade" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {profile.role === 'student' ? 'Одделение' : 'Години искуство'}
                  </Label>
                  <Input
                    id="yearGrade"
                    value={profile.yearGrade}
                    onChange={(e) => setProfile({ ...profile, yearGrade: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Јазик
                  </Label>
                  <div className="mt-1">
                    <LanguageSwitcher
                      currentLanguage={language}
                      onLanguageChange={setLanguage}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Role-specific info */}
            {profile.role === 'teacher' && (
              <div>
                <Label className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Предмети
                </Label>
                <Input
                  value={profile.subjects.join(', ')}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    subjects: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Математика, Физика, Хемија"
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Статистики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">Курсеви</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">45</div>
                <div className="text-sm text-gray-600">Настани</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Оваа недела</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Денес</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
