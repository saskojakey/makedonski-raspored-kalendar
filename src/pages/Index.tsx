
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

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        courses={courses}
        onCourseSelect={setSelectedCourseId}
        selectedCourseId={selectedCourseId}
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
            onCreateCourse={handleCreateCourse}
            onCreateEvent={() => setShowCourseForm(true)}
            onCancelCourseForm={() => setShowCourseForm(false)}
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
