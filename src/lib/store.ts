import { INITIAL_CATEGORIES, INITIAL_SERVICES, INITIAL_USERS, INITIAL_BOOKINGS, INITIAL_REVIEWS } from './mock-data';
import { Booking, ServiceCategory, ServiceItem, ServiceReview, UserProfile } from '../types';

class LocalStorageStore {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to storage', e);
    }
  }

  getCategories(): ServiceCategory[] {
    return this.get('hs_categories_v3', INITIAL_CATEGORIES);
  }

  getServices(): ServiceItem[] {
    return this.get('hs_services_v4', INITIAL_SERVICES);
  }

  getReviews(): ServiceReview[] {
    return this.get('hs_reviews_v3', INITIAL_REVIEWS);
  }

  saveReviews(data: ServiceReview[]): void {
    this.set('hs_reviews_v3', data);
  }

  getBookings(): Booking[] {
    return this.get('hs_bookings_v3', INITIAL_BOOKINGS);
  }

  saveBookings(data: Booking[]): void {
    this.set('hs_bookings_v3', data);
  }

  getUsers(): UserProfile[] {
    return this.get('hs_users_v3', INITIAL_USERS);
  }

  saveUsers(data: UserProfile[]): void {
    this.set('hs_users_v3', data);
  }

  getCurrentUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem('hs_current_user_v3');
      if (raw === null) return null; // Allow guest browsing by default
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setCurrentUser(user: UserProfile | null): void {
    this.set('hs_current_user_v3', user);
  }

  getLocation(): string {
    return this.get('hs_customer_location', 'Bengaluru');
  }

  setLocation(location: string): void {
    this.set('hs_customer_location', location);
  }
}

export const store = new LocalStorageStore();
