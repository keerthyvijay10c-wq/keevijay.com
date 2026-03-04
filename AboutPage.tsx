import React from 'react';
import { Card } from '../components/Card';
import {
  Target,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Award,
  Globe,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Target className="text-blue-600" size={32} />,
      title: 'Our Mission',
      description:
        'To create a transparent and efficient platform connecting citizens with municipal authorities for faster resolution of civic issues.',
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      title: 'Community Driven',
      description:
        'Empowering citizens to actively participate in improving their neighborhoods and communities.',
    },
    {
      icon: <TrendingUp className="text-purple-600" size={32} />,
      title: 'Data-Driven Insights',
      description:
        'Providing municipal authorities with analytics to identify patterns and allocate resources effectively.',
    },
    {
      icon: <Shield className="text-red-600" size={32} />,
      title: 'Secure & Reliable',
      description:
        'Your data is protected with enterprise-grade security and privacy measures.',
    },
  ];

  const benefits = [
    {
      icon: <Zap size={24} />,
      title: 'Quick Response',
      description: 'Issues are addressed faster with streamlined workflow',
    },
    {
      icon: <Heart size={24} />,
      title: 'Better Cities',
      description: 'Cleaner, safer, and more livable urban environments',
    },
    {
      icon: <Award size={24} />,
      title: 'Accountability',
      description: 'Transparent tracking ensures responsible governance',
    },
    {
      icon: <Globe size={24} />,
      title: 'Inclusive',
      description: 'Every citizen has a voice in civic improvement',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Complaints Resolved' },
    { value: '25,000+', label: 'Active Users' },
    { value: '100+', label: 'Municipal Partners' },
    { value: '95%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
            About SCCMS
          </h1>
          <p className="text-xl opacity-90 animate-slideUp">
            Smart Civic Complaint Management System is revolutionizing how citizens
            interact with municipal authorities to create better, cleaner cities.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe in the power of technology to bridge the gap between citizens
              and governance, making cities more responsive and livable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">Simple, efficient, and transparent</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Report Issue</h3>
              <p className="text-gray-600">
                Citizens report civic issues with photos and GPS location
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Assign & Track
              </h3>
              <p className="text-gray-600">
                Authorities assign complaints to departments and track progress
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Resolve</h3>
              <p className="text-gray-600">
                Issues are resolved and citizens receive updates and notifications
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} hover className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-3 text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Movement
          </h2>
          <p className="text-xl opacity-90">
            Be part of the change. Together, we can build smarter, cleaner, and more
            responsive cities for everyone.
          </p>
        </div>
      </section>
    </div>
  );
};
