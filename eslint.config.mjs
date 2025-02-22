import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
    // Base configurations
    js.configs.recommended,
    
    // Ignore patterns
    {
        ignores: ["**/node_modules/", "**/build/", "**/dist/"],
    },

    // TypeScript configuration
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            import: importPlugin,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",
            parserOptions: {
                project: "./tsconfig.json",
            },
            globals: {
                console: "readonly",
                fetch: "readonly",
                document: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                navigate: "readonly",
                __dirname: "readonly",
                window: "readonly",
                localStorage: "readonly",
            }
        },

        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",
                },
            },
        },

        // Merge all the rules from your plugins
        rules: {
            // Prettier rules
            "prettier/prettier": "error",

            // TypeScript rules
            ...typescriptEslint.configs.recommended.rules,
            ...typescriptEslint.configs["recommended-requiring-type-checking"].rules,
            "@typescript-eslint/consistent-type-imports": "error",
            "@typescript-eslint/member-ordering": "error",
            "@typescript-eslint/method-signature-style": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-implied-eval": "error",
            "@typescript-eslint/promise-function-async": "error",
            "@typescript-eslint/return-await": "error",
            "@typescript-eslint/no-unnecessary-condition": "error",

            // React rules
            ...reactPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/no-unescaped-entities": "off",
            "react/jsx-closing-bracket-location": ["error", {
                location: "line-aligned",
            }],
            "react/jsx-first-prop-new-line": ["error", "multiline"],
            "react/jsx-fragments": "error",
            "react/jsx-no-useless-fragment": "error",
            "react/jsx-pascal-case": ["error", {
                allowAllCaps: true,
                allowNamespace: true,
            }],
            "react/jsx-props-no-multi-spaces": "error",
            "react/jsx-tag-spacing": ["error", {
                beforeClosing: "never",
            }],
            "react/self-closing-comp": "error",

            // React Hooks rules
            ...reactHooksPlugin.configs.recommended.rules,
            "react-hooks/exhaustive-deps": "error",
            "react-hooks/rules-of-hooks": "error",

            // Import rules
            "import/order": ["error", {
                groups: [
                    ["builtin", "external"],
                    ["internal", "sibling", "parent", "index", "object"]
                ],
                pathGroups: [
                    {
                        pattern: "react",
                        group: "builtin",
                        position: "before",
                    },
                    {
                        pattern: "**/*.json",
                        group: "object",
                        position: "after",
                    }
                ],
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
                "newlines-between": "always",
                warnOnUnassignedImports: true,
            }],
            "import/no-named-as-default": "error",

            // General ESLint rules
            "no-useless-return": "error",
            "no-console": "warn",
            "no-var": "error",
            "prefer-const": "error",
            "prefer-promise-reject-errors": "error",
            "prefer-regex-literals": "error",
            radix: "error",
        },
    }
];