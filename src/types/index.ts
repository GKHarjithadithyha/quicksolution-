export type UserRole = 'customer' | 'partner' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
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

export interface ServiceItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  rating?: number;
  reviews_count?: number;
  is_active: boolean;
  image_url: string;
  included: string[];
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
  address: string;
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

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  method: 'UPI QR';
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

export interface PartnerProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  verification_status: 'verified' | 'pending' | 'suspended';
  is_active: boolean;
  rating: number;
  total_jobs: number;
}
