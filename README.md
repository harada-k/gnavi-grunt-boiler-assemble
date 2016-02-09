# gnavi-grunt-boiler-assemble


# version

- 1.1.0

# config
---

## install

### install

    npm install

### sprite

    grunt sprite

### build

    grunt


## build command

### for Product

    grunt

### for dev

    grunt dev

### for local

    grunt local


## watch command

    grunt watch


## sprite command

    grunt sprite


## es-lint, jshint command

    grunt test


## clean dist/、tmp/ command

    grunt clean




# package
---

## package installed

- "babel-polyfill": "^6.5.0"
- "babel-preset-es2015": "^6.5.0"
- "eslint-config-gnavi": "0.0.8"
- "grunt": "^0.4.5"
- "grunt-assemble": "^0.4.0"
- "grunt-autoprefixer": "^3.0.0"
- "grunt-babel": "^6.0.0"
- "grunt-cli": "^0.1.13"
- "grunt-contrib-clean": "^0.6.0"
- "grunt-contrib-compass": "^1.0.4"
- "grunt-contrib-concat": "^0.5.0"
- "grunt-contrib-copy": "^0.8.0"
- "grunt-contrib-cssmin": "^0.13.0"
- "grunt-contrib-jshint": "^0.11.2"
- "grunt-contrib-sass": "^0.8.1"
- "grunt-contrib-uglify": "^0.5.1"
- "grunt-contrib-watch": "^0.6.1"
- "grunt-csscomb": "^3.0.0"
- "grunt-csso": "^0.6.3"
- "grunt-eslint": "^17.1.0"
- "grunt-spritesmith": "^4.5.2"
- "grunt-styledocco": "^0.2.1"
- "handlebars-helper-minify": "^0.1.3"
- "handlebars-helpers": "^0.5.8"
- "jit-grunt": "^0.9.1"
- "stylestats": "^5.4.2"
- "time-grunt": "^1.2.1"


# ルートディレクトリ構成
---

    bin/ ： ビルド・デプロイシェル
    dist/ ： 出力ディレクトリ
    src/ ： 開発ディレクトリ
    tmp/ ： 中間生成物一時保管ディレクトリ
    .editorconfig
    .gitignore
    Gruntfile.js
    Makefile ： ビルド・デプロイシェル
    package.json
    README.md
    stats.csv ： stylestatsファイル


# 開発ディレクトリ構成
---

編集対象は src/ 以下のみ

    src/
      └ hbs/ ： handlebars view
        └ data/ ： data
        └ html/ ： page
        └ include/ ： parts
        └ layout/ ： layout
      └ img/ ： 画像
      └ js/ ： js
      └ scss/ ： sass
        └ all/ ： all.css
      └ sprite/ ： sprite画像












