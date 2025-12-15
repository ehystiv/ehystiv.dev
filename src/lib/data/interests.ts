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
        name: 'scramble',
        description: {
            en: 'Modern Laravel OpenAPI (Swagger) documentation generator. No PHPDoc annotations required.',
            it: 'Generatore di documentazione OpenAPI (Swagger) per Laravel moderno. Nessuna annotazione PHPDoc richiesta.'
        },
        url: 'https://github.com/dedoc/scramble',
        tags: ['Laravel', 'API', 'Docs']
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
        name: 'GhostTrack',
        description: {
            en: 'Useful tool to track location or mobile number',
            it: 'Strumento utile per tracciare posizione o numero di cellulare'
        },
        url: 'https://github.com/HunxByts/GhostTrack',
        tags: ['osint', 'hacking', 'pentesting']
    },
    {
        name: "Vue PDF",
        description: {
            en: "Vue Custom Renderer for PDF Files",
            it: "Renderer personalizzato per i file PDF in Vue"
        },
        url: "https://github.com/Ceereals/vue-pdf",
        tags: ['Vue', 'PDF', 'Renderer']
    },
    {
        name: "FilePizza",
        description: {
            en: "🍕 Peer-to-peer file transfers in your browser",
            it: "🍕 Trasferimenti di file peer-to-peer nel tuo browser"
        },
        url: "https://github.com/kern/filepizza",
        tags: ['File Transfer', 'Peer-to-Peer', 'Browser']
    },
    {
        name: "Sidekick",
        description: {
            en: "Bare metal to production ready in mins; your own fly server on your VPS.",
            it: "Bare metal a prodotto pronto in minuti; il tuo server fly su VPS."
        },
        url: "https://github.com/MightyMoud/sidekick",
        tags: ['VPS', 'Server']
    },
    {
        name: "Vito",
        description: {
            en: "Free and Self-Hosted Server Management Tool",
            it: "Strumento di gestione server gratuito e self-hosted"
        },
        url: "https://github.com/vitodeploy/vito",
        tags: ['Server', 'Management', 'Tool']
    },
    {
        name: "Better Commits",
        description: {
            en: "A CLI for creating better commits following the conventional commits specification",
            it: "Strumento CLI per creare commit migliori seguendo la specifica dei commit convenzionali"
        },
        url: "https://github.com/Everduin94/better-commits",
        tags: ['Commit', 'Tool', 'CLI']
    }
];
