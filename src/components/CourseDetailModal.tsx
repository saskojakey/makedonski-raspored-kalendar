
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Users, UserPlus, X, UserMinus, GraduationCap } from 'lucide-react';
import { Course } from '@/types';
import StudentSelector from './StudentSelector';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (courseId: string, studentId: string) => void;
  onRemoveStudent?: (courseId: string, studentId: string) => void;
}

const CourseDetailModal = ({ course, isOpen, onClose, onAddStudent, onRemoveStudent }: CourseDetailModalProps) => {
  const [isTeachersOpen, setIsTeachersOpen] = useState(true);
  const [isStudentsOpen, setIsStudentsOpen] = useState(true);
  const [showStudentSelector, setShowStudentSelector] = useState(false);

  if (!course) return null;

  const handleAddStudent = (studentId: string) => {
    onAddStudent(course.id, studentId);
    setShowStudentSelector(false);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (onRemoveStudent) {
      onRemoveStudent(course.id, studentId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div 
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: course.color }}
              />
              <span className="truncate">{course.name}</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="flex-shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 p-1">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Опис на курсот
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <Collapsible open={isTeachersOpen} onOpenChange={setIsTeachersOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Наставници
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isTeachersOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                        МП
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Марија Петровска</p>
                        <p className="text-sm text-blue-600 font-medium">Главен наставник</p>
                        <p className="text-xs text-gray-500">marija.petrovska@email.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <Card className="shadow-sm">
            <Collapsible open={isStudentsOpen} onOpenChange={setIsStudentsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Студенти ({course.students.length})
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isStudentsOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-4">
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {course.students.map((student, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-sm transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
                            {student.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{student}</p>
                            <p className="text-sm text-green-600">Студент</p>
                          </div>
                        </div>
                        {onRemoveStudent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveStudent(student)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <UserMinus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {course.students.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-muted-foreground">Нема запишани студенти</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t pt-4">
                    <Button 
                      onClick={() => setShowStudentSelector(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-sm"
                      size="lg"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Додај нов студент
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {showStudentSelector && (
            <StudentSelector
              onSelectStudent={handleAddStudent}
              onClose={() => setShowStudentSelector(false)}
              excludeStudents={course.students}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
