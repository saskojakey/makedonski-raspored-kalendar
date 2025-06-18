
import { useState } from 'react';
import { Course, CalendarEvent, UserProfile, TodayEvent } from '@/types';

export const useAppState = () => {
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

  // Course and events state
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

  return {
    // State
    isAuthenticated,
    showWelcome,
    phoneNumber,
    currentView,
    userProfile,
    courses,
    events,
    todayEvents,
    showCourseForm,
    selectedCourseId,
    unreadNotifications,
    
    // Actions
    handleAuthSuccess,
    handleWelcomeContinue,
    handleCreateCourse,
    handleNavigate,
    handleUpdateProfile,
    setSelectedCourseId,
    setShowCourseForm
  };
};
