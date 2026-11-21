import { store } from '../lib/store';
import { ServiceCategory, ServiceItem } from '../types';

export const serviceService = {
  getCategories(): ServiceCategory[] {
    return store.getCategories().filter(c => c.is_active);
  },

  getAllCategories(): ServiceCategory[] {
    return store.getCategories();
  },

  getCategoryById(id: string): ServiceCategory | undefined {
    return store.getCategories().find(c => c.id === id);
  },

  getServices(categoryId?: string, search?: string): ServiceItem[] {
    let list = store.getServices().filter(s => s.is_active);
    if (categoryId) {
      list = list.filter(s => s.category_id === categoryId);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.description.toLowerCase().includes(q)
      );
    }
    return list;
  },

  getServiceById(id: string): ServiceItem | undefined {
    return store.getServices().find(s => s.id === id);
  },

  createCategory(category: Omit<ServiceCategory, 'id' | 'created_at'>): ServiceCategory {
    const list = store.getCategories();
    const newCat: ServiceCategory = {
      ...category,
      id: `cat-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    list.push(newCat);
    store.saveCategories(list);
    return newCat;
  },

  createService(service: Omit<ServiceItem, 'id'>): ServiceItem {
    const list = store.getServices();
    const newSrv: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`
    };
    list.push(newSrv);
    store.saveServices(list);
    return newSrv;
  },

  toggleServiceStatus(id: string): ServiceItem | undefined {
    const list = store.getServices();
    const item = list.find(s => s.id === id);
    if (item) {
      item.is_active = !item.is_active;
      store.saveServices(list);
    }
    return item;
  }
};
