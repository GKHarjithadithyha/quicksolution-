import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Customer Layout & Pages
import { CustomerLayout } from '../components/layout/CustomerLayout';
import { CustomerHomePage } from '../pages/customer/HomePage';
import { ServicesDiscoveryPage } from '../pages/customer/ServicesDiscoveryPage';
import { ServiceDetailPage } from '../pages/customer/ServiceDetailPage';
import { BookingFormPage } from '../pages/customer/BookingFormPage';
import { PaymentQRPage } from '../pages/customer/PaymentQRPage';
import { MyBookingsPage } from '../pages/customer/MyBookingsPage';
import { BookingDetailsPage } from '../pages/customer/BookingDetailsPage';
import { CustomerProfilePage } from '../pages/customer/ProfilePage';
import { LoginPage } from '../pages/customer/LoginPage';
import { RegisterPage } from '../pages/customer/RegisterPage';

export const AppRouter: React.FC = () => {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="/" element={<CustomerHomePage />} />
        <Route path="/services" element={<ServicesDiscoveryPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/:id" element={<BookingFormPage />} />
        <Route path="/booking/:id" element={<BookingDetailsPage />} />
        <Route path="/payment/:id" element={<PaymentQRPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/profile" element={<CustomerProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CustomerLayout>
  );
};
