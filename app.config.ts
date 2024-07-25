export default defineAppConfig({
  jsly: {
    site: {
      title: 'JSLy - The Ultimate JavaScript Documentation Portal',
      ogTitle: 'JSLy - The Ultimate JavaScript Docs',
      description: 'Dive into JSLy: Your go-to resource for comprehensive JavaScript tutorials, guides, and interactive learning.',
      ogDescription: 'Discover JSLy: The ultimate hub for JavaScript documentation, featuring in-depth tutorials, real-time search, and user-contributed content.',
      ogImage: 'https://i.imgur.com/aNVf3mG.png',
      twitterCard: 'https://i.imgur.com/aNVf3mG.png',
    },
    theme: {
      customizable: true,
      color: 'zinc',
      radius: 0.5,
    },
    header: {
      title: 'JSLy',

      showTitle: true,
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      darkModeToggle: true,
      nav: [{
        title: 'Docs',
        links: [{
          title: 'Getting Started',
          to: '/getting-started',
          description: 'Start mastering JavaScript with JSLy',
        }, {
          title: 'API',
          to: '/api',
          description: 'Discover the configurations and exposed APIs.',
          target: '_self',
        }],
      },

      ],

      links: [
        {
          icon: 'lucide:github',
          to: 'https://github.com/huntermacias/',
          target: '_blank',
        },
        {
          icon: 'lucide:twitter',
          to: 'https://twitter.com/huntermacias_',
          target: '_blank',

        },
        {
          icon: 'lucide:linkedin',
          to: 'https://www.linkedin.com/in/huntermacias/',
          target: '_blank',
        }

      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
      codeCopyToast: true,

      codeIcon: {
        'package.json': 'vscode-icons:file-type-node',
        'tsconfig.json': 'vscode-icons:file-type-tsconfig',
        '.npmrc': 'vscode-icons:file-type-npm',
        '.editorconfig': 'vscode-icons:file-type-editorconfig',
        '.eslintrc': 'vscode-icons:file-type-eslint',
        '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
        '.eslintignore': 'vscode-icons:file-type-eslint',
        'eslint.config.js': 'vscode-icons:file-type-eslint',
        'eslint.config.mjs': 'vscode-icons:file-type-eslint',
        'eslint.config.cjs': 'vscode-icons:file-type-eslint',
        '.gitignore': 'vscode-icons:file-type-git',
        'yarn.lock': 'vscode-icons:file-type-yarn',
        '.env': 'vscode-icons:file-type-dotenv',
        '.env.example': 'vscode-icons:file-type-dotenv',
        '.vscode/settings.json': 'vscode-icons:file-type-vscode',
        'nuxt': 'vscode-icons:file-type-nuxt',
        '.nuxtrc': 'vscode-icons:file-type-nuxt',
        '.nuxtignore': 'vscode-icons:file-type-nuxt',
        'nuxt.config.js': 'vscode-icons:file-type-nuxt',
        'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
        'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
        'tailwind.config.js': 'vscode-icons:file-type-tailwind',
        'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
        'vscode': 'vscode-icons:file-type-vscode',
        'vue': 'vscode-icons:file-type-vue',
        'ts': 'vscode-icons:file-type-typescript',
        'tsx': 'vscode-icons:file-type-typescript',
        'mjs': 'vscode-icons:file-type-js',
        'cjs': 'vscode-icons:file-type-js',
        'js': 'vscode-icons:file-type-js',
        'jsx': 'vscode-icons:file-type-js',
        'md': 'vscode-icons:file-type-markdown',
        'mdc': 'vscode-icons:file-type-markdown',
        'py': 'vscode-icons:file-type-python',
        'npm': 'vscode-icons:file-type-npm',
        'pnpm': 'vscode-icons:file-type-pnpm',
        'npx': 'vscode-icons:file-type-npm',
        'yarn': 'vscode-icons:file-type-yarn',
        'bun': 'vscode-icons:file-type-bun',
        'yml': 'vscode-icons:file-type-yaml',
        'json': 'vscode-icons:file-type-json',
        'Dockerfile': 'vscode-icons:file-type-docker',

      },
    },
    footer: {
      credits: 'Copyright © 2024',
      links: [
        {
          title: 'JSLy',
          to: 'https://js-ly2.vercel.app',
          target: '_blank',
        },
        {
          icon: 'lucide:github',
          to: 'https://github.com/huntermacias/nextjs-tailwind-template',
          target: '_blank',
        },
      ],
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/huntermacias/nextjs-tailwind-template',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/huntermacias/nextjs-tailwind-template/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
});
