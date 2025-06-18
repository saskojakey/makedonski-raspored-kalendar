
import React from 'react';
import Calendar from '@/components/Calendar';
import CourseForm from '@/components/CourseForm';
import TodayView from '@/components/TodayView';
import SettingsPage from '@/components/SettingsPage';
import { CalendarEvent, TodayEvent, Course, UserProfile } from '@/types';

interface MainContentProps {
  showCourseForm: boolean;
  currentView: string;
  events: CalendarEvent[];
  todayEvents: TodayEvent[];
  courses: Course[];
  userProfile: UserProfile;
  language: string;
  onCreateCourse: (courseData: Omit<Course, 'id'>) => void;
  onCreateEvent: () => void;
  onCancelCourseForm: () => void;
  onNavigate: (view: string) => void;
  onLanguageChange: (language: string) => void;
  onAddStudentToCourse?: (courseId: string, studentId: string) => void;
}

const MainContent = ({
  showCourseForm,
  currentView,
  events,
  todayEvents,
  courses,
  userProfile,
  language,
  onCreateCourse,
  onCreateEvent,
  onCancelCourseForm,
  onNavigate,
  onLanguageChange,
  onAddStudentToCourse
}: MainContentProps) => {
  if (showCourseForm) {
    return (
      <CourseForm
        onSave={onCreateCourse}
        onCancel={onCancelCourseForm}
      />
    );
  }

  if (currentView === 'settings') {
    return (
      <SettingsPage
        onBack={() => onNavigate('calendar')}
        userProfile={userProfile}
        language={language}
        onLanguageChange={onLanguageChange}
      />
    );
  }

  if (currentView === 'today') {
    return (
      <TodayView
        events={todayEvents}
        onCreateEvent={onCreateEvent}
      />
    );
  }

  return (
    <Calendar
      events={events}
      courses={courses}
      onCreateEvent={onCreateEvent}
      onAddStudentToCourse={onAddStudentToCourse}
    />
  );
};

export default MainContent;
