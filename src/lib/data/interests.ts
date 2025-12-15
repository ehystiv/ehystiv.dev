export interface Interest {
    name: string;
    description: {
        it: string;
        en: string;
    };
    url: string;
    tags: string[];
}

export const interests: Interest[] = [
    {
        name: 'superfile',
        description: {
            en: 'Pretty fancy and modern terminal file manager.',
            it: 'File manager da terminale moderno ed elegante.'
        },
        url: 'https://github.com/yorukot/superfile',
        tags: ['Terminal', 'File Manager', 'Go']
    },
    {
        name: 'caddy',
        description: {
            en: 'Fast and extensible multi-platform HTTP/1-2-3 web server with automatic HTTPS.',
            it: 'Web server HTTP/1-2-3 multipiattaforma veloce ed estensibile con HTTPS automatico.'
        },
        url: 'https://github.com/caddyserver/caddy',
        tags: ['Web Server', 'Go', 'HTTPS']
    },
    {
        name: 'shadcn-vue',
        description: {
            en: 'Vue port of shadcn-ui. Re-usable components built with Radix Vue and Tailwind CSS.',
            it: 'Porting Vue di shadcn-ui. Componenti riutilizzabili costruiti con Radix Vue e Tailwind CSS.'
        },
        url: 'https://github.com/unovue/shadcn-vue',
        tags: ['Vue', 'UI', 'Tailwind']
    },
    {
        name: 'scramble',
        description: {
            en: 'Modern Laravel OpenAPI (Swagger) documentation generator. No PHPDoc annotations required.',
            it: 'Generatore di documentazione OpenAPI (Swagger) per Laravel moderno. Nessuna annotazione PHPDoc richiesta.'
        },
        url: 'https://github.com/dedoc/scramble',
        tags: ['Laravel', 'API', 'Docs']
    },
    {
        name: 'brutal',
        description: {
            en: 'A neobrutalism Astro starter theme. Inspiration for this very website.',
            it: 'Tema starter Astro in stile neobrutalista. Ispirazione per questo sito.'
        },
        url: 'https://github.com/ElianCodes/brutal',
        tags: ['Astro', 'Theme', 'Brutalism']
    },
    {
        name: 'slides',
        description: {
            en: 'Terminal based presentation tool. For those who live in the CLI.',
            it: 'Strumento di presentazione basato su terminale. Per chi vive nella CLI.'
        },
        url: 'https://github.com/maaslalani/slides',
        tags: ['Terminal', 'Slides', 'Go']
    },
    {
        name: 'laravel-debugbar',
        description: {
            en: 'Debugbar for Laravel. Essential tool for any Laravel developer.',
            it: 'Debugbar per Laravel. Strumento essenziale per ogni sviluppatore Laravel.'
        },
        url: 'https://github.com/barryvdh/laravel-debugbar',
        tags: ['Laravel', 'Debug', 'PHP']
    },
    {
        name: 'puter',
        description: {
            en: 'The Internet Computer! Free, Open-Source, and Self-Hostable web desktop OS.',
            it: 'Il Computer Internet! OS desktop web gratuito, Open-Source e self-hostable.'
        },
        url: 'https://github.com/HeyPuter/puter',
        tags: ['OS', 'Web', 'Self-Hosted']
    },
    {
        name: 'GhostTrack',
        description: {
            en: 'Useful tool to track location or mobile number',
            it: 'Strumento utile per tracciare posizione o numero di cellulare'
        },
        url: 'https://github.com/HunxByts/GhostTrack',
        tags: ['osint', 'hacking', 'pentesting']
    }
];
