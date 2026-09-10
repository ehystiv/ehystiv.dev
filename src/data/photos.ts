export interface Photo {
	/** Path relative to `src/assets/photos/`, including the category folder (e.g. `nature/dolomiti.jpg`) */
	src: string;
	alt: {
		it: string;
		en: string;
	};
	location?: string;
	date?: string;
	shoot_on?: string;
}

export interface PhotoCategory {
	/** Folder name inside `src/assets/photos/` (e.g. `nature`) */
	id: string;
	label: {
		it: string;
		en: string;
	};
	photos: Photo[];
}

/**
 * Photo portfolio, grouped by category.
 * Files live in `src/assets/photos/{categoryId}/`; add the image file to the folder
 * and an entry in the matching category here. Categories render in array order.
 *
 * Example:
 *
 * export const photoCategories: PhotoCategory[] = [
 * 	{
 * 		id: 'nature',
 * 		label: { it: 'Natura', en: 'Nature' },
 * 		photos: [
 * 			{
 * 				src: 'nature/dolomiti.jpg',
 * 				alt: { it: 'Le Dolomiti al tramonto', en: 'The Dolomites at sunset' },
 * 				location: 'Dolomiti',
 * 				date: '2025'
 * 			}
 * 		]
 * 	}
 * ];
 */
export const photoCategories: PhotoCategory[] = [
	{
		id: 'people',
		label: { it: 'Persone', en: 'People' },
		photos: [
			{
				src: 'people/ragazza_costume.webp',
				alt: { it: "Ragazza in costume", en: "Girl in swimsuit" },
				location: 'Premilcuore',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'people/pride.webp',
				alt: { it: "Ragazzo al Pride", en: "Boy at the Pride" },
				location: 'Bologna',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'people/ragazza_blu.webp',
				alt: { it: "Ragazza con vestito blu", en: "Girl in blue dress" },
				location: 'Castel dell\'Alpi',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'people/ragazza_montagne.webp',
				alt: { it: "Ragazza tra le montagne", en: "Girl among the mountains" },
				location: 'Rocca Calascio',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'people/ragazzo_montagne.webp',
				alt: { it: "Ragazzo tra le montagne", en: "Boy among the mountains" },
				location: 'Bresimo',
				date: '2026',
				shoot_on: 'Sony α6400'
			}
		]
	},
	{
		id: 'nature',
		label: { it: 'Natura', en: 'Nature' },
		photos: [
			{
				src: 'nature/lago_castello_alpi.webp',
				alt: { it: "Lago di Castel dell'Alpi al tramonto", en: "The Castel dell'Alpi Lake at sunset" },
				location: 'Castel dell\'Alpi',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'nature/castel_alpi.webp',
				alt: { it: "Castel dell'Alpi", en: "Castel dell'Alpi" },
				location: 'Castel dell\'Alpi',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'nature/lago_castel_alpi_2.webp',
				alt: { it: "Lago di Castel dell'Alpi", en: "The Castel dell'Alpi Lake" },
				location: 'Castel dell\'Alpi',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'nature/grotta_urlante.webp',
				alt: { it: "Cascate delle grotte urlanti", en: "The Howling Caves Waterfalls" },
				location: 'Premilcuore',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'nature/grotta_urlante_2.webp',
				alt: { it: "Cascata delle grotte urlante con edera", en: "The Howling Caves Waterfalls with ivy" },
				location: 'Premilcuore',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: "nature/marmore.webp",
				alt: { it: "Cascata delle Marmore", en: "The Marmore Waterfalls" },
				location: 'Cascata delle Marmore',
				date: '2026',
				shoot_on: 'Sony α6400'
			}
		]
	},
	{
		id: 'animals',
		label: { it: 'Animali', en: 'Animals' },
		photos: [
			{
				src: 'animals/frog.webp',
				alt: { it: "Rana", en: "Frog" },
				location: 'Cascata delle Marmore',
				date: '2026',
				shoot_on: 'Sony α6400'
			},
			{
				src: 'animals/balestrucci.webp',
				alt: { it: "Balestrucci", en: "Swallows" },
				location: 'Bresimo',
				date: '2026',
				shoot_on: 'Sony α6400'
			}
		]
	}
];
