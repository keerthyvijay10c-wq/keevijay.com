import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import {
  BarChart3,
  MapPin,
  Calendar,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Filter,
} from 'lucide-react';
import { Complaint, ComplaintCategory, ComplaintStatus } from '../types';
import {
  getComplaints,
  saveComplaint,
  getCategoryIcon,
  getCategoryLabel,
  createNotification,
} from '../services/mockData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [updateForm, setUpdateForm] = useState({
    status: 'received' as ComplaintStatus,
    assignedDepartment: '',
    resolutionNote: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      onNavigate('home');
      return;
    }

    loadComplaints();
  }, [user, onNavigate]);

  useEffect(() => {
    applyFilters();
  }, [complaints, filterStatus, filterCategory]);

  const loadComplaints = () => {
    const allComplaints = getComplaints();
    setComplaints(allComplaints.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  const applyFilters = () => {
    let filtered = [...complaints];

    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((c) => c.category === filterCategory);
    }

    setFilteredComplaints(filtered);
  };

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setUpdateForm({
      status: complaint.status,
      assignedDepartment: complaint.assignedDepartment || '',
      resolutionNote: complaint.resolutionNote || '',
    });
    setShowModal(true);
  };

  const handleUpdateComplaint = () => {
    if (!selectedComplaint) return;

    const oldStatus = selectedComplaint.status;
    const updatedComplaint: Complaint = {
      ...selectedComplaint,
      status: updateForm.status,
      assignedDepartment: updateForm.assignedDepartment,
      resolutionNote: updateForm.resolutionNote,
      updatedAt: new Date(),
      resolvedAt: updateForm.status === 'resolved' ? new Date() : selectedComplaint.resolvedAt,
    };

    saveComplaint(updatedComplaint);

    if (oldStatus !== updateForm.status) {
      const statusMessages = {
        received: 'Your complaint has been received and is under review.',
        in_progress: 'Your complaint is now being processed.',
        resolved: 'Your complaint has been resolved. Thank you for your patience.',
      };

      createNotification(
        selectedComplaint.userId,
        selectedComplaint.id,
        `Status Update: ${statusMessages[updateForm.status]}`
      );
    }

    loadComplaints();
    setShowModal(false);
  };

  const stats = {
    total: complaints.length,
    received: complaints.filter((c) => c.status === 'received').length,
    inProgress: complaints.filter((c) => c.status === 'in_progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  const categoryStats = complaints.reduce((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] || 0) + 1;
    return acc;
  }, {} as Record<ComplaintCategory, number>);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'received', label: 'Received' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'pothole', label: '🕳️ Pothole' },
    { value: 'garbage', label: '🗑️ Garbage' },
    { value: 'streetlight', label: '💡 Street Light' },
    { value: 'water_leakage', label: '💧 Water Leakage' },
    { value: 'drainage', label: '🌊 Drainage' },
    { value: 'road_damage', label: '🚧 Road Damage' },
    { value: 'other', label: '📋 Other' },
  ];

  const updateStatusOptions = [
    { value: 'received', label: 'Received' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and resolve civic complaints efficiently</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slideUp">
          <Card className="text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <AlertCircle className="mx-auto mb-2" size={32} />
            <div className="text-3xl font-bold mb-1">{stats.total}</div>
            <div className="text-sm opacity-90">Total Complaints</div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <Clock className="mx-auto mb-2" size={32} />
            <div className="text-3xl font-bold mb-1">{stats.received}</div>
            <div className="text-sm opacity-90">Received</div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <BarChart3 className="mx-auto mb-2" size={32} />
            <div className="text-3xl font-bold mb-1">{stats.inProgress}</div>
            <div className="text-sm opacity-90">In Progress</div>
          </Card>
          <Card className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CheckCircle className="mx-auto mb-2" size={32} />
            <div className="text-3xl font-bold mb-1">{stats.resolved}</div>
            <div className="text-sm opacity-90">Resolved</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8 animate-slideUp">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="text-blue-600" />
              <span>Complaints by Category</span>
            </h2>
            <div className="space-y-3">
              {Object.entries(categoryStats)
                .sort(([, a], [, b]) => b - a)
                .map(([category, count]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {getCategoryIcon(category as ComplaintCategory)}{' '}
                        {getCategoryLabel(category as ComplaintCategory)}
                      </span>
                      <span className="text-sm font-bold text-gray-900">{count}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <BarChart3 className="text-green-600" />
              <span>Resolution Rate</span>
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 56 * (1 - stats.resolved / stats.total)
                      }`}
                      className="text-green-600 transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold text-gray-900">
                    {stats.total > 0
                      ? Math.round((stats.resolved / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="font-bold text-blue-600">{stats.received}</div>
                  <div className="text-gray-600">Pending</div>
                </div>
                <div className="bg-yellow-50 p-2 rounded">
                  <div className="font-bold text-yellow-600">{stats.inProgress}</div>
                  <div className="text-gray-600">Active</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-gray-600">Done</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-6 animate-slideUp">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="text-gray-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            />
            <Select
              label="Category"
              options={categoryOptions}
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
          </div>
        </Card>

        <div className="space-y-4 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-900">
            All Complaints ({filteredComplaints.length})
          </h2>
          {filteredComplaints.length === 0 ? (
            <Card className="text-center py-12">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Complaints Found
              </h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card key={complaint.id} hover>
                <div className="flex flex-col md:flex-row gap-4">
                  {complaint.imageUrl && (
                    <img
                      src={complaint.imageUrl}
                      alt={complaint.title}
                      className="w-full md:w-48 h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">
                            {getCategoryIcon(complaint.category)}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900">
                            {complaint.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {complaint.description}
                        </p>
                      </div>
                      <StatusBadge status={complaint.status} />
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Reported by:</span>
                        <span>{complaint.userName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{complaint.locationAddress}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {complaint.assignedDepartment && (
                      <div className="mb-4 flex items-center space-x-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                          {complaint.assignedDepartment}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          complaint.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : complaint.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {complaint.priority.toUpperCase()} Priority
                        </span>
                      </div>
                    )}

                    <Button
                      size="sm"
                      onClick={() => handleViewDetails(complaint)}
                      className="flex items-center space-x-1"
                    >
                      <Eye size={16} />
                      <span>Manage Complaint</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {selectedComplaint && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Manage Complaint"
          size="lg"
        >
          <div className="space-y-6">
            {selectedComplaint.imageUrl && (
              <img
                src={selectedComplaint.imageUrl}
                alt={selectedComplaint.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedComplaint.title}
              </h3>
              <p className="text-gray-600">{selectedComplaint.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
                <p className="text-gray-900">
                  {getCategoryIcon(selectedComplaint.category)}{' '}
                  {getCategoryLabel(selectedComplaint.category)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Reported By:</p>
                <p className="text-gray-900">{selectedComplaint.userName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Location:</p>
                <p className="text-gray-900">{selectedComplaint.locationAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Submitted:</p>
                <p className="text-gray-900">
                  {new Date(selectedComplaint.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Update Complaint</h4>
              <div className="space-y-4">
                <Select
                  label="Status"
                  options={updateStatusOptions}
                  value={updateForm.status}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      status: e.target.value as ComplaintStatus,
                    })
                  }
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign Department
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Road Maintenance, Sanitation"
                    value={updateForm.assignedDepartment}
                    onChange={(e) =>
                      setUpdateForm({
                        ...updateForm,
                        assignedDepartment: e.target.value,
                      })
                    }
                  />
                </div>

                <Textarea
                  label="Resolution Note"
                  placeholder="Enter resolution details or updates..."
                  rows={4}
                  value={updateForm.resolutionNote}
                  onChange={(e) =>
                    setUpdateForm({
                      ...updateForm,
                      resolutionNote: e.target.value,
                    })
                  }
                />

                <div className="flex gap-3">
                  <Button variant="outline" fullWidth onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button fullWidth onClick={handleUpdateComplaint}>
                    Update Complaint
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
