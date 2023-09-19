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
					label: "Descripcion",
					autogenerate: { directory: "descripcion" },
				},
				{
					label: "Bocetos",
					autogenerate: { directory: "bocetos" },
				},
				{
					label: "Imagenes del Prototipo",
					autogenerate: { directory: "imagenesPrototipo" },
				},
				{
					label: "MockUps de Aplicaciones",
					autogenerate: { directory: "mockUps" },
				},
				{
					label: "Smart Connected Design Framework",
					autogenerate: { directory: "smartConnected" },
				},
				{
					label: "Diagramas",
					autogenerate: { directory: "diagramas" },
				},
				{
					label: "MQTT",
					autogenerate: { directory: "mqtt" },
				},
			],
		}),
	],
});
