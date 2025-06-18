
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Users, UserPlus, X } from 'lucide-react';
import { Course } from '@/types';
import StudentSelector from './StudentSelector';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (courseId: string, studentId: string) => void;
}

const CourseDetailModal = ({ course, isOpen, onClose, onAddStudent }: CourseDetailModalProps) => {
  const [isTeachersOpen, setIsTeachersOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(true);
  const [showStudentSelector, setShowStudentSelector] = useState(false);

  if (!course) return null;

  const handleAddStudent = (studentId: string) => {
    onAddStudent(course.id, studentId);
    setShowStudentSelector(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: course.color }}
              />
              {course.name}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Опис на курсот</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.description}</p>
            </CardContent>
          </Card>

          <Card>
            <Collapsible open={isTeachersOpen} onOpenChange={setIsTeachersOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Наставници
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isTeachersOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        МП
                      </div>
                      <div>
                        <p className="font-medium">Марија Петровска</p>
                        <p className="text-sm text-muted-foreground">Главен наставник</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          <Card>
            <Collapsible open={isStudentsOpen} onOpenChange={setIsStudentsOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Студенти ({course.students.length})
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isStudentsOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {course.students.map((student, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {student.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{student}</p>
                          <p className="text-sm text-muted-foreground">Студент</p>
                        </div>
                      </div>
                    ))}
                    {course.students.length === 0 && (
                      <p className="text-muted-foreground text-center py-4">
                        Нема запишани студенти
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => setShowStudentSelector(true)}
                    className="w-full"
                    variant="outline"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Додај студент
                  </Button>
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
