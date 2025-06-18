
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Course {
  id: string;
  name: string;
  description: string;
  color: string;
  students: string[];
}

interface CourseFormProps {
  onSave: (course: Omit<Course, 'id'>) => void;
  onCancel: () => void;
}

const predefinedColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
];

const CourseForm = ({ onSave, onCancel }: CourseFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: predefinedColors[0],
    students: [] as string[],
  });
  const [newStudentPhone, setNewStudentPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  const addStudent = () => {
    if (newStudentPhone.trim() && !formData.students.includes(newStudentPhone)) {
      setFormData(prev => ({
        ...prev,
        students: [...prev.students, newStudentPhone.trim()]
      }));
      setNewStudentPhone('');
    }
  };

  const removeStudent = (phone: string) => {
    setFormData(prev => ({
      ...prev,
      students: prev.students.filter(s => s !== phone)
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t('createCourse')}
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="courseName">{t('courseName')}</Label>
            <Input
              id="courseName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Математика, Историја, Биологија..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseDescription">{t('courseDescription')}</Label>
            <Textarea
              id="courseDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Опис на курсот..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>{t('selectColor')}</Label>
            <div className="flex gap-2 flex-wrap">
              {predefinedColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>{t('addStudents')}</Label>
            <div className="flex gap-2">
              <Input
                value={newStudentPhone}
                onChange={(e) => setNewStudentPhone(e.target.value)}
                placeholder="+389 XX XXX XXX"
                type="tel"
              />
              <Button type="button" onClick={addStudent} variant="outline">
                {t('sendInvite')}
              </Button>
            </div>
            
            {formData.students.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">{t('pendingInvites')}</Label>
                <div className="space-y-2">
                  {formData.students.map(phone => (
                    <div key={phone} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{phone}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStudent(phone)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {t('save')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              {t('cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
