
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import CourseForm from '@/components/CourseForm';
import Sidebar from '@/components/Sidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Settings } from 'lucide-react';

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

const Index = () => {
  const { t, language, setLanguage } = useTranslation();
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

  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>();

  const handleCreateCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Date.now().toString(),
    };
    setCourses(prev => [...prev, newCourse]);
    setShowCourseForm(false);
  };

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
                Училишен календар за македонски училишта
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback>
                  <User className="h-4 w-4" />
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
          ) : (
            <Calendar
              events={events}
              onCreateEvent={() => setShowCourseForm(true)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
