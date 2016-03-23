# mdl-ext

[![travis build](https://img.shields.io/travis/leifoolsen/mdl-ext.svg?style=flat-square)](https://travis-ci.org/leifoolsen/mdl-ext)
[![codecov coverage](https://img.shields.io/codecov/c/github/leifoolsen/mdl-ext.svg?style=flat-square)](https://codecov.io/github/leifoolsen/mdl-ext)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/mdl-ext.svg?style=flat-square)](http://npm.im/mdl-ext)

Material Design Lite Ext (MDLEXT).
Components built with the [Google Material Design Lite](https://github.com/google/material-design-lite) framework.

## Install
If you haven't done so already, install [Material Design Lite](https://github.com/google/material-design-lite).

```sh
$ npm install --save material-design-lite
```

Install **mdl-ext**
```sh
$ npm install --save mdl-ext
```

## Getting started

### Use it in your (static) page
```html
<!DOCTYPE html>
<html>
<head>
  <title>Material Design Lite Extensions</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="node_modules/material-design-lite/material.css" />
  <link rel="stylesheet" href="node_modules/mdl-ext/lib/mdl-ext.min.css" />
</head>
<body>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <main class="mdl-layout__content">
  </main
</div>
<script type="text/javascript" src="node_modules/material-design-lite/material.min.js" charset="utf-8"></script>
<script type="text/javascript" src="node_modules/mdl-ext/lib/index.min.js" charset="utf-8"></script>
</body>
</html>
```
>**Note:** Always import `mdl-ext` css **after** `material` css. Adjust path to `node_modules` according to where your HTML file is located. 

### Use it in your (Webpack) build

**Import SASS files**

```scss
@charset "UTF-8";

// 1. Import MDL
@import '../node_modules/material-design-icons/iconfont/material-icons.css';
@import '../node_modules/roboto-fontface/css/roboto-fontface.css';
@import '../node_modules/material-design-lite/src/material-design-lite';

// 2. Import MDLEXT
@import '../node_modules/mdl-ext/src/mdl-ext';
@import '../node_modules/mdl-ext/accordion/accordion';
@import '../node_modules/mdl-ext/selectfield/selectfield';
@import '../node_modules/mdl-ext/bordered-fields/bordered-fields';
@import '../node_modules/mdl-ext/lightboard/lightboard';
@import '../node_modules/mdl-ext/lightboard/lightboard-media-queries';

// 3. Your stuff
@import 'stylesheets/variables';
@import 'stylesheets/app/whatever';
```
>Imports above assumes that your main SASS file is located in the `./src` folder. Adjust path to `node_modules` according to where your SASS file is located. 

**Import material-design-lite and mdl-ext scripts in your "main" js file**
```javascript
import 'material-design-lite/material';
import 'mdl-ext';
```

**... or require material-design-lite and mdl-ext**
```javascript
require('material-design-lite/material');
require('mdl-ext');
```
 
## Components

### Accordion
![Accordion](./etc/flexbox-accordion.png)

A [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) friendly [**accordion**](./src/accordion/) component with vertcial or horizontal layout.

### Bordered fields
![Bordered fields](./etc/bordered-fields-theme.png)

The Material Design Lite Ext (MDLEXT) [**bordered fields**](./src/bordered-fields/) component demonstrates how you can create your own theme of MDL text fields.

### Lightboard
![Lightboard](./etc/lightboard.png)

A [**lightboard**](./src/lightboard/) is a translucent surface illuminated from behind, used for 
situations where a shape laid upon the surface needs to be seen with high contrast. In the "old days" 
of photography photograpers used a lightboard to get a quick view of, sorting and organizing their slides. 


### Selectfield
![Selectfield](./etc/select-element.png)

The Material Design Lite Ext (MDLEXT) [**select field**](./src/selectfield/) component is an enhanced version 
of the standard [HTML `<select>`] (https://developer.mozilla.org/en/docs/Web/HTML/Element/select) element.

## Notes
>To see the MDLEXT components in action, after download/clone/install, open the [demo/index.html](./demo/index.html) in a browser.

>You can also download or clone a demo project from here: https://github.com/leifoolsen/mdl-webpack. The demo project demonstrates
how you can set up MDL with Babel(6) and Webpack, and how to self host Font Roboto and Material Icons in your web application.

## Licence
© Leif Olsen, 2016. Licensed under an [Apache-2](https://github.com/leifoolsen/mdl-ext/blob/master/LICENSE) license.

This software is built with the [Google Material Design Lite](https://github.com/google/material-design-lite) framework, 
which is licenced under an Apache-2 licence.
