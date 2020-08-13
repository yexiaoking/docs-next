module.exports = [
    {
      text: 'Docs',
      ariaLabel: 'Documentation Menu',
      items: [
        { text: 'Guide', link: '/en/guide/introduction' },
        { text: 'Style Guide', link: '/en/style-guide/' }
      ]
    },
    { text: 'API Reference', link: '/en/api/application-config' },
    {
      text: 'Ecosystem',
      items: [
        {
          text: 'Community',
          ariaLabel: 'Community Menu',
          items: [
            { text: 'Team', link: '/en/community/team/' },
            { text: 'Partners', link: '/en/community/partners/' },
            { text: 'Join', link: '/en/community/join/' },
            { text: 'Themes', link: '/en/community/themes/' }
          ]
        },
        {
          text: 'Official Projects',
          items: [
            { text: 'Vue Router', link: 'https://router.vuejs.org/' },
            { text: 'Vuex', link: 'https://vuex.vuejs.org/' },
            { text: 'Vue CLI', link: 'https://cli.vuejs.org/' },
            {
              text: 'Vue Test Utils',
              link: 'https://vue-test-utils.vuejs.org/'
            },
            {
              text: 'Devtools',
              link: 'https://github.com/vuejs/vue-devtools'
            },
            { text: 'Weekly news', link: 'https://news.vuejs.org/' }
          ]
        }
      ]
    }
  ]