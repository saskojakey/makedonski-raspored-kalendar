
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import CourseForm from '@/components/CourseForm';
import Sidebar from '@/components/Sidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PhoneAuth from '@/components/PhoneAuth';
import WelcomeScreen from '@/components/WelcomeScreen';
import ProfilePage from '@/components/ProfilePage';
import NotificationCenter from '@/components/NotificationCenter';
import TodayView from '@/components/TodayView';
import QuickNav from '@/components/QuickNav';
import MobileSidebar from '@/components/MobileSidebar';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Settings, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  name: string;
  description: string;
  color: string;
  students: string[];
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
  courseId: string;
}

interface UserProfile {
  name: string;
  role: 'student' | 'teacher';
  school: string;
  subjects: string[];
  yearGrade: string;
  phoneNumber: string;
  preferredLanguage: string;
}

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

const Index = () => {
  const { t, language, setLanguage } = useTranslation();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Navigation state
  const [currentView, setCurrentView] = useState('calendar');
  
  // User profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Марко Петровски',
    role: 'student',
    school: 'ОУ "Гоце Делчев"',
    subjects: [],
    yearGrade: '9-А',
    phoneNumber: '',
    preferredLanguage: 'mk'
  });

  // Existing course and events state
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      name: 'Математика',
      description: 'Основи на алгебра и геометрија',
      color: '#3B82F6',
      students: ['+389 70 123 456', '+389 71 234 567']
    },
    {
      id: '2',
      name: 'Историја',
      description: 'Македонска историја',
      color: '#10B981',
      students: ['+389 72 345 678']
    }
  ]);
  
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Математика',
      date: new Date(2024, 5, 18, 10, 0),
      time: '10:00',
      color: '#3B82F6',
      courseId: '1'
    },
    {
      id: '2',
      title: 'Историја',
      date: new Date(2024, 5, 20, 14, 0),
      time: '14:00',
      color: '#10B981',
      courseId: '2'
    }
  ]);

  // Today's events (mock data)
  const [todayEvents] = useState<TodayEvent[]>([
    {
      id: '1',
      title: 'Математика - Алгебра',
      time: '08:00',
      duration: '45 мин',
      location: 'Сала 201',
      participants: 25,
      color: '#3B82F6',
      type: 'class'
    },
    {
      id: '2',
      title: 'Историја - Македонски владетели',
      time: '10:30',
      duration: '45 мин',
      location: 'Сала 105',
      participants: 28,
      color: '#10B981',
      type: 'class'
    },
    {
      id: '3',
      title: 'Родителски состанок',
      time: '16:00',
      duration: '90 мин',
      location: 'Голема сала',
      participants: 15,
      color: '#F59E0B',
      type: 'meeting'
    }
  ]);

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>();

  // Mock notification count
  const unreadNotifications = 2;

  const handleAuthSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setUserProfile(prev => ({ ...prev, phoneNumber: phone }));
    setShowWelcome(true);
  };

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    setIsAuthenticated(true);
  };

  const handleCreateCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };
    setCourses(prev => [...prev, newCourse]);
    setShowCourseForm(false);
  };

  const handleNavigate = (view: string) => {
    if (view === 'create') {
      setShowCourseForm(true);
      setCurrentView('calendar');
    } else {
      setCurrentView(view);
      setShowCourseForm(false);
    }
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  // Authentication flow
  if (!isAuthenticated) {
    if (showWelcome) {
      return <WelcomeScreen phoneNumber={phoneNumber} onContinue={handleWelcomeContinue} />;
    }
    return <PhoneAuth onAuthSuccess={handleAuthSuccess} />;
  }

  // Profile view
  if (currentView === 'profile') {
    return (
      <ProfilePage
        onBack={() => setCurrentView('calendar')}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    );
  }

  // Notifications view
  if (currentView === 'notifications') {
    return <NotificationCenter onBack={() => setCurrentView('calendar')} />;
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        courses={courses}
        onCourseSelect={setSelectedCourseId}
        selectedCourseId={selectedCourseId}
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
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
                onLanguageChange={setLanguage}
              />
              <Button variant="ghost" size="sm" onClick={() => setCurrentView('notifications')}>
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
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all" onClick={() => setCurrentView('profile')}>
                <AvatarFallback>
                  {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {showCourseForm ? (
            <CourseForm
              onSave={handleCreateCourse}
              onCancel={() => setShowCourseForm(false)}
            />
          ) : currentView === 'today' ? (
            <TodayView
              events={todayEvents}
              onCreateEvent={() => setShowCourseForm(true)}
            />
          ) : (
            <Calendar
              events={events}
              onCreateEvent={() => setShowCourseForm(true)}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <QuickNav
          onNavigate={handleNavigate}
          currentView={currentView}
          todayEventCount={todayEvents.length}
          unreadNotifications={unreadNotifications}
        />
      </div>
    </div>
  );
};

export default Index;
