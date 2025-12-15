export interface Project {
    name: string;
    slug: string;
    description: {
        it: string;
        en: string;
    };
    longDescription: {
        it: string;
        en: string;
    };
    language: string;
    topics: string[];
    githubUrl: string;
    homepage?: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        name: 'ServRepoMaker',
        slug: 'servrepomaker',
        description: {
            it: 'Laravel package per generare classi Service e Repository',
            en: 'Laravel package to generate Service and Repository classes'
        },
        longDescription: {
            it: 'Un package Laravel che automatizza la creazione di classi Service e Repository, seguendo il pattern architetturale per separare la logica di business dalla persistenza dei dati. Installabile via Composer.',
            en: 'A Laravel package that automates the creation of Service and Repository classes, following the architectural pattern to separate business logic from data persistence. Installable via Composer.'
        },
        language: 'PHP',
        topics: ['Laravel', 'Package', 'Repository Pattern', 'Service Pattern'],
        githubUrl: 'https://github.com/ehystiv/ServRepoMaker',
        homepage: 'https://packagist.org/packages/ehystiv/servrepomaker',
        featured: true
    },
    {
        name: 'sIDP',
        slug: 'sidp',
        description: {
            it: 'Identity Provider leggero e pronto all\'uso',
            en: 'Lightweight and ready-to-use Identity Provider'
        },
        longDescription: {
            it: 'SimpleIDP (sIDP) è un Identity Provider minimale costruito con NestJS. Fornisce funzionalità di autenticazione, autorizzazione e gestione utenti out-of-the-box. Ideale per progetti che necessitano di un sistema di autenticazione semplice ma robusto.',
            en: 'SimpleIDP (sIDP) is a minimal Identity Provider built with NestJS. It provides authentication, authorization, and user management features out-of-the-box. Ideal for projects needing a simple but robust authentication system.'
        },
        language: 'TypeScript',
        topics: ['NestJS', 'Authentication', 'Authorization', 'IDP', 'User Management'],
        githubUrl: 'https://github.com/ehystiv/sIDP',
        featured: true
    },
    {
        name: 'BestCharacterAssigner',
        slug: 'best-character-assigner',
        description: {
            it: 'Sistema intelligente di assegnazione personaggi',
            en: 'Intelligent character assignment system'
        },
        longDescription: {
            it: 'Un sistema per l\'assegnazione ottimale di personaggi a persone, utilizzando strategie avanzate e algoritmi per massimizzare la soddisfazione globale. Perfetto per giochi di ruolo, LARP ed eventi.',
            en: 'A system for optimal assignment of characters to people, using advanced strategies and algorithms to maximize global satisfaction. Perfect for role-playing games, LARP, and events.'
        },
        language: 'Python',
        topics: ['Algorithms', 'Optimization', 'Assignment Problem'],
        githubUrl: 'https://github.com/ehystiv/BestCharacterAssigner',
        featured: true
    },
    {
        name: 'FulcronGRV',
        slug: 'fulcrongrv',
        description: {
            it: 'Sito web per associazione LARP',
            en: 'Website for LARP association'
        },
        longDescription: {
            it: 'Sito web completo per l\'associazione di gioco di ruolo dal vivo "FulcronGRV". Sviluppato con Nuxt.js e Vuetify, include gestione eventi, informazioni sull\'associazione e sistema di iscrizione.',
            en: 'Complete website for the live action role-playing game association "FulcronGRV". Developed with Nuxt.js and Vuetify, it includes event management, association information, and registration system.'
        },
        language: 'Vue',
        topics: ['Nuxt.js', 'Vuetify', 'LARP', 'Web App'],
        githubUrl: 'https://github.com/ehystiv/FulcronGRV-website',
        featured: true
    }
];

export const languageColors: Record<string, string> = {
    PHP: '#777BB4',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    Vue: '#4FC08D',
    JavaScript: '#F7DF1E',
    Svelte: '#FF3E00'
};
