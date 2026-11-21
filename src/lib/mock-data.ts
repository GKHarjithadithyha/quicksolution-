import { ServiceCategory, ServiceItem, Booking, UserProfile, ServiceReview } from '../types';

export const HERO_BACKGROUND_VIDEOS = {
  cleaning: '/videos/hero-services.mp4',
  homeCare: '/videos/hero-services.mp4',
  repair: '/videos/hero-services.mp4'
};

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-electrical',
    name: 'Electrical',
    description: 'Switches, MCBs, fan fitting, lighting & wiring repairs',
    icon: 'Zap',
    image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-plumbing',
    name: 'Plumbing',
    description: 'Tap repairs, leak fixes, pipe fittings & sanitary work',
    icon: 'Droplets',
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-ac',
    name: 'AC Services',
    description: 'Split & window AC servicing, jet wash & gas refill',
    icon: 'Wind',
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-cleaning',
    name: 'Cleaning',
    description: 'Home, kitchen, bathroom & sofa deep cleaning',
    icon: 'Sparkles',
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-carpentry',
    name: 'Carpentry',
    description: 'Furniture repair, door locks, hinges & shelf installation',
    icon: 'Hammer',
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-painting',
    name: 'Painting',
    description: 'Interior room painting, touch-ups & wall waterproofing',
    icon: 'Paintbrush',
    image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-pest',
    name: 'Pest Control',
    description: 'Cockroach, termite, ant & general home pest treatment',
    icon: 'Bug',
    image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-appliance',
    name: 'Appliance Repair',
    description: 'Refrigerator, washing machine, microwave & geyser repair',
    icon: 'Wrench',
    image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-civil',
    name: 'Civil & Maintenance',
    description: 'Tile grouting, masonry patch-ups & minor civil work',
    icon: 'HardHat',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-gardening',
    name: 'Gardening',
    description: 'Lawn mowing, balcony garden care & plant maintenance',
    icon: 'Flower2',
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-shifting',
    name: 'House Shifting',
    description: 'Local home relocation, packing & furniture loading',
    icon: 'Truck',
    image_url: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'cat-renovation',
    name: 'Home Renovation',
    description: 'Kitchen remodeling, bathroom upgrades & interior work',
    icon: 'Home',
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    category_id: 'cat-ac',
    name: 'AC General Service',
    description: 'Indoor unit cleaning, filter wash, and cooling inspection for split or window AC.',
    price: 599,
    duration: 60,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/5691568/5691568-hd_1280_720_25fps.mp4',
    included: [
      'Indoor evaporator coil and filter jet cleaning',
      'Drain tray and pipe flushing to prevent water leakage',
      'Outdoor condenser unit water wash',
      'Cooling airflow and basic gas pressure inspection'
    ],
    additional_info: [
      'Please ensure access to a nearby water tap and power socket.',
      'Spare parts or refrigerant gas top-up, if required, are not included in this fixed price.',
      'A ladder may be needed if the indoor unit is mounted above 9 feet.'
    ]
  },
  {
    id: 'srv-2',
    category_id: 'cat-plumbing',
    name: 'Tap & Mixer Repair',
    description: 'Repair leaking bathroom or kitchen taps, washers, and spindles.',
    price: 299,
    duration: 45,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/8487777/8487777-hd_1280_720_25fps.mp4',
    included: [
      'Inspection and repair of up to 2 leaking taps or mixers',
      'Washer and cartridge adjustment or tightening',
      'Teflon tape resealing on threaded joints',
      'Water pressure and leakage verification after repair'
    ],
    additional_info: [
      'Replacement taps, cartridges, or concealed wall fittings are billed separately if needed.',
      'Please inform the technician of the main water shut-off valve location.'
    ]
  },
  {
    id: 'srv-3',
    category_id: 'cat-electrical',
    name: 'Ceiling Fan Installation & Repair',
    description: 'Standard ceiling fan installation, capacitor replacement, or regulator fix.',
    price: 249,
    duration: 30,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/5691605/5691605-hd_1280_720_25fps.mp4',
    included: [
      'Installation or replacement of 1 ceiling fan',
      'Wire connection and safety clamp check',
      'Speed regulator and capacitor testing',
      'Post-installation wobble and noise check'
    ],
    additional_info: [
      'Customer should provide the new fan unit or replacement capacitor if required.',
      'High-ceiling installations above 12 feet may require additional arrangement.'
    ]
  },
  {
    id: 'srv-4',
    category_id: 'cat-cleaning',
    name: 'Bathroom Deep Cleaning',
    description: 'Hard water stain removal, tile scrubbing, and complete bathroom sanitization.',
    price: 499,
    duration: 90,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/6195125/6195125-hd_1920_1080_25fps.mp4',
    included: [
      'Floor and wall tile descaling and scrubbing',
      'Toilet bowl, washbasin, and mirror cleaning',
      'Tap, shower, and chrome fixture descaling',
      'Exhaust fan exterior and floor drain cleaning'
    ],
    additional_info: [
      'Please remove personal toiletries from shelves before arrival.',
      'Old permanent cement or paint stains may not be completely removable.'
    ]
  },
  {
    id: 'srv-5',
    category_id: 'cat-appliance',
    name: 'Refrigerator Checkup & Diagnosis',
    description: 'Comprehensive inspection for single or double-door refrigerators.',
    price: 349,
    duration: 45,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/5691568/5691568-hd_1280_720_25fps.mp4',
    included: [
      'Compressor relay, overload protector, and thermostat check',
      'Cooling coil and defrost heater inspection',
      'Door gasket sealing assessment',
      'Complete fault report and repair estimate'
    ],
    additional_info: [
      'Covers visit and diagnostic inspection. Spare parts or gas charging are quoted separately.',
      'Please clear perishable food items if the unit is not cooling.'
    ]
  },
  {
    id: 'srv-6',
    category_id: 'cat-carpentry',
    name: 'Door Lock & Hinge Repair',
    description: 'Fix misaligned doors, jammed mortise locks, or loose cabinet hinges.',
    price: 299,
    duration: 45,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/6474133/6474133-hd_1280_720_25fps.mp4',
    included: [
      'Alignment and tightening of up to 2 door hinges or latches',
      'Lubrication and repair of standard door lock',
      'Minor wood planing if door is rubbing against frame'
    ],
    additional_info: [
      'New lock sets or specialty hydraulic hinges must be provided by the customer.'
    ]
  },
  {
    id: 'srv-7',
    category_id: 'cat-pest',
    name: 'Cockroach & Ant Control',
    description: 'Odourless gel and spray treatment for 1–2 BHK kitchens and living areas.',
    price: 899,
    duration: 60,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/4109356/4109356-hd_1280_720_25fps.mp4',
    included: [
      'Odourless gel baiting in kitchen cabinets and hinges',
      'Targeted perimeter spray around sinks and drains',
      'Safe treatment suitable for households without vacating'
    ],
    additional_info: [
      'Keep uncovered food items stored away during the treatment.',
      'Avoid washing treated kitchen corners for 24 hours for best effectiveness.'
    ]
  },
  {
    id: 'srv-8',
    category_id: 'cat-painting',
    name: 'Single Wall Touch-Up & Painting',
    description: 'Professional repainting of one accent or scuffed interior wall (up to 150 sq ft).',
    price: 1499,
    duration: 180,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/6474129/6474129-hd_1280_720_25fps.mp4',
    included: [
      'Surface sanding and minor crack putty filling',
      '1 coat of primer and 2 coats of standard emulsion paint',
      'Floor masking and post-painting cleanup'
    ],
    additional_info: [
      'Paint material cost is separate unless customer supplies preferred shade.',
      'Heavy furniture should be moved 3–4 feet away from the wall.'
    ]
  },
  {
    id: 'srv-9',
    category_id: 'cat-civil',
    name: 'Bathroom Tile Grouting',
    description: 'Waterproof epoxy or cement regrouting to prevent floor seepage.',
    price: 799,
    duration: 90,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/6474133/6474133-hd_1280_720_25fps.mp4',
    included: [
      'Scraping and cleaning old damaged grout lines',
      'Application of waterproof tile grout across bathroom floor',
      'Surface wipe-down and finishing'
    ],
    additional_info: [
      'Do not use the bathroom for 12 hours after grouting to allow proper curing.'
    ]
  },
  {
    id: 'srv-10',
    category_id: 'cat-gardening',
    name: 'Balcony Garden Maintenance',
    description: 'Pruning, repotting, soil turning, and general plant health care.',
    price: 449,
    duration: 60,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/4505543/4505543-hd_1280_720_25fps.mp4',
    included: [
      'Pruning and trimming of up to 15 potted plants',
      'Soil aeration, weeding, and organic manure mixing',
      'Dry leaf clearing and workspace tidy-up'
    ],
    additional_info: [
      'New ceramic pots, potting mix, or saplings are not included.'
    ]
  },
  {
    id: 'srv-11',
    category_id: 'cat-shifting',
    name: 'Local Shifting Packing Support',
    description: 'On-site volume survey and starter packing support for 1 BHK local moves.',
    price: 1299,
    duration: 120,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/7464552/7464552-hd_1280_720_25fps.mp4',
    included: [
      '2 trained packing helpers for 2 hours',
      'Disassembly of standard bed or dining table',
      'Organized labelling and box preparation'
    ],
    additional_info: [
      'Transport vehicle and additional cartons are arranged based on distance and load.'
    ]
  },
  {
    id: 'srv-12',
    category_id: 'cat-renovation',
    name: 'Home Renovation Consultation',
    description: 'Detailed measurement, layout review, and scope estimate for kitchen or bath upgrades.',
    price: 499,
    duration: 60,
    is_active: true,
    is_available: true,
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    video_url: 'https://videos.pexels.com/video-files/6474129/6474129-hd_1280_720_25fps.mp4',
    included: [
      'On-site measurement and structural feasibility check',
      'Material and timeline walkthrough',
      'Written itemized estimate shared after inspection'
    ],
    additional_info: [
      'Consultation fee is adjustable against the final renovation work order.'
    ]
  }
];

// Intentionally empty: real customer reviews come from user submissions / Supabase backend.
export const INITIAL_REVIEWS: ServiceReview[] = [];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-cust-1',
    email: 'rohit.customer@gmail.com',
    full_name: 'Rohit Gupta',
    phone: '+91 98220 12345',
    role: 'customer',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

export const INITIAL_BOOKINGS: Booking[] = [];
