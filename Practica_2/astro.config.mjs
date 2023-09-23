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
					label: 'Documentación',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Descripción', link: '/descripcion/' },
						{ label: 'Bocetos del Prototipo', link: '/bocetos/' },
						{ label: 'Prototipo', link: '/imagenes/' },
						{ label: 'Mock-Ups', link: '/mockups/' },
						{ label: 'Uso de los sensores', link: '/uso-de-sensores/' },
						{ label: 'Código de arduino', link: '/codigo-arduino/' },
						{ label: 'Smart Connected', link: '/smart/' },
						{ label: 'MQTT', link: '/mqtt/' },
						{ label: 'Diagramas', link: '/diagramas/' },
					],
				},
			],
		}),
	],
});
