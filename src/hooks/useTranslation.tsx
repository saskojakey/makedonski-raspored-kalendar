
import { useState } from 'react';

const translations = {
  mk: {
    // Navigation
    calendar: 'Календар',
    courses: 'Курсеви',
    settings: 'Подесувања',
    
    // Calendar
    today: 'Денес',
    thisWeek: 'Оваа недела',
    month: 'Месец',
    week: 'Недела',
    
    // Course Management
    createCourse: 'Создај курс',
    courseName: 'Име на курс',
    courseDescription: 'Опис на курс',
    selectColor: 'Избери боја',
    addStudents: 'Додај студенти',
    save: 'Зачувај',
    cancel: 'Откажи',
    
    // Student Management
    enrollStudent: 'Запиши студент',
    phoneNumber: 'Телефонски број',
    sendInvite: 'Испрати покана',
    pendingInvites: 'Покани во очекување',
    
    // Authentication & Profile
    welcome: 'Добредојдовте',
    profile: 'Профил',
    name: 'Име',
    role: 'Улога',
    school: 'Училиште',
    student: 'Ученик',
    teacher: 'Наставник',
    notifications: 'Известувања',
    
    // General
    loading: 'Се вчитува...',
    error: 'Грешка',
    success: 'Успех',
  },
  en: {
    // Navigation
    calendar: 'Calendar',
    courses: 'Courses',
    settings: 'Settings',
    
    // Calendar
    today: 'Today',
    thisWeek: 'This Week',
    month: 'Month',
    week: 'Week',
    
    // Course Management
    createCourse: 'Create Course',
    courseName: 'Course Name',
    courseDescription: 'Course Description',
    selectColor: 'Select Color',
    addStudents: 'Add Students',
    save: 'Save',
    cancel: 'Cancel',
    
    // Student Management
    enrollStudent: 'Enroll Student',
    phoneNumber: 'Phone Number',
    sendInvite: 'Send Invite',
    pendingInvites: 'Pending Invites',
    
    // Authentication & Profile
    welcome: 'Welcome',
    profile: 'Profile',
    name: 'Name',
    role: 'Role',
    school: 'School',
    student: 'Student',
    teacher: 'Teacher',
    notifications: 'Notifications',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  al: {
    // Navigation
    calendar: 'Kalendar',
    courses: 'Kurset',
    settings: 'Cilësimet',
    
    // Calendar
    today: 'Sot',
    thisWeek: 'Kjo javë',
    month: 'Muaji',
    week: 'Java',
    
    // Course Management
    createCourse: 'Krijo Kurs',
    courseName: 'Emri i Kursit',
    courseDescription: 'Përshkrimi i Kursit',
    selectColor: 'Zgjidh Ngjyrën',
    addStudents: 'Shto Studentë',
    save: 'Ruaj',
    cancel: 'Anulo',
    
    // Student Management
    enrollStudent: 'Regjistro Student',
    phoneNumber: 'Numri i Telefonit',
    sendInvite: 'Dërgo Ftesë',
    pendingInvites: 'Ftesa në Pritje',
    
    // Authentication & Profile
    welcome: 'Mirë se vini',
    profile: 'Profili',
    name: 'Emri',
    role: 'Roli',
    school: 'Shkolla',
    student: 'Student',
    teacher: 'Mësues',
    notifications: 'Njoftimet',
    
    // General
    loading: 'Duke u ngarkuar...',
    error: 'Gabim',
    success: 'Sukses',
  },
};

export const useTranslation = () => {
  const [language, setLanguageState] = useState<keyof typeof translations>('mk');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const setLanguage = (newLanguage: string) => {
    if (newLanguage === 'mk' || newLanguage === 'en' || newLanguage === 'al') {
      setLanguageState(newLanguage);
    }
  };

  return {
    t,
    language,
    setLanguage,
  };
};
