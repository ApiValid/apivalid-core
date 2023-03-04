module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'standard-with-typescript',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
    },
    rules: {
        indent: ['error', 4],
        '@typescript-eslint/indent': ['error', 4],
        semi: ['error', 'always'],
        '@typescript-eslint/semi': ['error', 'always'],
        'comma-dangle': 0,
        'space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/parameter-properties': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/member-delimiter-style': 'off'
    }
};
