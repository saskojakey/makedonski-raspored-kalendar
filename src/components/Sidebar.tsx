
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Bell, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Course {
  id: string;
  name: string;
  description: string;
  color: string;
  students: string[];
}

interface SidebarProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  selectedCourseId?: string;
}

const Sidebar = ({ courses, onCourseSelect, selectedCourseId }: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-80 bg-gradient-to-b from-blue-50 to-green-50 p-6 overflow-y-auto border-r border-blue-200">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/lovable-uploads/fe60a9bb-9daf-411c-b439-53d4805a9306.png" 
            alt={t('appName')}
            className="h-8 w-8 rounded-lg"
          />
          <h2 className="text-lg font-semibold taskflow-text-gradient">
            {t('appName')}
          </h2>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            {t('courses')}
          </h2>
          <div className="space-y-2">
            {courses.map(course => (
              <Card 
                key={course.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-md border-2 hover:scale-102 ${
                  selectedCourseId === course.id 
                    ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50' 
                    : 'border-blue-200 hover:border-blue-300'
                }`}
                onClick={() => onCourseSelect(course.id)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: course.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-blue-900">{course.name}</h3>
                    <p className="text-xs text-blue-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      {course.students.length} {t('students')}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            {courses.length === 0 && (
              <div className="text-center py-8 bg-white/50 rounded-lg border border-blue-200">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-blue-600">
                  {t('noCoursesCreated')}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-green-700">
            <Clock className="h-4 w-4" />
            {t('thisWeek')}
          </h3>
          <div className="space-y-2">
            <div className="text-xs p-3 bg-white rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-3 w-3" />
                {t('monday')} - {t('mathematics')} (10:00)
              </div>
            </div>
            <div className="text-xs p-3 bg-white rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-3 w-3" />
                {t('wednesday')} - {t('history')} (14:00)
              </div>
            </div>
            <div className="text-xs p-3 bg-white rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-3 w-3" />
                {t('friday')} - {t('biology')} (11:30)
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-red-600">
            <Bell className="h-4 w-4" />
            {t('notifications')}
          </h3>
          <div className="space-y-2">
            <div className="text-xs p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-blue-500" />
                <span className="font-medium text-blue-700">Марко П.</span>
                <span className="text-blue-600">прифати покана за {t('mathematics')}</span>
              </div>
            </div>
            <div className="text-xs p-3 bg-green-50 rounded-lg border border-green-200 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span className="font-medium text-green-700">Ана С.</span>
                <span className="text-green-600">прифати покана за {t('history')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
