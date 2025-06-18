
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Bell } from 'lucide-react';
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
    <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t('courses')}
          </h2>
          <div className="space-y-2">
            {courses.map(course => (
              <Card 
                key={course.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedCourseId === course.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => onCourseSelect(course.id)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{course.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {course.students.length} студенти
                    </p>
                  </div>
                </div>
              </Card>
            ))}
            {courses.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Немате креирано курсеви
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t('thisWeek')}
          </h3>
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground p-2 bg-white rounded border">
              Понеделник - Математика (10:00)
            </div>
            <div className="text-xs text-muted-foreground p-2 bg-white rounded border">
              Среда - Историја (14:00)
            </div>
            <div className="text-xs text-muted-foreground p-2 bg-white rounded border">
              Петок - Биологија (11:30)
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Известувања
          </h3>
          <div className="space-y-2">
            <div className="text-xs p-2 bg-blue-50 rounded border border-blue-200">
              <span className="font-medium">Марко П.</span> прифати покана за Математика
            </div>
            <div className="text-xs p-2 bg-green-50 rounded border border-green-200">
              <span className="font-medium">Ана С.</span> прифати покана за Историја
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
