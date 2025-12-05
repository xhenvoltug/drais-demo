# DRAIS - Digital Resource & Academic Information System

![DRAIS Banner](./public/og-image-default.png)

<div align="center">

**The Most Comprehensive School Management System in East Africa**

[![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-Proprietary-red)](LICENSE)

[Features](#features) • [Quick Start](#quick-start) • [Database](#database-schema) • [Documentation](#documentation) • [Support](#support)

</div>

---

## 🌟 Overview

DRAIS is an AI-powered, cloud-based school management system designed for modern educational institutions. Trusted by 23+ schools across Uganda, Kenya, and Tanzania, DRAIS streamlines every aspect of school administration from admissions to graduation.

### ✨ Key Highlights

- 🎯 **Complete School Management** - Students, staff, fees, exams, attendance, library, and more
- 🤖 **AI-Powered Insights** - Predictive analytics, performance forecasting, and smart recommendations
- 🏢 **Multi-Tenant Architecture** - Support multiple schools from a single deployment
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🌙 **Dark Mode Support** - Comfortable viewing in any lighting condition
- 🔒 **Enterprise Security** - Role-based access control, audit logs, and data encryption
- 🌍 **Localization** - Support for multiple languages and regional settings

---

## 🚀 Features

### 📚 Core Modules

#### Academic Management
- **Student Management** - Complete student records, admissions, transfers, and alumni tracking
- **Class & Section Management** - Organize students into classes and sections
- **Subject Management** - Define subjects, syllabus, and curriculum
- **Examination System** - Create exams, record marks, generate report cards
- **Timetable Management** - Automated timetable generation with conflict detection

#### Staff & HR
- **Employee Records** - Complete staff profiles with qualifications and documents
- **Payroll Management** - Automated salary processing with allowances and deductions
- **Leave Management** - Leave applications, approvals, and balance tracking
- **Performance Appraisal** - Staff evaluation and feedback system
- **Attendance Tracking** - Biometric integration for staff attendance

#### Financial Management
- **Fee Management** - Fee structures, collections, discounts, and scholarships
- **Payment Processing** - Mobile money (MTN, Airtel), bank transfers, cash
- **Expense Tracking** - Record and categorize school expenses
- **Budget Management** - Budget planning and variance analysis
- **Accounting** - Chart of accounts, journal entries, financial statements

#### Learning Management (LMS)
- **Course Management** - Create and organize courses with learning outcomes
- **Lesson Planning** - Digital lesson plans with resources
- **Assignments** - Create, submit, and grade assignments online
- **Online Quizzes** - Auto-graded quizzes with instant feedback
- **Grade Book** - Comprehensive grade tracking and progress reports

#### Communication
- **Messaging System** - Internal messaging for staff, students, and parents
- **SMS Notifications** - Automated SMS for fees, attendance, and announcements
- **Email Integration** - Bulk emails with templates
- **Parent Portal** - Real-time updates on student performance and activities
- **Notifications** - Push notifications for important events

#### Operations
- **Library Management** - Catalog books, track borrowing, manage returns
- **Transport Management** - Routes, stops, student assignments, and tracking
- **Inventory Management** - Stock control for school supplies and equipment
- **Event Management** - School calendar, event planning, and participant tracking
- **Reports & Analytics** - 100+ pre-built reports with export options

### 🤖 AI Features

- **Student Performance Prediction** - Identify at-risk students early
- **Attendance Trend Analysis** - Pattern recognition for absenteeism
- **Fee Collection Forecasting** - Predict cash flow and defaults
- **AI Copilot** - Natural language queries for instant insights
- **Smart Recommendations** - Personalized suggestions for teachers and administrators

---

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MySQL 8.0+ or MariaDB 10.5+
- (Optional) Redis for caching and sessions

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xhenvolt/drais.git
   cd drais
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/drais"
   
   # Application
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Email (Optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   
   # SMS (Optional)
   SMS_API_KEY="your-sms-api-key"
   
   # Payment Gateways (Optional)
   MTN_MOMO_API_KEY="your-mtn-key"
   AIRTEL_MONEY_API_KEY="your-airtel-key"
   ```

4. **Set up the database**
   ```bash
   # Import base schema
   mysql -u your_user -p your_database < database_schema_alterations_v0.1.01.sql
   mysql -u your_user -p your_database < database_schema_new_tables_v0.1.01.sql
   
   # Import module expansion schema
   mysql -u your_user -p your_database < database_schema_modules_complete_v0.2.00.sql
   ```

5. **Generate favicons and OG images**
   ```bash
   npm run generate:favicons
   npm run generate:og-images
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Credentials

After database setup, use these credentials to log in:

- **Super Admin**: `superadmin@drais.com` / `SuperAdmin@123`
- **School Admin**: `admin@school.com` / `Admin@123`
- **Teacher**: `teacher@school.com` / `Teacher@123`

⚠️ **Important**: Change these default passwords immediately in production!

---

## 🗄️ Database Schema

DRAIS uses a comprehensive, multi-tenant database architecture designed for scalability and performance.

### Schema Files

1. **`database_schema_alterations_v0.1.01.sql`** (~450 lines)
   - Multi-tenancy foundation (school, user tables)
   - Existing table modifications (ALTER TABLE statements)
   - Roles & permissions system (RBAC)
   - Academic structure (terms, sections, subjects)
   - Initial data seeding

2. **`database_schema_new_tables_v0.1.01.sql`** (~850 lines)
   - Attendance management (students & staff)
   - Fee management (structures, payments, accounts)
   - Communication (notifications, messages, SMS/email logs)
   - Library (books, transactions, fines)
   - Events (calendar, participants)
   - Timetables
   - Transport (routes, stops, assignments)
   - Examinations (schedules, results)
   - Certificates (templates, issued certificates)
   - Plugins
   - Reports & analytics
   - File uploads

3. **`database_schema_modules_complete_v0.2.00.sql`** (NEW - 700+ lines)
   - Complete fee management (categories, discounts, payment plans, reminders)
   - HR management (staff records, payroll, leave, appraisals)
   - Learning Management System (courses, lessons, assignments, quizzes)
   - Inventory management (items, stock movements, purchase orders)
   - Finance management (chart of accounts, journal entries, expenses, budgets)

### Key Features

- **Multi-Tenancy**: Every table includes `school_id` for data isolation
- **Soft Deletes**: `deleted_at` timestamp for data recovery
- **Audit Trail**: Complete tracking of who did what and when
- **Computed Columns**: Automatic calculations (balances, percentages, etc.)
- **Indexes**: Strategic indexing for optimal query performance
- **Constraints**: Foreign keys, unique constraints, and data integrity rules

---

## 📖 Documentation

### API Documentation
- Coming soon: Comprehensive API documentation with examples

### User Guides
- **Administrator Guide**: Complete system administration guide
- **Teacher Guide**: How to use DRAIS as a teacher
- **Parent Guide**: Accessing the parent portal

### Developer Documentation
- **Architecture Overview**: System design and patterns
- **Component Library**: Reusable UI components
- **Database Schema**: Detailed table relationships
- **API Reference**: RESTful API endpoints

---

## 🎨 Tech Stack

### Frontend
- **Next.js 16.0.6** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.x** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion 12.23.25** - Animations
- **lucide-react** - Icon library
- **shadcn/ui** - Component primitives

### Backend
- **Next.js API Routes** - Serverless functions
- **MySQL/MariaDB** - Primary database
- **Prisma** (Planned) - ORM and database toolkit
- **NextAuth.js** (Planned) - Authentication

### Integrations
- **Sharp** - Image processing
- **React Hot Toast** - Toast notifications
- **Mobile Money APIs** - MTN MoMo, Airtel Money
- **SMS Gateways** - Africa's Talking, Twilio
- **Email Services** - SMTP, SendGrid, Mailgun

---

## 🔒 Security

- **Role-Based Access Control (RBAC)** - 19 default permissions, 5 system roles
- **Two-Factor Authentication (2FA)** - Optional 2FA for users
- **Password Hashing** - bcrypt with salt
- **Audit Logging** - Complete activity tracking
- **Session Management** - Secure session handling
- **Data Encryption** - Sensitive data encryption at rest
- **SQL Injection Prevention** - Prepared statements
- **XSS Protection** - Input sanitization

---

## 📊 SEO & Performance

### SEO Features
- ✅ **Comprehensive Metadata** - Title, description, keywords for all pages
- ✅ **Open Graph Tags** - Rich social media previews
- ✅ **Twitter Cards** - Optimized Twitter sharing
- ✅ **JSON-LD Schema** - Organization and SoftwareApplication structured data
- ✅ **Dynamic Sitemap** - Auto-generated XML sitemap
- ✅ **Robots.txt** - Crawler instructions
- ✅ **Favicons** - SVG + PNG variants for all platforms
- ✅ **PWA Manifest** - Mobile app installation support
- ✅ **Canonical URLs** - Prevent duplicate content

### Performance Optimizations
- Server-side rendering (SSR)
- Static generation where possible
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Font optimization with next/font
- CSS optimization with Tailwind JIT

---

## 🌍 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

Copyright © 2025 Xhenvolt Uganda Limited. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 🆘 Support

### Get Help
- 📧 Email: support@xhenvolt.com
- 🌐 Website: [https://xhenvolt.com](https://xhenvolt.com)
- 💬 WhatsApp: +256 XXX XXX XXX
- 📞 Phone: +256 XXX XXX XXX

### Reporting Issues
Please use GitHub Issues for bug reports and feature requests.

---

## 🙏 Acknowledgments

- Built with ❤️ by [Xhenvolt Technologies](https://xhenvolt.com)
- Powered by [Next.js](https://nextjs.org)
- Icons by [Lucide](https://lucide.dev)
- UI Components by [shadcn/ui](https://ui.shadcn.com)

---

## 📅 Changelog

### Version 0.2.00 (December 2025)
- ✨ Complete database schema expansion for all modules
- ✨ Comprehensive SEO optimization
- ✨ Custom favicon and Open Graph images
- ✨ Dynamic sitemap generation
- ✨ PWA support with web manifest
- 🐛 Fixed build errors (syntax and missing imports)
- 🚀 Enhanced landing page navigation

### Version 0.1.01 (November 2025)
- 🎉 Initial release with core modules
- 📚 Student and teacher management
- 💰 Basic fee management
- 📊 Exam and attendance tracking

---

<div align="center">

**Made with ❤️ in Uganda 🇺🇬**

[⬆ Back to Top](#drais---digital-resource--academic-information-system)

</div>

