
import { useState, useEffect } from 'react';

const translations = {
  mk: {
    // App Name
    appName: 'МојРаспоред',
    appWelcome: 'Добредојдовте во МојРаспоред! 🎉',
    appSubtitle: 'Вашиот нов организатор за задачи е подготвен',
    appDescription: 'Современ организатор за задачи и распоред за македонски основни и средни училишта со поддршка за македонски, англиски и албански јазик.',
    
    // Navigation
    calendar: 'Календар',
    courses: 'Курсеви',
    settings: 'Подесувања',
    myCalendar: 'Мој Календар',
    todayClasses: 'Денешни Часови',
    myProfile: 'Мој Профил',
    mainMenu: 'Главно Мени',
    quickActions: 'Брзи Акции',
    myCourses: 'Мои Курсеви',
    
    // Calendar
    today: 'Денес',
    thisWeek: 'Оваа недела',
    month: 'Месец',
    week: 'Недела',
    
    // Course Management
    createCourse: 'Создај курс',
    createNewCourse: 'Создај Нов Курс',
    courseName: 'Име на курс',
    courseDescription: 'Опис на курс',
    selectColor: 'Избери боја',
    addStudents: 'Додај студенти',
    save: 'Зачувај',
    cancel: 'Откажи',
    students: 'студенти',
    noCoursesCreated: 'Немате креирано курсеви',
    
    // Student Management
    enrollStudent: 'Запиши студент',
    phoneNumber: 'Телефонски број',
    sendInvite: 'Испрати покана',
    pendingInvites: 'Покани во очекување',
    
    // Authentication & Profile
    welcome: 'Добредојдовте',
    welcomeUser: 'Добредојдовте, {name}',
    profile: 'Профил',
    name: 'Име',
    role: 'Улога',
    school: 'Училиште',
    student: 'Ученик',
    teacher: 'Наставник',
    notifications: 'Известувања',
    startUsing: 'Почни да го користиш',
    
    // Settings
    languageAndRegion: 'Јазик и регион',
    appLanguage: 'Јазик на апликацијата',
    selectPreferredLanguage: 'Избери го твојот претпочитан јазик',
    pushNotifications: 'Push известувања',
    receiveImportantNotifications: 'Добивај известувања за важни настани',
    emailNotifications: 'Email известувања',
    receiveDailySummaries: 'Добивај дневни резимеа на email',
    smsReminders: 'SMS потсетници',
    remindersBeforeClasses: 'Потсетници пред часовите',
    appearanceAndTheme: 'Изглед и тема',
    darkTheme: 'Темна тема',
    switchToDarkMode: 'Префрли кон темен режим',
    compactView: 'Компактен приказ',
    showMoreContent: 'Прикажи повеќе содржина на екранот',
    userProfile: 'Кориснички профил',
    classYear: 'Класа/Година',
    
    // General
    loading: 'Се вчитува...',
    error: 'Грешка',
    success: 'Успех',
    add: 'Додај',
    
    // Days of the week
    monday: 'Понеделник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четврток',
    friday: 'Петок',
    saturday: 'Сабота',
    sunday: 'Недела',
    
    // Subjects (common ones)
    mathematics: 'Математика',
    history: 'Историја',
    biology: 'Биологија',
    physics: 'Физика',
    chemistry: 'Хемија',
    literature: 'Литература',
    geography: 'Географија',
  },
  en: {
    // App Name
    appName: 'MojRaspored',
    appWelcome: 'Welcome to MojRaspored! 🎉',
    appSubtitle: 'Your new task organizer is ready',
    appDescription: 'Modern task and schedule organizer for Macedonian primary and secondary schools with support for Macedonian, English and Albanian languages.',
    
    // Navigation
    calendar: 'Calendar',
    courses: 'Courses',
    settings: 'Settings',
    myCalendar: 'My Calendar',
    todayClasses: 'Today\'s Classes',
    myProfile: 'My Profile',
    mainMenu: 'Main Menu',
    quickActions: 'Quick Actions',
    myCourses: 'My Courses',
    
    // Calendar
    today: 'Today',
    thisWeek: 'This Week',
    month: 'Month',
    week: 'Week',
    
    // Course Management
    createCourse: 'Create Course',
    createNewCourse: 'Create New Course',
    courseName: 'Course Name',
    courseDescription: 'Course Description',
    selectColor: 'Select Color',
    addStudents: 'Add Students',
    save: 'Save',
    cancel: 'Cancel',
    students: 'students',
    noCoursesCreated: 'No courses created',
    
    // Student Management
    enrollStudent: 'Enroll Student',
    phoneNumber: 'Phone Number',
    sendInvite: 'Send Invite',
    pendingInvites: 'Pending Invites',
    
    // Authentication & Profile
    welcome: 'Welcome',
    welcomeUser: 'Welcome, {name}',
    profile: 'Profile',
    name: 'Name',
    role: 'Role',
    school: 'School',
    student: 'Student',
    teacher: 'Teacher',
    notifications: 'Notifications',
    startUsing: 'Start using it',
    
    // Settings
    languageAndRegion: 'Language and Region',
    appLanguage: 'App Language',
    selectPreferredLanguage: 'Select your preferred language',
    pushNotifications: 'Push Notifications',
    receiveImportantNotifications: 'Receive notifications for important events',
    emailNotifications: 'Email Notifications',
    receiveDailySummaries: 'Receive daily summaries via email',
    smsReminders: 'SMS Reminders',
    remindersBeforeClasses: 'Reminders before classes',
    appearanceAndTheme: 'Appearance and Theme',
    darkTheme: 'Dark Theme',
    switchToDarkMode: 'Switch to dark mode',
    compactView: 'Compact View',
    showMoreContent: 'Show more content on screen',
    userProfile: 'User Profile',
    classYear: 'Class/Year',
    
    // General
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    add: 'Add',
    
    // Days of the week
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    // Subjects (common ones)
    mathematics: 'Mathematics',
    history: 'History',
    biology: 'Biology',
    physics: 'Physics',
    chemistry: 'Chemistry',
    literature: 'Literature',
    geography: 'Geography',
  },
  al: {
    // App Name
    appName: 'MojRaspored',
    appWelcome: 'Mirë se vini në MojRaspored! 🎉',
    appSubtitle: 'Organizatori juaj i ri i detyrave është gati',
    appDescription: 'Organizator modern i detyrave dhe orarit për shkollat fillore dhe të mesme maqedonase me mbështetje për gjuhët maqedonase, anglisht dhe shqip.',
    
    // Navigation
    calendar: 'Kalendar',
    courses: 'Kurset',
    settings: 'Cilësimet',
    myCalendar: 'Kalendari Im',
    todayClasses: 'Orët e Sotme',
    myProfile: 'Profili Im',
    mainMenu: 'Menyja Kryesore',
    quickActions: 'Veprime të Shpejta',
    myCourses: 'Kurset e Mia',
    
    // Calendar
    today: 'Sot',
    thisWeek: 'Kjo javë',
    month: 'Muaji',
    week: 'Java',
    
    // Course Management
    createCourse: 'Krijo Kurs',
    createNewCourse: 'Krijo Kurs të Ri',
    courseName: 'Emri i Kursit',
    courseDescription: 'Përshkrimi i Kursit',
    selectColor: 'Zgjidh Ngjyrën',
    addStudents: 'Shto Studentë',
    save: 'Ruaj',
    cancel: 'Anulo',
    students: 'studentë',
    noCoursesCreated: 'Nuk keni krijuar kurse',
    
    // Student Management
    enrollStudent: 'Regjistro Student',
    phoneNumber: 'Numri i Telefonit',
    sendInvite: 'Dërgo Ftesë',
    pendingInvites: 'Ftesa në Pritje',
    
    // Authentication & Profile
    welcome: 'Mirë se vini',
    welcomeUser: 'Mirë se vini, {name}',
    profile: 'Profili',
    name: 'Emri',
    role: 'Roli',
    school: 'Shkolla',
    student: 'Student',
    teacher: 'Mësues',
    notifications: 'Njoftimet',
    startUsing: 'Filloni ta përdorni',
    
    // Settings
    languageAndRegion: 'Gjuha dhe Rajoni',
    appLanguage: 'Gjuha e Aplikacionit',
    selectPreferredLanguage: 'Zgjidhni gjuhën tuaj të preferuar',
    pushNotifications: 'Njoftimet Push',
    receiveImportantNotifications: 'Merrni njoftime për ngjarje të rëndësishme',
    emailNotifications: 'Njoftimet me Email',
    receiveDailySummaries: 'Merrni përmbledhje ditore me email',
    smsReminders: 'Kujtues SMS',
    remindersBeforeClasses: 'Kujtues para orëve',
    appearanceAndTheme: 'Pamja dhe Tema',
    darkTheme: 'Tema e Errët',
    switchToDarkMode: 'Kalo në modalitetin e errët',
    compactView: 'Pamja Kompakte',
    showMoreContent: 'Shfaq më shumë përmbajtje në ekran',
    userProfile: 'Profili i Përdoruesit',
    classYear: 'Klasa/Viti',
    
    // General
    loading: 'Duke u ngarkuar...',
    error: 'Gabim',
    success: 'Sukses',
    add: 'Shto',
    
    // Days of the week
    monday: 'E hënë',
    tuesday: 'E martë',
    wednesday: 'E mërkurë',
    thursday: 'E enjte',
    friday: 'E premte',
    saturday: 'E shtunë',
    sunday: 'E diel',
    
    // Subjects (common ones)
    mathematics: 'Matematikë',
    history: 'Histori',
    biology: 'Biologji',
    physics: 'Fizikë',
    chemistry: 'Kimi',
    literature: 'Letërsi',
    geography: 'Gjeografi',
  },
};

export const useTranslation = () => {
  const [language, setLanguageState] = useState<keyof typeof translations>(() => {
    // Get language from localStorage or default to 'mk'
    const saved = localStorage.getItem('app-language');
    return (saved === 'mk' || saved === 'en' || saved === 'al') ? saved : 'mk';
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    // Handle parameter substitution (e.g., {name} -> actual name)
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, paramValue);
      });
    }
    
    return translation;
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
