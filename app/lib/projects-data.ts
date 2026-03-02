export interface Project {
    id: string;
    name: string;
    industry: string;
    outcome: string;
    duration: string;
    scope: string[];
    tools: string[];
    coverImage: string;
    link: string; // The URL slug to a dedicated project page (to be built later)
}

export const projectsData: Project[] = [
    {
        id: 'coviu',
        name: 'COVIU',
        industry: 'Telehealth',
        outcome: 'Build a new telehealth module',
        duration: '3 sprints (90 days)',
        scope: [
            'Scope definition',
            'Team allocation and knowledge transfer',
            'Software architecture',
            'AWS cloud setup',
            'Codec library implementation',
            'Ticket logging system implementation'
        ],
        tools: ['AWS Cloud', 'Real-time video codecs', 'Logging systems'],
        coverImage: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?q=80&w=2668&auto=format&fit=crop', // Healthcare tech abstract
        link: '/projects/coviu'
    },
    {
        id: 'helfie',
        name: 'Helfie',
        industry: 'AI Healthcare',
        outcome: 'Build AI-based cough analysis platform',
        duration: '9 sprints (270 days)',
        scope: [
            'Scope definition',
            'Team allocation',
            'Software architecture',
            'Cough sound sample collection',
            'Algorithm and model validation',
            'Clinical validation'
        ],
        tools: ['AI model development', 'Clinical data validation', 'Audio signal processing'],
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop', // Data / Tech / Nodes
        link: '/projects/helfie'
    },
    {
        id: 'phenix-health',
        name: 'Phenix Health',
        industry: 'Telehealth',
        outcome: 'Build new dashboard for changing business needs',
        duration: '5 sprints (150 days)',
        scope: [
            'UX research and customer interviews',
            'Software architecture',
            '.NET framework development',
            'Twilio integration',
            'QA and testing'
        ],
        tools: ['AWS', '.NET', 'Twilio', 'Booking analytics dashboard'],
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop', // Dashboard / Analytics
        link: '/projects/phenix-health'
    },
    {
        id: 'hark-medical',
        name: 'Hark Medical',
        industry: 'Medication Management',
        outcome: 'Build business model and raise private capital',
        duration: '2.1 sprints (63 days)',
        scope: [
            'Value proposition development',
            'Customer discovery',
            'Market validation',
            'Financial modelling',
            'Pitch deck development',
            'Capital raising support'
        ],
        tools: ['Venture Strategy', 'Financial Modelling'],
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', // Strategy / Finance
        link: '/projects/hark-medical'
    },
    {
        id: 'iscope-systems',
        name: 'iSCOPE Systems',
        industry: 'Pandemic Monitoring',
        outcome: 'Build non-invasive Covid-19 monitoring platform',
        duration: '11.3 sprints (339 days)',
        scope: [
            'Capital raising',
            'UX research',
            'Software architecture',
            'Non-invasive sensor platform development',
            'Full SaaS development',
            'QA testing'
        ],
        tools: ['PPG sensors', 'Audiometric sensors', 'SaaS platform engineering'],
        coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2680&auto=format&fit=crop', // Lab / Tech
        link: '/projects/iscope-systems'
    },
    {
        id: 'rogr',
        name: 'ROGR',
        industry: 'Security Operations',
        outcome: 'Build security operations suite',
        duration: '16.3 sprints (489 days)',
        scope: [
            'Google Cloud integration',
            'OR engine integration',
            'GPS integration',
            'P2P communication layer',
            'Native Android development'
        ],
        tools: ['Google Cloud', 'GPS APIs', 'Android Native'],
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop', // Servers / Server room
        link: '/projects/rogr'
    },
    {
        id: 'meaxure-health',
        name: 'Meaxure Health',
        industry: 'Digital Health / PPG Platform',
        outcome: 'Build BP, SPo2, RR and HRV contact PPG platform',
        duration: '16 sprints (480 days)',
        scope: [
            'Algorithm development',
            'AI model creation',
            'Clinical data acquisition',
            'Stakeholder engagement',
            'Testing AI models'
        ],
        tools: ['AI Models', 'Algorithm Development', 'Clinical Data'],
        coverImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2680&auto=format&fit=crop', // Tech / Research
        link: '/projects/meaxure-health'
    },
    {
        id: 'edfin',
        name: 'Edfin',
        industry: 'Education Fintech',
        outcome: 'Build landing page to validate market',
        duration: '0.8 sprints (24 days)',
        scope: [
            'Branding',
            'Development',
            'Testing/QA',
            'WordPress integration'
        ],
        tools: ['WordPress', 'Branding UI'],
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2732&auto=format&fit=crop', // Education tech
        link: '/projects/edfin'
    },
    {
        id: 'signmo',
        name: 'Signmo',
        industry: 'Ecommerce / Signage',
        outcome: 'Develop ecommerce store',
        duration: '3.7 sprints (111 days)',
        scope: [
            'Product calculator logic',
            'WordPress integration',
            'Australia Post API integration',
            'Branding'
        ],
        tools: ['WordPress', 'E-commerce', 'API Integrations'],
        coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2670&auto=format&fit=crop', // Ecommerce / Store
        link: '/projects/signmo'
    },
    {
        id: 'efficiency-works',
        name: 'Efficiency Works',
        industry: 'Workflow Software',
        outcome: 'Build workflow SaaS platform',
        duration: '16 sprints (480 days)',
        scope: [
            'Customer journeys',
            'Software architecture',
            'Workflow Studio development',
            'Workflow Web App',
            'QA testing'
        ],
        tools: ['SaaS Development', 'Software Architecture'],
        coverImage: 'https://images.unsplash.com/photo-1507925922893-ce382b6c7a1c?q=80&w=2574&auto=format&fit=crop', // Desk / Work
        link: '/projects/efficiency-works'
    },
    {
        id: 'canopy-plus',
        name: 'Canopy Plus',
        industry: 'Insurance Tech',
        outcome: 'Connect surveyors with insurers via SaaS platform',
        duration: '12 sprints (360 days)',
        scope: [
            'Uber-type development model',
            'Full SaaS platform',
            'Chat module development'
        ],
        tools: ['SaaS Engineering', 'Real-time Chat', 'Geospatial mapping'],
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop', // Top down map / Drone view
        link: '/projects/canopy-plus'
    },
    {
        id: 'healthful',
        name: 'Healthful',
        industry: 'Africa Telehealth',
        outcome: 'Build storyboards for user engagement',
        duration: '0.8 sprints (24 days)',
        scope: [
            'Customer discussions',
            'Story creation',
            'Vector artwork',
            'Animation design'
        ],
        tools: ['UX/UI Design', 'Animation', 'Illustration'],
        coverImage: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2670&auto=format&fit=crop', // Design / Art
        link: '/projects/healthful'
    },
    {
        id: 'nzimmr',
        name: 'NZIMMR',
        industry: 'Research & Minerals',
        outcome: 'Establish mineral-to-materials research institute',
        duration: '27 sprints (810 days)',
        scope: [
            'Hiring mining experts',
            'Research collaboration',
            'Materials research',
            'IP acquisition',
            'Commercialisation'
        ],
        tools: ['Research Commercialisation', 'Talent Acquisition'],
        coverImage: 'https://images.unsplash.com/photo-1587826315254-6dfebfce5a37?q=80&w=2670&auto=format&fit=crop', // Minerals / Science
        link: '/projects/nzimmr'
    },
    {
        id: 'quadsafe',
        name: 'Quadsafe (DPI NSW)',
        industry: 'Safety Tech',
        outcome: 'Develop quad safety mobile and web platform',
        duration: '7.7 sprints (231 days)',
        scope: [
            'UX research',
            'Algorithm development',
            'Android app development',
            'Web portal development',
            'Sensor fusion integration'
        ],
        tools: ['Android Native', 'Sensor Fusion', 'Web Portal'],
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop', // Tech / Microchip / Board
        link: '/projects/quadsafe'
    }
];
