import { store } from '../lib/store';
import { partnerService } from './partner.service';
import { Booking, PartnerProfile } from '../types';

export const adminService = {
  assignPartner(bookingId: string, partnerId: string, adminId: string): Booking | undefined {
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    const partner = partnerService.getPartnerById(partnerId);
    if (!booking || !partner) return undefined;

    booking.partner_id = partner.id;
    booking.partner_name = partner.full_name;
    booking.partner_phone = partner.phone;
    booking.status = 'assigned';
    booking.updated_at = new Date().toISOString();

    booking.status_history.unshift({
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: adminId,
      changed_by_name: 'Platform Operations Admin',
      old_status: 'pending',
      new_status: 'assigned',
      note: `Admin allocated job to partner ${partner.full_name} (${partner.phone})`,
      created_at: new Date().toISOString()
    });

    store.saveBookings(list);
    return booking;
  },

  getAllBookings(): Booking[] {
    return store.getBookings();
  },

  getAllPartners(): PartnerProfile[] {
    return store.getPartners();
  },

  getMetrics() {
    const bookings = store.getBookings();
    const verifiedRevenue = bookings
      .filter(b => b.payment.status === 'verified')
      .reduce((sum, b) => sum + b.service_price_snapshot, 0);

    const pendingPaymentVerifications = bookings.filter(b => b.payment.status === 'submitted').length;
    const pendingAssignments = bookings.filter(b => b.status === 'pending' || b.status === 'rejected').length;
    const completedJobs = bookings.filter(b => b.status === 'completed').length;

    return {
      totalBookings: bookings.length,
      verifiedRevenue,
      pendingPaymentVerifications,
      pendingAssignments,
      completedJobs,
      activePartnersCount: store.getPartners().filter(p => p.is_active).length
    };
  }
};
