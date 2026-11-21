import { store } from '../lib/store';
import { Booking, BookingStatus, BookingStatusHistoryItem } from '../types';

export const bookingService = {
  getBookings(): Booking[] {
    return store.getBookings();
  },

  getCustomerBookings(customerId: string): Booking[] {
    return store.getBookings().filter(b => b.customer_id === customerId);
  },

  getBookingById(id: string): Booking | undefined {
    return store.getBookings().find(b => b.id === id);
  },

  createBooking(params: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    serviceId: string;
    serviceName: string;
    price: number;
    scheduledAt: string;
    address: string;
    landmark?: string;
    city: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
    customerNotes?: string;
  }): Booking {
    const list = store.getBookings();
    const bookingId = `book-${Date.now()}`;
    const bookingNumber = `HS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: Booking = {
      id: bookingId,
      booking_number: bookingNumber,
      customer_id: params.customerId,
      customer_name: params.customerName,
      customer_phone: params.customerPhone,
      service_id: params.serviceId,
      service_name: params.serviceName,
      service_price_snapshot: params.price,
      scheduled_at: params.scheduledAt,
      address: params.address,
      landmark: params.landmark,
      city: params.city,
      pincode: params.pincode,
      latitude: params.latitude,
      longitude: params.longitude,
      customer_notes: params.customerNotes,
      status: 'pending',
      payment: {
        id: `pay-${Date.now()}`,
        booking_id: bookingId,
        amount: params.price,
        method: 'UPI QR',
        status: 'unpaid'
      },
      status_history: [
        {
          id: `hist-${Date.now()}`,
          booking_id: bookingId,
          changed_by: params.customerId,
          changed_by_name: params.customerName,
          new_status: 'pending',
          note: 'Booking requested by customer',
          created_at: new Date().toISOString()
        }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    list.unshift(newBooking);
    store.saveBookings(list);
    return newBooking;
  },

  updateStatus(
    bookingId: string, 
    newStatus: BookingStatus, 
    changedBy: string, 
    changedByName: string, 
    note?: string
  ): Booking | undefined {
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) return undefined;

    const oldStatus = booking.status;
    booking.status = newStatus;
    booking.updated_at = new Date().toISOString();

    const historyItem: BookingStatusHistoryItem = {
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: changedBy,
      changed_by_name: changedByName,
      old_status: oldStatus,
      new_status: newStatus,
      note: note || `Status changed from ${oldStatus} to ${newStatus}`,
      created_at: new Date().toISOString()
    };

    booking.status_history.unshift(historyItem);
    store.saveBookings(list);
    return booking;
  }
};
