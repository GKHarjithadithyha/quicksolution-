import { store } from '../lib/store';
import { UserProfile } from '../types';

export const authService = {
  getCurrentUser(): UserProfile | null {
    return store.getCurrentUser();
  },

  login(email: string, _password: string): UserProfile {
    const users = store.getUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = nameFromEmail.replace(/\b\w/g, c => c.toUpperCase());
      user = {
        id: `usr-${Date.now()}`,
        email: email.trim(),
        full_name: formattedName || 'Customer',
        phone: '+91 98220 12345',
        role: 'customer',
        created_at: new Date().toISOString()
      };
      users.push(user);
      store.saveUsers(users);
    }
    store.setCurrentUser(user);
    return user;
  },

  register(params: { fullName: string; email: string; phone: string }): UserProfile {
    const users = store.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === params.email.toLowerCase());
    if (existing) {
      existing.full_name = params.fullName.trim();
      existing.phone = params.phone.trim();
      store.saveUsers(users);
      store.setCurrentUser(existing);
      return existing;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: params.email.trim(),
      full_name: params.fullName.trim(),
      phone: params.phone.trim(),
      role: 'customer',
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    store.saveUsers(users);
    store.setCurrentUser(newUser);
    return newUser;
  },

  updateProfile(updates: { full_name: string; phone: string }): UserProfile | null {
    const current = store.getCurrentUser();
    if (!current) return null;

    const updated: UserProfile = {
      ...current,
      full_name: updates.full_name.trim(),
      phone: updates.phone.trim()
    };

    const users = store.getUsers().map(u => (u.id === current.id ? updated : u));
    store.saveUsers(users);
    store.setCurrentUser(updated);
    return updated;
  },

  logout(): void {
    store.setCurrentUser(null);
  }
};
