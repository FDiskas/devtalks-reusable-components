# Next Project from scratch with reusable components

> Repository: https://github.com/FDiskas/devtalks-reusable-components

## Requirements

> use google how to install or register

- NodeJs
- NPM + YARN
- npmjs.com account
- github.com account

## Setup boilerplate

### Create empty project

1. `npx create-next-app --example with-typescript nextjs-blog`
1. ` cd nextjs-blog`
1. `code .`

### Setup environment

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
     typescript-plugin-css-modules \
     rimraf \
     copyfiles
   ```
1. Create folder `src` and move the following `components`, `pages`, `interfaces`, `utils` folders with all contents to `src`

```
- src
  |- components
  |- interfaces
  |- pages
  |- utils

```

### Configure settings

1. Edit `.gitignore` file and replace `/node_modules` with `node_modules/` and `/build` with `build/`
   > This will allow us to ignore such folders also deeper within nested folders
1. Edit `.eslintrc.json` and replace `"prettier/@typescript-eslint",` with `"plugin:prettier/recommended"`
1. Add new rule to `eslintrc.json`
   ```json
   "react/prop-types": "off", // Types are handled by typescript
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

### IDE Configs

> Restart your IDEA before starting

#### vscode IDEA

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

#### IntelliJ IDEA

1. In the **Settings/Preferences** dialog <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd>, go to **Languages and Frameworks | JavaScript | Prettier**.

