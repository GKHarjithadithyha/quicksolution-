import { store } from '../lib/store';
import { Booking, PaymentStatus } from '../types';

export const paymentService = {
  submitTransactionReference(bookingId: string, transactionReference: string): Booking | undefined {
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) return undefined;

    booking.payment.transaction_reference = transactionReference;
    booking.payment.status = 'submitted';
    booking.payment.submitted_at = new Date().toISOString();
    booking.updated_at = new Date().toISOString();

    booking.status_history.unshift({
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: booking.customer_id,
      changed_by_name: booking.customer_name,
      new_status: booking.status,
      note: `Payment reference ${transactionReference} submitted for verification`,
      created_at: new Date().toISOString()
    });

    store.saveBookings(list);
    return booking;
  },

  verifyPayment(bookingId: string, adminId: string, verified: boolean): Booking | undefined {
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) return undefined;

    const newStatus: PaymentStatus = verified ? 'verified' : 'rejected';
    booking.payment.status = newStatus;
    booking.payment.verified_by = adminId;
    booking.payment.verified_at = new Date().toISOString();
    booking.updated_at = new Date().toISOString();

    booking.status_history.unshift({
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: adminId,
      changed_by_name: 'Admin Ops',
      new_status: booking.status,
      note: `Admin marked payment reference as ${newStatus.toUpperCase()}`,
      created_at: new Date().toISOString()
    });

    store.saveBookings(list);
    return booking;
  }
};
