export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    linkedin?: string;
}

export const teamData: TeamMember[] = [
    {
        id: '1',
        name: 'Eleanor Vance',
        role: 'Managing Partner',
        bio: 'Oversees venture strategy and capital allocation. Former VP of Engineering at a leading healthcare tech firm.',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop', // Professional woman portrait
        linkedin: 'https://linkedin.com'
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        role: 'Head of Deep Tech',
        bio: 'Leads AI algorithm development and sensor platform integration across all OGV scaling partnerships.',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2670&auto=format&fit=crop', // Professional man portrait
        linkedin: 'https://linkedin.com'
    },
    // {
    //     id: '3',
    //     name: 'Dr. Sarah Jenkins',
    //     role: 'Clinical Director',
    //     bio: 'Drives clinical validation for telehealth platforms and ensures strict regulatory compliance across global deployments.',
    //     image: 'https://images.unsplash.com/photo-1598550874175-4d0ef43ee90d?q=80&w=2672&auto=format&fit=crop', // Professional woman portrait
    //     linkedin: 'https://linkedin.com'
    // },
    // {
    //     id: '4',
    //     name: 'Julian Hayes',
    //     role: 'Lead Architect',
    //     bio: 'Designs the SaaS infrastructure and microservice architecture spanning multiple industries including Fintech and Logistics.',
    //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop', // Professional man portrait
    //     linkedin: 'https://linkedin.com'
    // }
];
