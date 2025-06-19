
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface WelcomeScreenProps {
  phoneNumber: string;
  onContinue: () => void;
}

const WelcomeScreen = ({ phoneNumber, onContinue }: WelcomeScreenProps) => {
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-red-50 p-4">
      <Card className="w-full max-w-md text-center animate-fade-in shadow-2xl border-0">
        <CardContent className="p-8 space-y-6">
          <div className="animate-bounce">
            <div className="relative mx-auto w-20 h-20">
              <img 
                src="/lovable-uploads/fe60a9bb-9daf-411c-b439-53d4805a9306.png" 
                alt={t('appName')}
                className="w-full h-full rounded-2xl shadow-lg"
              />
              <CheckCircle className="absolute -bottom-1 -right-1 h-8 w-8 text-green-500 bg-white rounded-full p-1 shadow-md" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t('appWelcome')}
            </h1>
            <p className="text-gray-600">
              {t('appSubtitle')}
            </p>
            <p className="text-sm text-gray-500">
              {phoneNumber}
            </p>
          </div>

          {showButton && (
            <Button
              onClick={onContinue}
              size="lg"
              className="w-full animate-pulse hover:animate-none hover:scale-105 transition-all duration-300 bg-gradient-to-r from-blue-500 via-blue-600 to-green-500 hover:from-blue-600 hover:via-blue-700 hover:to-green-600 shadow-lg"
            >
              {t('startUsing')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
