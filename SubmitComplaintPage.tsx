import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { MapPin, Upload, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { Complaint, ComplaintCategory } from '../types';
import { saveComplaint, createNotification } from '../services/mockData';

interface SubmitComplaintPageProps {
  onNavigate: (page: string) => void;
}

export const SubmitComplaintPage: React.FC<SubmitComplaintPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'pothole' as ComplaintCategory,
    locationAddress: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'citizen') {
      onNavigate('home');
    }
  }, [user, onNavigate]);

  const categoryOptions = [
    { value: 'pothole', label: '🕳️ Pothole' },
    { value: 'garbage', label: '🗑️ Garbage' },
    { value: 'streetlight', label: '💡 Street Light' },
    { value: 'water_leakage', label: '💧 Water Leakage' },
    { value: 'drainage', label: '🌊 Drainage' },
    { value: 'road_damage', label: '🚧 Road Damage' },
    { value: 'other', label: '📋 Other' },
  ];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setGettingLocation(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setFormData({
          ...formData,
          locationAddress: `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`,
        });
        setGettingLocation(false);
      },
      (error) => {
        setError('Unable to get your location. Please enter address manually.');
        setGettingLocation(false);
      }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const newComplaint: Complaint = {
      id: `complaint-${Date.now()}`,
      userId: user!.id,
      userName: user!.fullName,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'received',
      priority: 'medium',
      latitude: location?.lat,
      longitude: location?.lng,
      locationAddress: formData.locationAddress || 'Location not provided',
      imageUrl: imagePreview || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveComplaint(newComplaint);
    createNotification(
      user!.id,
      newComplaint.id,
      `Your complaint "${formData.title}" has been submitted successfully and is being reviewed.`
    );

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      onNavigate('dashboard');
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="max-w-md text-center animate-slideUp">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your complaint has been registered successfully. You will be notified once it's
            assigned to a department.
          </p>
          <Button onClick={() => onNavigate('dashboard')}>View My Complaints</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Report an Issue</h1>
          <p className="text-gray-600">Help us make your city better by reporting civic issues</p>
        </div>

        <Card className="animate-slideUp">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Input
              label="Issue Title"
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Select
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value as ComplaintCategory })
              }
              required
            />

            <Textarea
              label="Detailed Description"
              placeholder="Describe the issue in detail..."
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter address or use GPS"
                  value={formData.locationAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, locationAddress: e.target.value })
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={gettingLocation}
                  className="flex items-center space-x-2"
                >
                  <MapPin size={18} />
                  <span className="hidden sm:inline">
                    {gettingLocation ? 'Getting...' : 'GPS'}
                  </span>
                </Button>
              </div>
              {location && (
                <p className="mt-2 text-sm text-green-600 flex items-center space-x-1">
                  <CheckCircle size={16} />
                  <span>Location captured successfully</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo/Video (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setImagePreview('')}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Camera className="mx-auto text-gray-400 mb-2" size={40} />
                    <p className="text-gray-600 mb-1">Click to upload an image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => onNavigate('dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
