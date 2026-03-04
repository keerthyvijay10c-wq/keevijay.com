# Smart Civic Complaint Management System (SCCMS)

A modern, fully functional web application for managing civic complaints, built as a college mini project.

## Overview

SCCMS is a comprehensive platform that connects citizens with municipal authorities, enabling efficient reporting, tracking, and resolution of civic issues like potholes, garbage overflow, broken streetlights, and water leakage.

## Features

### Citizen Features
- **User Registration & Login** - Secure authentication system
- **Report Issues** - Submit complaints with:
  - Photo upload
  - GPS location auto-detection
  - Category selection (pothole, garbage, streetlight, etc.)
  - Detailed description
- **Track Complaints** - View all submitted complaints with real-time status
- **Notifications** - Receive updates when complaint status changes
- **Dashboard** - Visual tracking with status badges and progress indicators
- **Edit/Delete** - Manage pending complaints

### Admin Features
- **Admin Dashboard** - Comprehensive overview with:
  - Total complaints statistics
  - Status-wise breakdown (Received, In Progress, Resolved)
  - Category-wise analytics with charts
  - Resolution rate visualization
- **Complaint Management** -
  - View all submitted complaints
  - Filter by status and category
  - Assign to departments
  - Update status (Received → In Progress → Resolved)
  - Add resolution notes
- **Real-time Updates** - Changes trigger notifications to citizens

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Data Storage**: LocalStorage (for demo purposes)

## Demo Credentials

### Admin Account
- Email: `admin@sccms.com`
- Password: `admin123`

### Citizen Account
- Email: `citizen@example.com`
- Password: `citizen123`

Or register a new citizen account!

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── Select.tsx
│   ├── StatusBadge.tsx
│   └── Textarea.tsx
├── context/            # React Context for state management
│   └── AuthContext.tsx
├── pages/              # Application pages
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── SubmitComplaintPage.tsx
│   ├── CitizenDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── services/           # Business logic and data services
│   └── mockData.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and animations
```

## Key Features Explained

### Authentication System
- Secure login/register flow
- Role-based access (Citizen/Admin)
- Protected routes based on user role
- Session persistence using LocalStorage

### Complaint Lifecycle
1. **Received** - Complaint submitted by citizen
2. **In Progress** - Assigned to department, work started
3. **Resolved** - Issue fixed, resolution note added

### GPS Location
- Browser's Geolocation API integration
- Auto-fetch current location
- Fallback to manual address entry

### Photo Upload
- Support for image files (PNG, JPG)
- 5MB file size limit
- Client-side preview before submission
- Base64 encoding for storage

### Real-time Notifications
- Status change notifications
- Assignment notifications
- Resolution notifications
- Unread indicator

### Analytics Dashboard (Admin)
- Total complaints counter
- Status distribution
- Category-wise breakdown with bar charts
- Resolution rate with circular progress
- Filterable complaint list

## Design Highlights

- **Responsive Design** - Mobile-first approach, works on all devices
- **Modern UI** - Clean, professional interface with blue/green color scheme
- **Smooth Animations** - Fade-in, slide-up effects for better UX
- **Intuitive Navigation** - Sticky navbar with role-based menu items
- **Visual Feedback** - Status badges, progress bars, hover effects
- **Accessibility** - Semantic HTML, proper contrast ratios

## Future Enhancements

### AI Integration (Optional)
- Image recognition for auto-detecting issue type
- AI-based priority scoring
- Predictive maintenance analytics
- Sentiment analysis of complaints

### Database Integration
- Replace LocalStorage with Supabase
- Real-time updates with WebSockets
- Advanced analytics and reporting
- Historical data analysis

### Additional Features
- Email/SMS notifications
- Multi-language support
- Export reports (PDF/CSV)
- Mobile app (React Native)
- Public complaint map view
- Department-wise user accounts

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a college mini project. Feel free to fork and enhance!

## License

MIT License - Free to use for educational purposes

## Credits

Made with ❤️ by [Your College Name / Team Name]

## Screenshots

### Home Page
Modern landing page with hero section and feature highlights

### Citizen Dashboard
Track all your complaints with visual status indicators

### Admin Dashboard
Comprehensive analytics and complaint management interface

### Submit Complaint
Easy form with photo upload and GPS location detection

---

**Note**: This is a demonstration project using LocalStorage for data persistence. In a production environment, integrate with a proper backend database and authentication system.
