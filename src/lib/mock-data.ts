import { ServiceCategory, ServiceItem, PartnerProfile, Booking, UserProfile } from '../types';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-1',
    name: 'AC & Appliance Repair',
    description: 'Expert servicing, installation, and breakdown maintenance',
    icon: 'Wrench',
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-2',
    name: 'Electrician & Wiring',
    description: 'Certified electricians for switches, MCBs, fixtures & rewiring',
    icon: 'Zap',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-3',
    name: 'Plumbing Services',
    description: 'Leak fixes, pipe fittings, tap repair & sanitary installations',
    icon: 'Droplets',
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-4',
    name: 'Deep Cleaning & Sanitization',
    description: 'Full home, kitchen, sofa, bathroom deep cleaning service',
    icon: 'Sparkles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-5',
    name: 'Carpentry & Furniture',
    description: 'Furniture assembly, lock repair, shelf hanging and polish',
    icon: 'Hammer',
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    category_id: 'cat-1',
    name: 'AC Master Jet Servicing (Split)',
    description: 'High-power indoor & outdoor unit foam spray jet wash with 30-day cooling guarantee.',
    price: 599,
    duration: 60,
    rating: 4.8,
    reviews_count: 320,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    included: [
      'Indoor evaporator coil deep foam cleaning',
      'High-pressure water jet washing',
      'Outdoor condenser unit cleaning',
      'Gas pressure & current check'
    ]
  },
  {
    id: 'srv-2',
    category_id: 'cat-1',
    name: 'Refrigerator Deep Checkup & Repair',
    description: 'Comprehensive diagnosis for single & double door refrigerators with cooling issues.',
    price: 349,
    duration: 45,
    rating: 4.7,
    reviews_count: 142,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    included: [
      'Compressor relay & thermostat testing',
      'Gas leak detection',
      'Coil & defrost heater inspection'
    ]
  },
  {
    id: 'srv-3',
    category_id: 'cat-2',
    name: 'Ceiling Fan Installation & Repair',
    description: 'Quick installation, noise elimination, speed regulator fixing or replacement.',
    price: 199,
    duration: 30,
    rating: 4.9,
    reviews_count: 512,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    included: [
      'Installation or demounting of fan',
      'Capacitor and wiring inspection',
      'Safety bracket installation'
    ]
  },
  {
    id: 'srv-4',
    category_id: 'cat-3',
    name: 'Complete Bathroom Plumbing Check & Tap Repair',
    description: 'Fix up to 3 leaking taps, flush valve diagnosis, or minor pipe sealing.',
    price: 299,
    duration: 45,
    rating: 4.8,
    reviews_count: 289,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    included: [
      'Washer & cartridge replacement',
      'Teflon sealing on connectors',
      'Water pressure verification'
    ]
  },
  {
    id: 'srv-5',
    category_id: 'cat-4',
    name: 'Intense Bathroom Deep Cleaning',
    description: 'Hard water stain removal, tile descaling, toilet & tap scrubbing with sanitizing agent.',
    price: 499,
    duration: 90,
    rating: 4.9,
    reviews_count: 670,
    is_active: true,
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    included: [
      'Floor & wall tile descaling',
      'Chrome fitting buffing and shine',
      'Mirror & exhaust fan cleaning',
      'Full disinfection'
    ]
  }
];

export const INITIAL_PARTNERS: PartnerProfile[] = [
  {
    id: 'part-1',
    user_id: 'usr-part-1',
    full_name: 'Rajesh Kumar',
    email: 'rajesh.partner@homeservices.local',
    phone: '+91 98765 43210',
    skills: ['AC Repair', 'Appliance Servicing', 'Electrical Wiring'],
    availability: 'Available Today (9 AM - 7 PM)',
    verification_status: 'verified',
    is_active: true,
    rating: 4.9,
    total_jobs: 148
  },
  {
    id: 'part-2',
    user_id: 'usr-part-2',
    full_name: 'Amit Verma',
    email: 'amit.plumbing@homeservices.local',
    phone: '+91 98111 22334',
    skills: ['Plumbing', 'Sanitary Fittings', 'Water Purifier'],
    availability: 'Available (Morning Slots)',
    verification_status: 'verified',
    is_active: true,
    rating: 4.8,
    total_jobs: 94
  },
  {
    id: 'part-3',
    user_id: 'usr-part-3',
    full_name: 'Pooja Sharma',
    email: 'pooja.clean@homeservices.local',
    phone: '+91 99222 33445',
    skills: ['Deep Cleaning', 'Sanitization', 'Kitchen Cleaning'],
    availability: 'Available Today',
    verification_status: 'verified',
    is_active: true,
    rating: 5.0,
    total_jobs: 210
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-cust-1',
    email: 'rohit.customer@gmail.com',
    full_name: 'Rohit Gupta',
    phone: '+91 98220 12345',
    role: 'customer',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: 'usr-part-1',
    email: 'rajesh.partner@homeservices.local',
    full_name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    role: 'partner',
    created_at: new Date(Date.now() - 86400000 * 30).toISOString()
  },
  {
    id: 'usr-admin-1',
    email: 'admin@homeservices.local',
    full_name: 'Platform Operations Admin',
    phone: '+91 99999 00000',
    role: 'admin',
    created_at: new Date(Date.now() - 86400000 * 60).toISOString()
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-1001',
    booking_number: 'HS-2026-1001',
    customer_id: 'usr-cust-1',
    customer_name: 'Rohit Gupta',
    customer_phone: '+91 98220 12345',
    service_id: 'srv-1',
    service_name: 'AC Master Jet Servicing (Split)',
    service_price_snapshot: 599,
    partner_id: 'part-1',
    partner_name: 'Rajesh Kumar',
    partner_phone: '+91 98765 43210',
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    address: 'Flat 402, Sunshine Heights, Outer Ring Road',
    landmark: 'Opposite Metro Station Gate 3',
    city: 'Bengaluru',
    pincode: '560103',
    customer_notes: 'AC makes a rattling vibration when switched on.',
    status: 'assigned',
    payment: {
      id: 'pay-1001',
      booking_id: 'book-1001',
      amount: 599,
      method: 'UPI QR',
      transaction_reference: 'UPI/612345789012/PAY',
      status: 'submitted',
      submitted_at: new Date(Date.now() - 3600000).toISOString()
    },
    status_history: [
      {
        id: 'hist-1',
        booking_id: 'book-1001',
        changed_by: 'usr-cust-1',
        changed_by_name: 'Rohit Gupta',
        new_status: 'pending',
        note: 'Customer created booking and submitted UPI reference',
        created_at: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 'hist-2',
        booking_id: 'book-1001',
        changed_by: 'usr-admin-1',
        changed_by_name: 'Platform Admin',
        old_status: 'pending',
        new_status: 'assigned',
        note: 'Assigned to Rajesh Kumar (AC Specialist)',
        created_at: new Date(Date.now() - 1800000).toISOString()
      }
    ],
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString()
  }
];
