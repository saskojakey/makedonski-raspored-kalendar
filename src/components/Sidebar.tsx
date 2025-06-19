
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, ChevronDown, Users, Menu, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Course } from '@/types';
import CourseDetailModal from './CourseDetailModal';

interface SidebarProps {
  courses: Course[];
  onCourseSelect: (courseId: string) => void;
  selectedCourseId: string | null;
  onAddStudentToCourse?: (courseId: string, studentId: string) => void;
}

const Sidebar = ({ courses, onCourseSelect, selectedCourseId, onAddStudentToCourse }: SidebarProps) => {
  const { t } = useTranslation();
  const [isCoursesOpen, setIsCoursesOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
    onCourseSelect(course.id);
  };

  const handleAddStudentToCourse = (courseId: string, studentId: string) => {
    if (onAddStudentToCourse) {
      onAddStudentToCourse(courseId, studentId);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between lg:justify-start">
          <h2 className="text-lg font-semibold text-gray-800">{t('navigation')}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card>
          <Collapsible open={isCoursesOpen} onOpenChange={setIsCoursesOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {t('courses')}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {courses.length}
                    </Badge>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 hover:shadow-sm ${
                        selectedCourseId === course.id 
                          ? 'bg-blue-50 border-blue-500' 
                          : 'bg-muted/20 hover:border-l-blue-300'
                      }`}
                      style={{ borderLeftColor: selectedCourseId === course.id ? course.color : '#e5e7eb' }}
                      onClick={() => handleCourseClick(course)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 mb-1">
                            {course.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {course.students.length} студенти
                            </span>
                          </div>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full ml-2 flex-shrink-0"
                          style={{ backgroundColor: course.color }}
                        />
                      </div>
                    </div>
                  ))}
                  {courses.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {t('noCourses')}
                    </p>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>

      <CourseDetailModal
        course={selectedCourse}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onAddStudent={handleAddStudentToCourse}
      />
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-white shadow-md"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 shadow-sm">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform">
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
