
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, X } from 'lucide-react';

interface StudentSelectorProps {
  onSelectStudent: (studentId: string) => void;
  onClose: () => void;
  excludeStudents: string[];
}

const StudentSelector = ({ onSelectStudent, onClose, excludeStudents }: StudentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock student data - in a real app, this would come from your backend
  const allStudents = [
    'Александар Стојановски',
    'Милена Николовска',
    'Стефан Трајковски',
    'Ана Петровска',
    'Марко Димитриевски',
    'Елена Ристовска',
    'Никола Стефановски',
    'Ивана Јордановска',
    'Давид Митевски',
    'Сара Георгиевска'
  ];

  const availableStudents = allStudents.filter(student => 
    !excludeStudents.includes(student) &&
    student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Избери студент</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Пребарај студенти..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="max-h-60 overflow-y-auto space-y-2">
          {availableStudents.map((student, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onSelectStudent(student)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {student.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <span className="font-medium">{student}</span>
              </div>
              <Button size="sm" variant="ghost">
                <UserCheck className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {availableStudents.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              Нема пронајдени студенти
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentSelector;
