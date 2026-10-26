import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'

export default defineConfig([
    {
        files: ['**/*.js'],
        languageOptions: { globals: globals.browser },
        plugins: { js },
        extends: ['js/recommended'],
    },

    {
        rules: {
            'prefer-const': 'error',
            'no-var': 'error',
            'no-console': 'error',
        },
    },
])
