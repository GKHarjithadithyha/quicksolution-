import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// Customer Pages
import { CustomerLayout } from '../components/layout/CustomerLayout';
import { CustomerHomePage } from '../pages/customer/HomePage';
import { ServicesDiscoveryPage } from '../pages/customer/ServicesDiscoveryPage';
import { ServiceDetailPage } from '../pages/customer/ServiceDetailPage';
import { BookingFormPage } from '../pages/customer/BookingFormPage';
import { PaymentQRPage } from '../pages/customer/PaymentQRPage';
import { BookingConfirmationPage } from '../pages/customer/BookingConfirmationPage';
import { MyBookingsPage } from '../pages/customer/MyBookingsPage';
import { BookingDetailsPage } from '../pages/customer/BookingDetailsPage';
import { CustomerProfilePage } from '../pages/customer/ProfilePage';

// Partner Pages
import { PartnerLayout } from '../components/layout/PartnerLayout';
import { PartnerJobsPage } from '../pages/partner/PartnerJobsPage';
import { PartnerHistoryPage } from '../pages/partner/PartnerHistoryPage';
import { PartnerProfilePage } from '../pages/partner/PartnerProfilePage';

// Admin Pages
import { AdminLayout } from '../components/layout/AdminLayout';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminBookingsPage } from '../pages/admin/AdminBookingsPage';
import { AdminPaymentsPage } from '../pages/admin/AdminPaymentsPage';
import { AdminServicesPage } from '../pages/admin/AdminServicesPage';
import { AdminPartnersPage } from '../pages/admin/AdminPartnersPage';

export const AppRouter: React.FC = () => {
  const { user } = useAuth();

  // If user role is Partner, render partner layout and routes
  if (user.role === 'partner') {
    return (
      <PartnerLayout>
        <Routes>
          <Route path="/partner/jobs" element={<PartnerJobsPage />} />
          <Route path="/partner/history" element={<PartnerHistoryPage />} />
          <Route path="/partner/profile" element={<PartnerProfilePage />} />
          <Route path="*" element={<Navigate to="/partner/jobs" replace />} />
        </Routes>
      </PartnerLayout>
    );
  }

  // If user role is Admin, render admin layout and routes
  if (user.role === 'admin') {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/services" element={<AdminServicesPage />} />
          <Route path="/admin/partners" element={<AdminPartnersPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    );
  }

  // Default: Customer Portal
  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<CustomerHomePage />} />
        <Route path="/services" element={<ServicesDiscoveryPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/book/:serviceId" element={<BookingFormPage />} />
        <Route path="/payment/:bookingId" element={<PaymentQRPage />} />
        <Route path="/confirmation/:bookingId" element={<BookingConfirmationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/booking/:bookingId" element={<BookingDetailsPage />} />
        <Route path="/profile" element={<CustomerProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CustomerLayout>
  );
};
