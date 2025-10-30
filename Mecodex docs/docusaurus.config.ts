import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Docs Mecodex',
  tagline: 'Documentación del dashboard de Mecodex e información para el encargado del área de soporte',
  // Favicon debe existir en static/img. Usamos el que ya está presente.
  favicon: 'img/logo_mecodex.ico',
  // Rama de despliegue para GitHub Pages (Deploy from a branch)
  deploymentBranch: 'gh-pages',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // url: 'https://davidjdsv.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // baseUrl: 'usuarios-mecodex',
  // onBrokenAnchors: 'ignore',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Davidjdsv', // Usually your GitHub org/user name.
  projectName: 'usuarios-mecodex', // Usually your repo name.

  onBrokenLinks: 'throw',
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // En modo "solo docs", hacemos que la raíz del sitio ('/') sea la documentación
          // Esto reemplaza la ruta base por defecto '/docs' y sirve los docs directamente en '/'
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // Desactivamos el blog para un sitio centrado exclusivamente en documentación
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Docs Mecodex',
      logo: {
        alt: 'Docs Mecodex Logo',
        src: 'img/logo_mecodex.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'Sidebar',
          position: 'left',
          // Etiqueta del ítem de navegación que lleva a la documentación
          label: 'Docs Mecodex',
        },
        {
          href: 'https://github.com/Davidjdsv/usuarios-mecodex',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          
          items: [
            {
              label: 'Funcionalidades Mecodex',
              to: '/docs/Soporte Mecodex/funcionalidades-mecodex',
            },
            {
              label: 'Manual de soporte',
              to: '/docs/Soporte Mecodex/manual-soporte',
            },
          ],
        },
        {
          title: 'Nuestras redes sociales',
          items: [
            {
              label: 'Página web',
              href: 'https://webcloster.com/',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/webcloster/',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/webcloster/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Davidjdsv/usuarios-mecodex',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project by Davidjdsv, Built with Docusaurus and love ❤️.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
