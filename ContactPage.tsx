import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: 'Email',
      content: 'support@sccms.com',
      link: 'mailto:support@sccms.com',
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: 'Phone',
      content: '+91-1800-123-4567',
      link: 'tel:+911800123456 7',
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      title: 'Address',
      content: 'Municipal Office, City Hall, Your City, PIN 123456',
      link: '#',
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, name: 'Facebook', link: '#' },
    { icon: <Twitter size={20} />, name: 'Twitter', link: '#' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', link: '#' },
    { icon: <Instagram size={20} />, name: 'Instagram', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12 animate-slideUp">
            {contactInfo.map((info, index) => (
              <Card key={index} hover className="text-center">
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <a
                  href={info.link}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {info.content}
                </a>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 animate-slideUp">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />

                  <Input
                    label="Subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />

                  <Button type="submit" fullWidth className="flex items-center justify-center space-x-2">
                    <Send size={18} />
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </Card>

            <div className="space-y-8">
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How do I report a complaint?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Register for an account, login, and click "Report an Issue" to
                      submit your civic complaint with photos and location.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How long does it take to resolve issues?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Resolution time varies based on the issue complexity. You'll receive
                      status updates throughout the process.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Is my data secure?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Yes, we use enterprise-grade security measures to protect your
                      personal information and complaint data.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Can I track my complaint status?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Absolutely! Your dashboard provides real-time tracking from
                      submission to resolution with notifications.
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow Us
                </h2>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for updates and community news.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            Made with love by Your College Team
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2024 SCCMS. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};
