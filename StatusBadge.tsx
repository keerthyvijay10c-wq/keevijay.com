import React from 'react';
import { ComplaintStatus } from '../types';

interface StatusBadgeProps {
  status: ComplaintStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    received: {
      label: 'Received',
      className: 'bg-blue-100 text-blue-800',
    },
    in_progress: {
      label: 'In Progress',
      className: 'bg-yellow-100 text-yellow-800',
    },
    resolved: {
      label: 'Resolved',
      className: 'bg-green-100 text-green-800',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
};
