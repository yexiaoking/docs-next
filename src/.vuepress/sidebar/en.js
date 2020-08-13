/**
 * sidebar
 * */
module.exports={
  guide: [
    {
      title: 'Essentials',
      collapsable: false,
      children: [
        '/en/guide/installation',
        '/en/guide/introduction',
        '/en/guide/instance',
        '/en/guide/template-syntax',
        '/en/guide/computed',
        '/en/guide/class-and-style',
        '/en/guide/conditional',
        '/en/guide/list',
        '/en/guide/events',
        '/en/guide/forms',
        '/en/guide/component-basics'
      ]
    },
    {
      title: 'Components In-Depth',
      collapsable: false,
      children: [
        '/en/guide/component-registration',
        '/en/guide/component-props',
        '/en/guide/component-custom-events',
        '/en/guide/component-slots',
        '/en/guide/component-provide-inject',
        '/en/guide/component-dynamic-async',
        '/en/guide/component-template-refs',
        '/en/guide/component-edge-cases'
      ]
    },
    {
      title: 'Transitions & Animation',
      collapsable: false,
      children: [
        '/en/guide/transitions-overview',
        '/en/guide/transitions-enterleave',
        '/en/guide/transitions-list',
        '/en/guide/transitions-state'
      ]
    },
    {
      title: 'Reusability & Composition',
      collapsable: false,
      children: [
        '/en/guide/mixins',
        '/en/guide/custom-directive',
        '/en/guide/teleport',
        '/en/guide/render-function',
        '/en/guide/plugins'
      ]
    },
    {
      title: 'Advanced Guides',
      collapsable: false,
      children: [
        {
          title: 'Reactivity',
          children: [
            '/en/guide/reactivity',
            '/en/guide/reactivity-fundamentals',
            '/en/guide/reactivity-computed-watchers'
          ]
        },
        {
          title: 'Composition API',
          children: [
            '/en/guide/composition-api-introduction',
            '/en/guide/composition-api-setup',
            '/en/guide/composition-api-lifecycle-hooks',
            '/en/guide/composition-api-provide-inject',
            '/en/guide/composition-api-template-refs'
          ]
        },
        '/en/guide/optimizations',
        '/en/guide/change-detection'
      ]
    },
    {
      title: 'Tooling',
      collapsable: false,
      children: ['/en/guide/single-file-component', '/en/guide/testing']
    },
    {
      title: 'Scaling Up',
      collapsable: false,
      children: ['/en/guide/routing', '/en/guide/state-management', '/en/guide/ssr']
    },
    {
      title: 'Accessibility',
      collapsable: false,
      children: [
        '/en/guide/a11y-basics',
        '/en/guide/a11y-semantics',
        '/en/guide/a11y-standards',
        '/en/guide/a11y-resources'
      ]
    },
    {
      title: 'Migration from Vue 2',
      collapsable: true,
      children: [
        'en/migration/introduction',
        'en/migration/async-components',
        'en/migration/attribute-coercion',
        'en/migration/custom-directives',
        'en/migration/custom-elements-interop',
        'en/migration/data-option',
        'en/migration/events-api',
        'en/migration/filters',
        'en/migration/fragments',
        'en/migration/functional-components',
        'en/migration/global-api',
        'en/migration/global-api-treeshaking',
        'en/migration/inline-template-attribute',
        'en/migration/keycode-modifiers',
        'en/migration/render-function-api',
        'en/migration/slots-unification',
        'en/migration/v-model'
      ]
    },
    {
      title: 'Contribute to the Docs',
      collapsable: true,
      children: [
        'en/contributing/writing-guide',
        'en/contributing/doc-style-guide',
        'en/contributing/translations'
      ]
    }
  ],
  api: [
    '/en/api/application-config',
    '/en/api/application-api',
    '/en/api/global-api',
    {
      title: 'Options',
      collapsable: false,
      children: [
        '/en/api/options-data',
        '/en/api/options-dom',
        '/en/api/options-lifecycle-hooks',
        '/en/api/options-assets',
        '/en/api/options-composition',
        '/en/api/options-misc'
      ]
    },
    '/en/api/instance-properties',
    '/en/api/instance-methods',
    '/en/api/directives',
    '/en/api/special-attributes',
    '/en/api/built-in-components.md',
    {
      title: 'Reactivity API',
      collapsable: false,
      children: [
        '/en/api/basic-reactivity',
        '/en/api/refs-api',
        '/en/api/computed-watch-api'
      ]
    },
    '/en/api/composition-api'
  ]
}
