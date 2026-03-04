import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import {
  PlusCircle,
  MapPin,
  Calendar,
  Eye,
  Trash2,
  Bell,
  TrendingUp,
} from 'lucide-react';
import { Complaint } from '../types';
import {
  getComplaintsByUserId,
  deleteComplaint,
  getCategoryIcon,
  getCategoryLabel,
  getNotificationsByUserId,
  markNotificationAsRead,
} from '../services/mockData';

interface CitizenDashboardProps {
  onNavigate: (page: string) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user || user.role !== 'citizen') {
      onNavigate('home');
      return;
    }

    loadData();
  }, [user, onNavigate]);

  const loadData = () => {
    if (user) {
      const userComplaints = getComplaintsByUserId(user.id);
      setComplaints(userComplaints.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));

      const userNotifications = getNotificationsByUserId(user.id);
      setNotifications(userNotifications.slice(0, 5));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      deleteComplaint(id);
      loadData();
    }
  };

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const stats = {
    total: complaints.length,
    received: complaints.filter((c) => c.status === 'received').length,
    inProgress: complaints.filter((c) => c.status === 'in_progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Complaints</h1>
            <p className="text-gray-600">Track and manage your reported issues</p>
          </div>
          <Button
            onClick={() => onNavigate('submit')}
            className="mt-4 md:mt-0 flex items-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Report New Issue</span>
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slideUp">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Complaints</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.received}</div>
            <div className="text-sm text-gray-600">Received</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </Card>
        </div>

        {notifications.length > 0 && (
          <Card className="mb-8 animate-slideUp">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Recent Notifications</h2>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="space-y-4 animate-slideUp">
          {complaints.length === 0 ? (
            <Card className="text-center py-12">
              <TrendingUp className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Complaints Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by reporting an issue in your area
              </p>
              <Button onClick={() => onNavigate('submit')}>
                Report Your First Issue
              </Button>
            </Card>
          ) : (
            complaints.map((complaint) => (
              <Card key={complaint.id} hover className="transition-all duration-300">
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
                      <div className="mb-4">
                        <span className="text-sm font-medium text-gray-700">
                          Assigned to:{' '}
                        </span>
                        <span className="text-sm text-blue-600">
                          {complaint.assignedDepartment}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(complaint)}
                        className="flex items-center space-x-1"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </Button>
                      {complaint.status === 'received' && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(complaint.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {complaint.status === 'in_progress' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-2/3"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">66%</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Your complaint is being processed
                    </p>
                  </div>
                )}

                {complaint.status === 'resolved' && complaint.resolutionNote && (
                  <div className="mt-4 pt-4 border-t border-gray-200 bg-green-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                    <p className="text-sm font-medium text-green-900 mb-1">
                      Resolution Note:
                    </p>
                    <p className="text-sm text-green-800">{complaint.resolutionNote}</p>
                    {complaint.resolvedAt && (
                      <p className="text-xs text-green-700 mt-2">
                        Resolved on {new Date(complaint.resolvedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      {selectedComplaint && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Complaint Details"
          size="lg"
        >
          <div className="space-y-4">
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
              <StatusBadge status={selectedComplaint.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
              <p className="text-gray-900">
                {getCategoryIcon(selectedComplaint.category)}{' '}
                {getCategoryLabel(selectedComplaint.category)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
              <p className="text-gray-900">{selectedComplaint.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Location:</p>
              <p className="text-gray-900">{selectedComplaint.locationAddress}</p>
            </div>
            {selectedComplaint.assignedDepartment && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Assigned Department:
                </p>
                <p className="text-gray-900">{selectedComplaint.assignedDepartment}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Submitted On:</p>
              <p className="text-gray-900">
                {new Date(selectedComplaint.createdAt).toLocaleString()}
              </p>
            </div>
            {selectedComplaint.resolutionNote && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">
                  Resolution Note:
                </p>
                <p className="text-green-800">{selectedComplaint.resolutionNote}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
