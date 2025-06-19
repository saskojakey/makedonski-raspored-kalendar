
import React from 'react';
import Sidebar from '@/components/Sidebar';
import PhoneAuth from '@/components/PhoneAuth';
import WelcomeScreen from '@/components/WelcomeScreen';
import ProfilePage from '@/components/ProfilePage';
import NotificationCenter from '@/components/NotificationCenter';
import QuickNav from '@/components/QuickNav';
import AppHeader from '@/components/AppHeader';
import MainContent from '@/components/MainContent';
import { useTranslation } from '@/hooks/useTranslation';
import { useAppState } from '@/hooks/useAppState';

const Index = () => {
  const { t, language, setLanguage } = useTranslation();
  const {
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
    handleAuthSuccess,
    handleWelcomeContinue,
    handleCreateCourse,
    handleNavigate,
    handleUpdateProfile,
    setSelectedCourseId,
    setShowCourseForm
  } = useAppState();

  const handleAddStudentToCourse = (courseId: string, studentId: string) => {
    // Mock implementation - in a real app, this would update the backend
    console.log(`Adding student ${studentId} to course ${courseId}`);
    // You can implement the actual logic here based on your state management
  };

  const handleRemoveStudentFromCourse = (courseId: string, studentId: string) => {
    // Mock implementation - in a real app, this would update the backend
    console.log(`Removing student ${studentId} from course ${courseId}`);
    // You can implement the actual logic here based on your state management
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
        onBack={() => handleNavigate('calendar')}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    );
  }

  // Notifications view
  if (currentView === 'notifications') {
    return <NotificationCenter onBack={() => handleNavigate('calendar')} />;
  }

  // Settings view is now handled in MainContent

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        courses={courses}
        onCourseSelect={setSelectedCourseId}
        selectedCourseId={selectedCourseId}
        onAddStudentToCourse={handleAddStudentToCourse}
      />
      
      <div className="flex-1 flex flex-col">
        <AppHeader
          userProfile={userProfile}
          language={language}
          unreadNotifications={unreadNotifications}
          onLanguageChange={setLanguage}
          onNavigate={handleNavigate}
        />

        <main className="flex-1 p-6">
          <MainContent
            showCourseForm={showCourseForm}
            currentView={currentView}
            events={events}
            todayEvents={todayEvents}
            courses={courses}
            userProfile={userProfile}
            language={language}
            onCreateCourse={handleCreateCourse}
            onCreateEvent={() => setShowCourseForm(true)}
            onCancelCourseForm={() => setShowCourseForm(false)}
            onNavigate={handleNavigate}
            onLanguageChange={setLanguage}
            onAddStudentToCourse={handleAddStudentToCourse}
            onRemoveStudentFromCourse={handleRemoveStudentFromCourse}
          />
        </main>

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
