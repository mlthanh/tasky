import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@nx': nx
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^@pages/.*',
            '^@components/.*',
            '^@frontend/.*',
            '^@backend/.*',
            '^@shared/.*',
            '^@hooks/.*',
            '^@constants/.*',
            '^@contexts/.*',
            '^@layouts/.*',
            '^@assets/.*',
            '^@utils/.*',
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$'
          ],
          depConstraints: [
            {
              sourceTag: 'type:frontend',
              onlyDependOnLibsWithTags: ['type:shared']
            },
            {
              sourceTag: 'type:backend',
              onlyDependOnLibsWithTags: ['type:shared']
            },
            {
              sourceTag: 'type:shared',
              onlyDependOnLibsWithTags: ['type:shared']
            }
          ]
        }
      ],

      'no-console': 'warn',
      'no-lonely-if': 'warn',
      'no-trailing-spaces': 'warn',
      'no-multi-spaces': 'warn',
      'no-multiple-empty-lines': 'warn',
      'space-before-blocks': ['error', 'always'],
      'object-curly-spacing': ['warn', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'array-bracket-spacing': 'warn',
      'linebreak-style': 'off',
      'no-unexpected-multiline': 'warn',
      'keyword-spacing': 'warn',
      'comma-spacing': 'warn',
      'arrow-spacing': 'warn'
    }
  }
];
