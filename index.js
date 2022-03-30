module.exports = {
    plugins: ["import", "prettier", "unused-imports", "regex"],
    extends: ["plugin:prettier/recommended"],
    ignorePatterns: ["src/index.html"],
    rules: {
      // Prettier does its own thing, eslint should not enforce hard error here
      "prettier/prettier": "warn",
      // Do not allow code with a debugger present
      "no-debugger": ["error"],
      // Console warning and errors are okay, anything else is an error
      "no-console": ["error", { allow: ["warn", "error"] }],
      // No Bad imports
      // Importing incorrectly can cause build optimization issues
      "no-restricted-imports": ["error", { patterns: ["rxjs/internal/*"] }],
      // Order, alphabetize, and group imports
      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "src/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          groups: ["external", "internal", "parent", "sibling"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // Prefer const vs let.
      "prefer-const": ["warn"],
      // Require === or !== instead of == or != equality checks.
      // Smart allows you to == against typeof and null.
      eqeqeq: ["error", "smart"],
      // Don't allow unused imports
      "unused-imports/no-unused-imports-ts": "error",
      // Unused variables lead to messy code, sometimes you need a placeholder for an argument
      // that you are going to throw away. '_' is the javascript standard for "throw-away" variables
      "unused-imports/no-unused-vars-ts": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Don't allow focused tests
      "regex/invalid": [
        "error", [{
          "regex": "(fit\\()|(fdescribe\\()",
          "message": "Focused Tests are not allowed, please remove the `fit()` or `fdescribe()` from your spec file."
        },
        {
          "regex": "(xit\\()|(xdescribe\\()",
          "message": "Excluded Tests are not allowed, please remove the `fit()` or `fdescribe()` from your spec file."
        }]
      ],
    },
    overrides: [
      {
        files: ["*.js"],
        rules: {
          // JS files don't have types...
          "@typescript-eslint/explicit-function-return-type": ["off"],
          "@typescript-eslint/no-var-requires": ["off"],
        },
      },
      {
        files: ["*.component.html"],
        parser: "@angular-eslint/template-parser",
        plugins: ["@angular-eslint/template"],
        extends: ["plugin:@angular-eslint/template/recommended"],
        rules: {
          // Make sure your two-way binding is formatted correctly
          "@angular-eslint/template/banana-in-box": "error",
          // The async pipe emits null initially, before actually emitting what it's supposed to
          // If you negate that, the template can thrash on slow data load.
          "@angular-eslint/template/no-negated-async": "error",
        },
      },
      {
        files: ["*.ts"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          ecmaVersion: 2020,
          sourceType: "module",
        },
        plugins: ["@typescript-eslint"],
        rules: {
          "@typescript-eslint/no-empty-function": [
            "error",
            { allow: ["arrowFunctions"] },
          ],
          // We do this all over the place, to keep components
          // neat and tidy.
          "@typescript-eslint/no-use-before-define": [
            "warn",
            { functions: false },
          ],
          // Interfaces are PascalCase
          "@typescript-eslint/naming-convention": [
            "error",
            {
              selector: "interface",
              format: ["PascalCase"],
            },
          ],
          // Deprecated rule, fixed with the above rule
          "@typescript-eslint/interface-name-prefix": ["off"],
          // Set as a warning, because you really shouldn't have <any> types,
          // but we don't want to eternally nag you for not knowing the type.
          "@typescript-eslint/no-explicit-any": ["warn", { fixToUnknown: false }],
          // 3 rules below make it so that we can auto-remove unused imports.
          "@typescript-eslint/no-unused-vars": "off",
        },
      },
    ],
  };