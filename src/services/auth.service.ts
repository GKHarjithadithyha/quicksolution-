import { store } from '../lib/store';
import { UserProfile, UserRole } from '../types';

export const authService = {
  getCurrentUser(): UserProfile {
    return store.getCurrentUser();
  },

  switchRole(role: UserRole): UserProfile {
    const users = store.getUsers();
    let target = users.find(u => u.role === role);
    if (!target) {
      target = {
        id: `usr-${role}-temp`,
        email: `${role}@homeservices.local`,
        full_name: `${role.toUpperCase()} User`,
        phone: '+91 90000 00000',
        role: role,
        created_at: new Date().toISOString()
      };
    }
    store.setCurrentUser(target);
    return target;
  },

  login(email: string, role: UserRole): UserProfile {
    const users = store.getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: `usr-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        phone: '+91 98765 00000',
        role,
        created_at: new Date().toISOString()
      };
    }
    store.setCurrentUser(user);
    return user;
  },

  logout(): void {
    // defaults back to customer
    this.switchRole('customer');
  }
};