1. Choose the Node.js interpreter to use. This can be a local Node.js interpreter or a [Node.js on Windows Subsystem for Linux](https://www.jetbrains.com/help/idea/developing-node-js-applications.html#ws_node_wsl).

1. From the Prettier package list, select the prettier installation to use.

1. IntelliJ IDEA locates the prettier package itself and the field is filled in automatically.

1. To run Prettier automatically against specific files, open the **Settings/Preferences** dialog <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>, go to **Languages and Frameworks | JavaScript | Prettier**, and use the **On code reformatting** and **On save** checkboxes to specify the actions that will trigger Prettier.

## Setup workspace

To reuse our components in other projects we need make them independent from current project

1. Create `package.json` within `src/components` directory
   ```
   yarn init -y
   ```
1. Open generated `package.json` and change package name to scoped name. Use your npmjs.com account username

   ```json
   "name": "@fdiskas/devtalks-ui",
   ```

1. Add `react` and `react-dom` as peer dependency. Thous packages should be installed in user side

   ```json
   "peerDependencies": {
      "@types/react": "^16.8.6 || ^17.0.0",
      "react": "^16.8.0 || ^17.0.0",
      "react-dom": "^16.8.0 || ^17.0.0"
   },
   "peerDependenciesMeta": {
    "@types/react": {
      "optional": true
    }
   },
   ```

1. Create a workspace by adding to the root `package.json`. [More info about yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

   ```json
   "private": true,
   "workspaces": [
     "src/components"
   ]
   ```

1. Create demo script at `src/components/package.json` add

   ```json
   "scripts": {
     "build": "echo 'yeee'"
   },
   ```

1. Test it - should print to console `yeee`
   ```
   yarn workspace @fdiskas/devtalks-ui build
   ```

## Prepare component to be build independent from main project

1. Install rollup bundler and dependencies
   ```
   yarn workspace @fdiskas/devtalks-ui add -D \
     rollup \
     @rollup/plugin-commonjs \
     rollup-plugin-typescript2 \
     rollup-plugin-postcss \
     rollup-plugin-copy \
     @rollup/plugin-image \
     rollup-plugin-node-resolve \
     rollup-plugin-peer-deps-external
   ```
1. Create config file in `src/components/rollup.config.js`

   ```js
   import commonjs from '@rollup/plugin-commonjs';
   import typescript from 'rollup-plugin-typescript2';
   import postcss from 'rollup-plugin-postcss';
   import copy from 'rollup-plugin-copy';
   import image from '@rollup/plugin-image';
   import resolve from 'rollup-plugin-node-resolve';
   import peerDepsExternal from 'rollup-plugin-peer-deps-external';

   let override = {
     compilerOptions: {
       jsx: 'react',
       declaration: true,
       module: 'ESNext',
       declarationDir: 'src/components/typings'
     }
   };

   export default {
     input: './index.ts',
     output: [
       {
         dir: 'build',
         format: 'cjs',
         sourcemap: false,
         exports: 'named'
       },
       {
         dir: 'build/esm',
         format: 'esm',
         sourcemap: false,
         exports: 'named'
       }
     ],
     preserveModules: true,
     external: ['react', 'react-dom'],
     plugins: [
       peerDepsExternal(),
       resolve({ browser: true }),
       commonjs({
         include: /node_modules/,
         exclude: ['node_modules/process-es6/**'],
         requireReturnsDefault: 'preferred',
         esmExternals: true
       }),
       image(),
       typescript({
         tsconfig: '../../tsconfig.json',
         useTsconfigDeclarationDir: true,
         tsconfigOverride: override
       }),
       postcss({
         modules: true,
         inject: false,
         extract: true,
         config: { path: 'src/components/postcss.config.js' }
       }),
       copy({
         targets: [
           {
             src: 'typings/components',
             dest: 'build/typings'
           }
         ]
       })
     ]
   };
   ```

1. Refactor `src/components` according to eslint rules.
1. Refactor components as be as named export
1. eslint will complain that preferred way is use default export - to fix that edit `.eslintrc.json` and add new rule: [more info here](https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html)

   ```json
   "import/prefer-default-export": "off",
   ```

1. Create build scripts at `src/components/package.json`

   ```json
     "scripts": {
       "prebuild": "rimraf build typings",
       "build": "rollup -c",
       "postbuild": "copyfiles -f 'typings/components/**/*' build/typings && rimraf typings"
     },
   ```

1. Specify where main files are

   ```json
    "main": "build/index.js",
    "module": "build/esm/index.js",
    "typings": "build/typings/index.d.ts",
    "files": [
      "build/**/*"
    ],
   ```

1. Test the build scripts - run from the root of your project

   ```
   yarn workspace @fdiskas/devtalks-ui build
   ```

1. Check contents of `src/components/build`
   ```
   npm pack
   ```

## Setup CD

We will use github to publish our component on git TAG

1. Create new file `.github/workflows/npm-publish.yml`

   ```yml
   name: Publish Package

   on:
     create:
       tags:
         - v*

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: 14.x
         - run: yarn install --frozen-lockfile
         - run: yarn build
         - run: yarn workspace @fdiskas/devtalks-ui build

     publish-npm:
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: 14.x
             registry-url: https://registry.npmjs.org
             always-auth: true
         - run: yarn install --frozen-lockfile
         - run: yarn workspace @fdiskas/devtalks-ui build
         - run: yarn workspace @fdiskas/devtalks-ui version --new-version "${GITHUB_REF:11}" --no-git-tag-version
         - run: yarn workspace @fdiskas/devtalks-ui publish --access public
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

     publish-gpr:
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: 14.x
             registry-url: https://npm.pkg.github.com
         - run: yarn install --frozen-lockfile
         - run: yarn workspace @fdiskas/devtalks-ui build
         - run: yarn workspace @fdiskas/devtalks-ui version --new-version "${GITHUB_REF:11}" --no-git-tag-version
         - run: yarn workspace @fdiskas/devtalks-ui publish --access public
           env:
             NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

1. Login to npm

   ```
   npm login
   ```

1. Open file on your home directory `~/.npmrc` and copy value of:

   ```
   //registry.npmjs.org/:_authToken=********
   ```

1. Go to github repository settings `settings/secrets/actions/new`
1. Create New secret Name: `NPM_TOKEN` value your auth token
1. Go to github repository and create new release `releases/new`
1. Add your first tag `v1.0.1` and additional release info
1. Click <kbd>Publish release</kbd> and check how CI is running `actions/`
