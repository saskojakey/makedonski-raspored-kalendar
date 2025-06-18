
import React from 'react';
import Calendar from '@/components/Calendar';
import CourseForm from '@/components/CourseForm';
import TodayView from '@/components/TodayView';
import { CalendarEvent, TodayEvent, Course } from '@/types';

interface MainContentProps {
  showCourseForm: boolean;
  currentView: string;
  events: CalendarEvent[];
  todayEvents: TodayEvent[];
  onCreateCourse: (courseData: Omit<Course, 'id'>) => void;
  onCreateEvent: () => void;
  onCancelCourseForm: () => void;
}

const MainContent = ({
  showCourseForm,
  currentView,
  events,
  todayEvents,
  onCreateCourse,
  onCreateEvent,
  onCancelCourseForm
}: MainContentProps) => {
  if (showCourseForm) {
    return (
      <CourseForm
        onSave={onCreateCourse}
        onCancel={onCancelCourseForm}
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
      onCreateEvent={onCreateEvent}
    />
  );
};

export default MainContent;
