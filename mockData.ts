import { User, Complaint, Notification, ComplaintCategory } from '../types';

const STORAGE_KEYS = {
  USERS: 'sccms_users',
  COMPLAINTS: 'sccms_complaints',
  NOTIFICATIONS: 'sccms_notifications',
  CURRENT_USER: 'sccms_current_user',
};

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const defaultUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@sccms.com',
    fullName: 'Admin User',
    phone: '+91-9876543210',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'user-1',
    email: 'citizen@example.com',
    fullName: 'John Doe',
    phone: '+91-9876543211',
    role: 'citizen',
    createdAt: new Date('2024-01-15'),
  },
];

const defaultComplaints: Complaint[] = [
  {
    id: 'complaint-1',
    userId: 'user-1',
    userName: 'John Doe',
    title: 'Large pothole on Main Street',
    description: 'There is a large pothole near the traffic signal causing accidents.',
    category: 'pothole',
    status: 'in_progress',
    priority: 'high',
    latitude: 28.6139,
    longitude: 77.2090,
    locationAddress: 'Main Street, Near Traffic Signal, Delhi',
    imageUrl: 'https://images.pexels.com/photos/6200343/pexels-photo-6200343.jpeg?auto=compress&cs=tinysrgb&w=800',
    assignedDepartment: 'Road Maintenance',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-02'),
  },
  {
    id: 'complaint-2',
    userId: 'user-1',
    userName: 'John Doe',
    title: 'Overflowing garbage bin',
    description: 'The garbage bin has been overflowing for 3 days.',
    category: 'garbage',
    status: 'resolved',
    priority: 'medium',
    latitude: 28.6129,
    longitude: 77.2295,
    locationAddress: 'Park Avenue, Sector 12, Delhi',
    imageUrl: 'https://images.pexels.com/photos/3181031/pexels-photo-3181031.jpeg?auto=compress&cs=tinysrgb&w=800',
    resolutionNote: 'Garbage collected and bin cleaned.',
    assignedDepartment: 'Sanitation',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-03-01'),
    resolvedAt: new Date('2024-03-01'),
  },
];

export const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    saveToStorage(STORAGE_KEYS.USERS, defaultUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
    saveToStorage(STORAGE_KEYS.COMPLAINTS, defaultComplaints);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, []);
  }
};

export const getUsers = (): User[] => {
  return getFromStorage(STORAGE_KEYS.USERS, defaultUsers);
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  saveToStorage(STORAGE_KEYS.USERS, users);
};

export const getUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email === email);
};

export const getCurrentUser = (): User | null => {
  return getFromStorage(STORAGE_KEYS.CURRENT_USER, null);
};

export const setCurrentUser = (user: User | null): void => {
  saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
};

export const getComplaints = (): Complaint[] => {
  return getFromStorage(STORAGE_KEYS.COMPLAINTS, defaultComplaints);
};

export const saveComplaint = (complaint: Complaint): void => {
  const complaints = getComplaints();
  const existingIndex = complaints.findIndex(c => c.id === complaint.id);
  if (existingIndex >= 0) {
    complaints[existingIndex] = complaint;
  } else {
    complaints.push(complaint);
  }
  saveToStorage(STORAGE_KEYS.COMPLAINTS, complaints);
};

export const deleteComplaint = (id: string): void => {
  const complaints = getComplaints().filter(c => c.id !== id);
  saveToStorage(STORAGE_KEYS.COMPLAINTS, complaints);
};

export const getComplaintsByUserId = (userId: string): Complaint[] => {
  return getComplaints().filter(c => c.userId === userId);
};

export const getNotifications = (): Notification[] => {
  return getFromStorage(STORAGE_KEYS.NOTIFICATIONS, []);
};

export const saveNotification = (notification: Notification): void => {
  const notifications = getNotifications();
  notifications.unshift(notification);
  saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getNotifications();
  const notification = notifications.find(n => n.id === id);
  if (notification) {
    notification.isRead = true;
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
};

export const getNotificationsByUserId = (userId: string): Notification[] => {
  return getNotifications().filter(n => n.userId === userId);
};

export const createNotification = (userId: string, complaintId: string, message: string): void => {
  const notification: Notification = {
    id: `notification-${Date.now()}`,
    userId,
    complaintId,
    message,
    isRead: false,
    createdAt: new Date(),
  };
  saveNotification(notification);
};

export const getCategoryIcon = (category: ComplaintCategory): string => {
  const icons: Record<ComplaintCategory, string> = {
    pothole: '🕳️',
    garbage: '🗑️',
    streetlight: '💡',
    water_leakage: '💧',
    drainage: '🌊',
    road_damage: '🚧',
    other: '📋',
  };
  return icons[category];
};

export const getCategoryLabel = (category: ComplaintCategory): string => {
  const labels: Record<ComplaintCategory, string> = {
    pothole: 'Pothole',
    garbage: 'Garbage',
    streetlight: 'Street Light',
    water_leakage: 'Water Leakage',
    drainage: 'Drainage',
    road_damage: 'Road Damage',
    other: 'Other',
  };
  return labels[category];
};
