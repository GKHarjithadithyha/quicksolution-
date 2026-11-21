import { store } from '../lib/store';
import { bookingService } from './booking.service';
import { Booking, PartnerProfile } from '../types';

export const partnerService = {
  getPartners(): PartnerProfile[] {
    return store.getPartners();
  },

  getPartnerById(id: string): PartnerProfile | undefined {
    return store.getPartners().find(p => p.id === id);
  },

  getAssignedJobs(partnerId: string): Booking[] {
    return store.getBookings().filter(b => b.partner_id === partnerId);
  },

  acceptJob(bookingId: string, partnerId: string): Booking | undefined {
    const partner = this.getPartnerById(partnerId);
    return bookingService.updateStatus(
      bookingId,
      'accepted',
      partnerId,
      partner?.full_name || 'Service Partner',
      'Partner accepted the assignment and confirmed schedule.'
    );
  },

  rejectJob(bookingId: string, partnerId: string, reason?: string): Booking | undefined {
    const partner = this.getPartnerById(partnerId);
    const list = store.getBookings();
    const booking = list.find(b => b.id === bookingId);
    if (!booking) return undefined;

    // Clear partner so admin can reassign
    booking.partner_id = undefined;
    booking.partner_name = undefined;
    booking.partner_phone = undefined;
    booking.status = 'rejected';
    booking.updated_at = new Date().toISOString();

    booking.status_history.unshift({
      id: `hist-${Date.now()}`,
      booking_id: bookingId,
      changed_by: partnerId,
      changed_by_name: partner?.full_name || 'Service Partner',
      old_status: 'assigned',
      new_status: 'rejected',
      note: `Partner declined job. Reason: ${reason || 'Schedule conflict'}. Ready for admin reassignment.`,
      created_at: new Date().toISOString()
    });

    store.saveBookings(list);
    return booking;
  },

  startJob(bookingId: string, partnerId: string): Booking | undefined {
    const partner = this.getPartnerById(partnerId);
    return bookingService.updateStatus(
      bookingId,
      'in_progress',
      partnerId,
      partner?.full_name || 'Service Partner',
      'Partner arrived at customer location and began service.'
    );
  },

  completeJob(bookingId: string, partnerId: string): Booking | undefined {
    const partner = this.getPartnerById(partnerId);
    return bookingService.updateStatus(
      bookingId,
      'completed',
      partnerId,
      partner?.full_name || 'Service Partner',
      'Service successfully completed. Clean up done.'
    );
  }
};
