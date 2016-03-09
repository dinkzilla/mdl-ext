# mdl-ext

Components based on the [Google Material Design Lite](https://github.com/google/material-design-lite) framework.

## Install
```sh
$ npm install --save mdl-ext
```

If you haven't done so already, install [Material Design Lite](https://github.com/google/material-design-lite) and [Material Design Icons](https://github.com/google/material-design-icons).

```sh
$ npm install --save-dev material-design-icons
$ npm install --save material-design-lite
```

Optionally install [Font Roboto](https://github.com/choffmeister/roboto-fontface-bower)
```sh
$ npm install --save-dev roboto-fontface"
```

## Getting started

### Use it in your page
```html
<!DOCTYPE html>
<html>
<head>
  <title>Material Design Lite Extensions</title>
  <link type="text/css" rel='stylesheet' href='node_modules/material-design-icons/iconfont/material-icons.css'>
  <link type="text/css" rel='stylesheet' href='node_modules/roboto-fontface/css/roboto-fontface.css'>
  <link type="text/css" rel="stylesheet" href="node_modules/material-design-lite/material.css" />
  <link type="text/css" rel="stylesheet" href="node_modules/mdl-ext/lib/mdl-ext.css" />
</head>
<body>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
  <main class="mdl-layout__content" style="padding: 0 16px">
  </main
</div>
<script type="text/javascript" src="node_modules/material-design-lite/material.js" charset="utf-8"></script>
<script type="text/javascript" src="node_modules/mdl-ext/lib/index.min.js" charset="utf-8"></script>
</body>
</html
```


### Use it in your (Webpack) build

**Import SASS files** 
```scss
// 1. Import Configuration and helpers
@import 'material-design-lite/src/variables';
@import 'material-design-lite/src/mixins';
@import 'mdl-ext/src/variables';
@import 'mdl-ext/src/mixins';

// 2. Import Components
@import 'mdl-ext/src/selectfield/selectfield';
```

**Import material-design-lite and mdl-ext**
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

### [Selectfield](./src/selectfield/)
![Selectfield](./etc/select-element.png)

The HTML ```<select>``` element represents a control that presents a menu of options. 
Material Design Lite does not provide it's own component for the ```<select>``` element.

### Components under development
* Accordion
* Bordered input fields

## Notes
You can download or clone a demo project from here: https://github.com/leifoolsen/mdl-webpack

## Licence
© Leif Olsen, 2016. Licensed under an [Apache-2](https://github.com/leifoolsen/mdl-ext/blob/master/LICENSE) license.

This software is built with the [Google Material Design Lite](https://github.com/google/material-design-lite) framework, 
which is licenced under an Apache-2 licence.
