
export interface Course {
  id: string;
  name: string;
  description: string;
  color: string;
  students: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  color: string;
  courseId: string;
}

export interface UserProfile {
  name: string;
  role: 'student' | 'teacher';
  school: string;
  subjects: string[];
  yearGrade: string;
  phoneNumber: string;
  preferredLanguage: string;
}

export interface TodayEvent {
  id: string;
  title: string;
  time: string;
  duration: string;
  location?: string;
  participants?: number;
  color: string;
  type: 'class' | 'meeting' | 'exam' | 'event';
}
