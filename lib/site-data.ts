/* ─────────────── Company Data Constants ─────────────── */

export const companyStats = [
    { label: 'Trained Guards', value: 3500, suffix: '+' },
    { label: 'Years Experience', value: 15, suffix: '+' },
    { label: 'Valued Clients', value: 100, suffix: '+' },
    { label: 'Support', value: 24, suffix: '/7' },
];

export const industries = [
    { label: 'Banks & Financial Institutions', icon: 'Landmark' },
    { label: 'Factories & Industries', icon: 'Factory' },
    { label: 'Residential Complexes', icon: 'Home' },
    { label: 'Corporate Offices', icon: 'Building2' },
    { label: 'Retail & Shopping Malls', icon: 'ShoppingBag' },
    { label: 'Educational Institutions', icon: 'GraduationCap' },
    { label: 'Hotels & Hospitality', icon: 'Hotel' },
    { label: 'Government & Embassies', icon: 'Flag' },
];

export const contactInfo = {
    controlRoom: '02-58817173-4',
    hotline: '+8801755621578',
    email: 'info@pristinesecurity.org',
    website: 'https://www.pristinesecurity.org',
    whatsapp: '+8801755621578',
    facebook: 'https://www.facebook.com/pristine2009/info?tab=overview',
    headOffice: {
        name: 'Head Office',
        address: 'House-223, Lake Road, Lane-15, Mohakhali DOHS, Dhaka 1206',
        mapQuery: '23.7847557,90.3958206',
    },
    trainingSchool: {
        name: 'National Training School',
        address: 'Plot # 60, Road # 103, Sector # 01, Purbachal, Dhaka',
        mapQuery: '23.8354004,90.4868112',
        phone: '+031-658660',
        hotline: '+8801755694499',
    },
};

/** Default services to seed the DB when empty */
export const defaultServices = [
    {
        title: 'Uniformed Guarding',
        description: 'Professional security officers ensuring safe environments for clients nationwide with 24/7 trained personnel deployment.',
        image: '/assets/images/services/Uniformed Guarding.jpeg',
        icon: 'Badge',
        tags: ['guards', 'patrol', '24/7'],
        order: 1,
    },
    {
        title: 'Entertainment & Event Security',
        description: 'Efficient staffing for high-visibility venues, concerts, sports events, and corporate functions with crowd management expertise.',
        image: '/assets/images/services/Entertainment Security.png',
        icon: 'Ticket',
        tags: ['event security', 'crowd management', 'VIP protection'],
        order: 2,
    },
    {
        title: 'Console Operations & CCTV',
        description: 'Expert monitoring of CCTV, access control, fire detection, and intrusion detection systems around the clock.',
        image: '/assets/images/services/Console Operations.webp',
        icon: 'Cctv',
        tags: ['CCTV', 'monitoring', 'access control'],
        order: 3,
    },
    {
        title: 'Physical Protection',
        description: 'Installation and maintenance of barbed wire, razor wire, and electric fences over boundary walls for maximum perimeter security.',
        image: '/assets/Physical Protection.png',
        icon: 'ShieldCheck',
        tags: ['fencing', 'perimeter', 'physical security'],
        order: 4,
    },
    {
        title: 'Reception & Concierge Services',
        description: 'Professional front-desk security managing access control, visitor logs, badge issuance, and package inspection.',
        image: '/assets/ReceptionConciergeServices.png',
        icon: 'Users',
        tags: ['reception', 'access control', 'visitor management'],
        order: 5,
    },
    {
        title: 'Building Security',
        description: 'Comprehensive security solutions for commercial and residential buildings with trained guards and systematic monitoring.',
        image: '/assets/Building Security.png',
        icon: 'Building2',
        tags: ['guards', 'property protection', 'access control'],
        order: 6,
    },
    {
        title: 'Educational Institutions Security',
        description: 'Specialized security addressing unique and evolving threats in schools, colleges, and universities.',
        image: '/assets/EducationalInstitutionsSecurity.png',
        icon: 'GraduationCap',
        tags: ['student safety', 'campus security', 'risk management'],
        order: 7,
    },
    {
        title: 'Hospitality Security',
        description: 'Focused on enhancing security and life safety standards for hotels, resorts, and hospitality venues.',
        image: '/assets/Hospitality Security.png',
        icon: 'Utensils',
        tags: ['guest safety', 'asset protection', '24/7 monitoring'],
        order: 8,
    },
    {
        title: 'Manufacturing Facilities Security',
        description: 'Industrial security solutions to prevent losses from external threats and insider risks at manufacturing plants.',
        image: '/assets/Manufacturing Facilities Security.png',
        icon: 'Factory',
        tags: ['industrial security', 'loss prevention', 'risk control'],
        order: 9,
    },
    {
        title: 'Community Security',
        description: 'Security services for municipalities, government authorities, and international organizations ensuring public safety.',
        image: '/assets/Community Security.png',
        icon: 'MapPin',
        tags: ['public safety', 'crowd control', 'surveillance'],
        order: 10,
    },
    {
        title: 'Event Security Management',
        description: 'Comprehensive security planning for corporate conferences, festivals, sporting events, and public gatherings.',
        image: '/assets/images/services/Event Security Management.png',
        icon: 'CalendarCheck',
        tags: ['crowd management', 'access control', 'emergency response'],
        order: 11,
    },
];
