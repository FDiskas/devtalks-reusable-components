# Next Project from scratch with reusable components

## Create empty project

1. `npx create-next-app --example with-typescript nextjs-blog`
1. ` cd nextjs-blog`
1. `code .`

## Setup environment

1. `npm i -g mrm`
1. `mrm editorconfig -i`
1. `mrm prettier -i`
1. `mrm eslint -i` type `airbnb-typescript`
1. `yarn add -D eslint-plugin-prettier`
1. install other dependencies
   ```
   yarn add -D \
     eslint-plugin-import \
     eslint-plugin-jsx-a11y \
     eslint-plugin-react \
     eslint-plugin-react-hooks \
     @typescript-eslint/eslint-plugin \
     typescript-plugin-css-modules
   ```
1. Create folder `src` and move the following `components`, `pages`, `interfaces`, `utils` folders with all contents to `src`

```
- src
  |- components
  |- interfaces
  |- pages
  |- utils

```

## Configure settings

1. Edit `.eslintrc.json` and replace `"prettier/@typescript-eslint",` with `"plugin:prettier/recommended"`
1. Add new rule to `eslintrc.json`
   ```json
   "jsx-a11y/anchor-is-valid": [
     "error",
     {
       "components": ["Link"],
       "specialLink": ["hrefLeft", "hrefRight"],
       "aspects": ["invalidHref", "preferButton"]
     }
   ]
   ```
1. Edit `.prettierrc` add to the top
   ```
     "singleQuote": true,
     "trailingComma": "es5",
     "printWidth": 100,
   ```
1. Edit `tsconfig.json` and add to "compilerOptions"
   ```json
   "baseUrl": "./",
   "plugins": [
     {
       "name": "typescript-plugin-css-modules",
       "options": {
         "classnameTransform": "camelCase",
         "customMatcher": "\\.module\\.scss$"
       }
     }
   ]
   ```

## IDE Config

1. Restart your IDE

### vscode users

1. Create file `.vscode/extensions.json`
   ```json
   {
     "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
   }
   ```
1. Install thous extensions
1. create file `.vscode/settings.json`
   ```json
   {
     "typescript.tsdk": "node_modules/typescript/lib",
     "editor.formatOnSave": true,
     "eslint.format.enable": true,
     "[typescriptreact]": {
       "editor.defaultFormatter": "dbaeumer.vscode-eslint"
     },
     "[json]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     },
     "[jsonc]": {
       "editor.defaultFormatter": "esbenp.prettier-vscode"
     },
     "eslint.probe": [
       "javascript",
       "javascriptreact",
       "typescript",
       "typescriptreact",
       "html",
       "markdown"
     ]
   }
   ```
