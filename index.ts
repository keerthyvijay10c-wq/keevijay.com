export type UserRole = 'citizen' | 'admin';

export type ComplaintCategory =
  | 'pothole'
  | 'garbage'
  | 'streetlight'
  | 'water_leakage'
  | 'drainage'
  | 'road_damage'
  | 'other';

export type ComplaintStatus = 'received' | 'in_progress' | 'resolved';

export type ComplaintPriority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  createdAt: Date;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  latitude?: number;
  longitude?: number;
  locationAddress?: string;
  imageUrl?: string;
  resolutionNote?: string;
  resolutionImageUrl?: string;
  assignedDepartment?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  complaintId: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  complaintId: string;
  adminId?: string;
  adminName?: string;
  action: string;
  details: Record<string, any>;
  createdAt: Date;
}

export interface ComplaintStats {
  total: number;
  received: number;
  inProgress: number;
  resolved: number;
  byCategory: Record<ComplaintCategory, number>;
}
