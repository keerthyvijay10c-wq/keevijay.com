import React from 'react';
import { AlertCircle, MapPin, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const features = [
    {
      icon: <AlertCircle className="w-8 h-8 text-blue-600" />,
      title: 'Easy Reporting',
      description: 'Report civic issues with photos and GPS location in just a few clicks.',
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      title: 'Live Tracking',
      description: 'Track your complaint status in real-time from submission to resolution.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-600" />,
      title: 'Analytics Dashboard',
      description: 'Municipal authorities get detailed insights and analytics for better management.',
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security measures.',
    },
  ];

  const issueTypes = [
    { emoji: '🕳️', label: 'Potholes' },
    { emoji: '🗑️', label: 'Garbage' },
    { emoji: '💡', label: 'Street Lights' },
    { emoji: '💧', label: 'Water Leakage' },
    { emoji: '🌊', label: 'Drainage' },
    { emoji: '🚧', label: 'Road Damage' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fadeIn">
            Smart Civic Complaint
            <br />
            Management System
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 animate-fadeIn">
            Empowering Citizens for a Smarter, Cleaner City
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp">
            {user ? (
              user.role === 'citizen' ? (
                <Button
                  size="lg"
                  onClick={() => onNavigate('submit')}
                  className="flex items-center space-x-2"
                >
                  <span>Report an Issue</span>
                  <ArrowRight size={20} />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => onNavigate('admin-dashboard')}
                  className="flex items-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight size={20} />
                </Button>
              )
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => onNavigate('register')}
                  className="flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Report Issues, Track Progress
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Citizens can easily report various civic issues while municipal authorities can
            efficiently manage and resolve them
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {issueTypes.map((type, index) => (
              <Card
                key={index}
                hover
                className="text-center cursor-pointer"
              >
                <div className="text-4xl mb-2">{type.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{type.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose SCCMS?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your City Better?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens working together for a cleaner, smarter city
          </p>
          {!user && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('register')}
              className="bg-white text-blue-600 hover:bg-gray-100 border-0"
            >
              Register Now
            </Button>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">1000+</div>
              <div className="text-gray-400">Issues Resolved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">5000+</div>
              <div className="text-gray-400">Active Citizens</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-400">Municipal Departments</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
