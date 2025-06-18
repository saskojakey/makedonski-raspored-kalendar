
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  phoneNumber: string;
  onContinue: () => void;
}

const WelcomeScreen = ({ phoneNumber, onContinue }: WelcomeScreenProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md text-center animate-fade-in">
        <CardContent className="p-8 space-y-6">
          <div className="animate-bounce">
            <Sparkles className="h-16 w-16 text-emerald-500 mx-auto" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Добредојдовте! 🎉
            </h1>
            <p className="text-gray-600">
              Вашиот училишен календар е подготвен
            </p>
            <p className="text-sm text-gray-500">
              {phoneNumber}
            </p>
          </div>

          {showButton && (
            <Button
              onClick={onContinue}
              size="lg"
              className="w-full animate-pulse hover:animate-none hover:scale-105 transition-all duration-300 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              Почни да го користиш
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
