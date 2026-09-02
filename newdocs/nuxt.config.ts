export default defineNuxtConfig({
  extends: ['docus'],
  css: [new URL('./assets/css/v4-landing.css', import.meta.url).pathname],
  app: {
    head: {
      title: 'AIOStack | AI Security Platform',
      titleTemplate: '%s | AIOStack',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
      style: [
        { children: ':root { --font-v4-sans: "Inter Tight"; --font-v4-mono: "JetBrains Mono"; }' },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },
})
