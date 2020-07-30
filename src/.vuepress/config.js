const sidebarEN = require('./sidebar/en')
const sidebarZH = require('./sidebar/zh')
module.exports = {
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  head: [
    [
      'link',
      {
        href:
          'https://fonts.googleapis.com/css?family=Inter:300,400,500,600|Open+Sans:400,600;display=swap',
        rel: 'stylesheet'
      }
    ],
    [
      'link',
      {
        href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        rel: 'stylesheet'
      }
    ],
    ['link', { rel: 'icon', href: '/logo.png' }],
    [
      'script',
      {
        src: 'https://player.vimeo.com/api/player.js'
      }
    ],
    [
      'script',
      {
        src: 'https://extend.vimeocdn.com/ga/72160148.js',
        defer: 'defer'
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Vue.js',
      description: 'Vue.js 3 渐进式 JavaScript 框架'
    },
    '/en/': {
      lang: 'en-US',
      title: 'Vue.js Vue 3 docs beta',
      description: 'Vue.js 3 - The Progressive JavaScript Framework'
    }
  },
  themeConfig: {
    logo: '/logo.png',
    locales: {
      '/': {
        repo: 'vuejs/docs-next',
        editLinks: false,
        editLinkText: 'Edit this on GitHub!',
        lastUpdated: 'Last updated',
        docsDir: 'src',
        sidebarDepth: 2,
        sidebar: {
          collapsable: false,
          '/guide/': sidebarZH.guide,
          '/community/': sidebarZH.guide,
          '/api/': sidebarZH.api
        },
        smoothScroll: false,
        nav: require('./nav/zh')
      },
      '/en/': {
        repo: 'vuejs/docs-next',
        editLinks: false,
        editLinkText: 'Edit this on GitHub!',
        lastUpdated: 'Last updated',
        docsDir: 'src',
        sidebarDepth: 2,
        sidebar: {
          collapsable: false,
          '/en/guide/': sidebarEN.guide,
          '/en/community/': sidebarEN.guide,
          '/en/api/': sidebarEN.api
        },
        smoothScroll: false,
        nav: require('./nav/en')
      }
    }


  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'info',
        before: info =>
          `<div class="custom-block info"><p class="custom-block-title">${info}</p>`,
        after: '</div>'
      }
    ]
  ],
  markdown: {
    lineNumbers: true,
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  },
  extraWatchFiles: ['.vuepress/nav/en.js', '.vuepress/nav/en.js']
}
