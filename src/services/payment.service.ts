import { store } from '../lib/store';
import { Booking, PaymentMethod, PaymentStatus } from '../types';

export const paymentService = {
  submitTransactionReference(bookingId: string, transactionReference: string): Booking | undefined {
    return this.submitPayment(bookingId, 'UPI', transactionReference);
  },

  submitPayment(
    bookingId: string,
    method: PaymentMethod,
    reference?: string,
    customerId?: string
  ): Booking | undefined {
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) return undefined;

    if (customerId && booking.customer_id.startsWith('guest-')) {
      booking.customer_id = customerId;
    }

    booking.payment.method = method;
    booking.payment.transaction_reference =
      reference || (method === 'Cash' ? 'CASH-ON-SERVICE' : undefined);
    booking.payment.status = 'submitted';
    booking.payment.submitted_at = new Date().toISOString();
    booking.updated_at = new Date().toISOString();

    const note =
      method === 'Cash'
        ? 'Customer selected Cash on Service payment'
        : method === 'Card'
        ? `Card payment details submitted (${booking.payment.transaction_reference || 'Card'})`
        : `UPI payment reference ${booking.payment.transaction_reference} submitted for verification`;

    booking.status_history.unshift({
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: booking.customer_id,
      changed_by_name: booking.customer_name,
      new_status: booking.status,
      note,
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
