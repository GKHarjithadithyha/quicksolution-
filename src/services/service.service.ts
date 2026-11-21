import { store } from '../lib/store';
import { ServiceCategory, ServiceItem, ServiceReview, ServiceBadge } from '../types';

function enrichService(service: ServiceItem): ServiceItem {
  const reviews = store.getReviews().filter(r => r.service_id === service.id);
  const bookings = store.getBookings().filter(b => b.service_id === service.id && b.status !== 'cancelled');

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1))
      : null;

  const bookingCount = bookings.length;

  let badge: ServiceBadge | undefined = service.badge;
  if (!badge) {
    if (bookingCount >= 5) {
      badge = 'MOST BOOKED';
    } else if (averageRating !== null && averageRating >= 4.5 && reviewCount >= 2) {
      badge = 'TOP RATED';
    }
  }

  return {
    ...service,
    average_rating: averageRating,
    review_count: reviewCount,
    booking_count: bookingCount,
    badge
  };
}

export const serviceService = {
  getCategories(): ServiceCategory[] {
    return store.getCategories().filter(c => c.is_active);
  },

  getCategoryById(id: string): ServiceCategory | undefined {
    return store.getCategories().find(c => c.id === id);
  },

  getServices(categoryId?: string, search?: string): ServiceItem[] {
    let list = store
      .getServices()
      .filter(s => s.is_active)
      .map(enrichService);

    if (categoryId) {
      list = list.filter(s => s.category_id === categoryId);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(s => {
        const catName = this.getCategoryById(s.category_id)?.name.toLowerCase() || '';
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          catName.includes(q)
        );
      });
    }
    return list;
  },

  getServiceById(id: string): ServiceItem | undefined {
    const found = store.getServices().find(s => s.id === id);
    return found ? enrichService(found) : undefined;
  },

  getTopRatedServices(limit = 4): ServiceItem[] {
    const all = this.getServices();
    const rated = all
      .filter(s => (s.review_count || 0) > 0 && s.average_rating !== null)
      .sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));

    if (rated.length >= limit) return rated.slice(0, limit);
    const ratedIds = new Set(rated.map(s => s.id));
    const remaining = all.filter(s => !ratedIds.has(s.id));
    return [...rated, ...remaining].slice(0, limit);
  },

  getReviewsForService(serviceId: string): ServiceReview[] {
    return store
      .getReviews()
      .filter(r => r.service_id === serviceId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getAllReviews(): ServiceReview[] {
    return store
      .getReviews()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getOverallRatingStats(): { average: number | null; totalReviews: number } {
    const reviews = store.getReviews();
    if (reviews.length === 0) return { average: null, totalReviews: 0 };
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return {
      average: Number(avg.toFixed(1)),
      totalReviews: reviews.length
    };
  },

  addReview(params: {
    serviceId: string;
    customerId: string;
    customerName: string;
    rating: number;
    comment: string;
  }): ServiceReview {
    const reviews = store.getReviews();
    const newReview: ServiceReview = {
      id: `rev-${Date.now()}`,
      service_id: params.serviceId,
      customer_id: params.customerId,
      customer_name: params.customerName,
      rating: Math.min(5, Math.max(1, Math.round(params.rating))),
      comment: params.comment.trim(),
      created_at: new Date().toISOString()
    };
    reviews.unshift(newReview);
    store.saveReviews(reviews);
    return newReview;
  }
};
