export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer';
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

export type ServiceBadge = 'MOST BOOKED' | 'TOP RATED' | 'TRENDING';

export interface ServiceReview {
  id: string;
  service_id: string;
  customer_id: string;
  customer_name: string;
  rating: number; // 1 to 5
  comment: string;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  is_active: boolean;
  is_available?: boolean;
  badge?: ServiceBadge;
  image_url: string;
  video_url?: string;
  included: string[];
  additional_info?: string[];
  // Computed from real backend records (null/0 until real data exists)
  average_rating?: number | null;
  review_count?: number;
  booking_count?: number;
}

export type BookingStatus =
  | 'pending'
  | 'assigned'
  | 'accepted'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'submitted'
  | 'verified'
  | 'rejected';

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  service_id: string;
  service_name: string;
  service_price_snapshot: number;
  partner_id?: string;
  partner_name?: string;
  partner_phone?: string;
  scheduled_at: string;
  scheduled_date?: string;
  scheduled_slot?: string;
  address: string;
  street?: string;
  landmark?: string;
  city: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  customer_notes?: string;
  status: BookingStatus;
  payment: Payment;
  status_history: BookingStatusHistoryItem[];
  created_at: string;
  updated_at: string;
}

export type PaymentMethod = 'UPI' | 'Card' | 'Cash' | 'UPI QR';

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  method: PaymentMethod;
  transaction_reference?: string;
  status: PaymentStatus;
  verified_by?: string;
  submitted_at?: string;
  verified_at?: string;
}

export interface BookingStatusHistoryItem {
  id: string;
  booking_id: string;
  changed_by: string;
  changed_by_name: string;
  old_status?: BookingStatus;
  new_status: BookingStatus;
  note?: string;
  created_at: string;
}
