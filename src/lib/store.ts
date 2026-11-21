import { INITIAL_CATEGORIES, INITIAL_SERVICES, INITIAL_PARTNERS, INITIAL_USERS, INITIAL_BOOKINGS } from './mock-data';
import { Booking, PartnerProfile, ServiceCategory, ServiceItem, UserProfile } from '../types';

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
    return this.get('hs_categories', INITIAL_CATEGORIES);
  }

  saveCategories(data: ServiceCategory[]): void {
    this.set('hs_categories', data);
  }

  getServices(): ServiceItem[] {
    return this.get('hs_services', INITIAL_SERVICES);
  }

  saveServices(data: ServiceItem[]): void {
    this.set('hs_services', data);
  }

  getPartners(): PartnerProfile[] {
    return this.get('hs_partners', INITIAL_PARTNERS);
  }

  savePartners(data: PartnerProfile[]): void {
    this.set('hs_partners', data);
  }

  getBookings(): Booking[] {
    return this.get('hs_bookings', INITIAL_BOOKINGS);
  }

  saveBookings(data: Booking[]): void {
    this.set('hs_bookings', data);
  }

  getUsers(): UserProfile[] {
    return this.get('hs_users', INITIAL_USERS);
  }

  getCurrentUser(): UserProfile {
    return this.get('hs_current_user', INITIAL_USERS[0]); // Defaults to customer
  }

  setCurrentUser(user: UserProfile): void {
    this.set('hs_current_user', user);
  }
}

export const store = new LocalStorageStore();
