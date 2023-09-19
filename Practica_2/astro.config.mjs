import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Práctica 2 - ACE2',
			social: {
				github: 'https://github.com/damianpeaf/ACE2_2S23_G4',
			},
			sidebar: [
				{
					label: 'Documentacion',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Descripcion', link: '/descripcion/' },
						{ label: 'Bocetos del Prototipo', link: '/bocetos/' },
						{ label: 'Prototipo', link: '/imagenes/' },
						{ label: 'Mock-Ups', link: '/mockups/' },
						{ label: 'Smart Connected design Framework', link: '/SmartConnected/' },
						{ label: 'Diagramas', link: '/Diagrama/' },
						
					],
				},
			],
		}),
	],
});
