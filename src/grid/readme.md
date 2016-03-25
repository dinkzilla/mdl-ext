# Grid

![Grid](../../etc/grid.png)

A responsive **grid** based on **element queries** in favour of media queries.

## Introduction
Grids provide users with a way to view content in an organized manner that might otherwise be difficult to 
understand or retain. Their design and use is an important factor in the overall user experience.

The Material Design Lite Ext (MDLEXT) grid is based on **element queries** in favour of media queries.
It is a copy of the [Material Design Lite grid](https://github.com/google/material-design-lite/tree/master/src/grid) - which uses media queries to distribute grid cells.

### Responsive breakpoints
A common metod used to design a responsive grid is to use media queries to apply styles based on device
characteristics. The problem with media queries is that they relates to the viewport - so every time you
write a media query for max-width or min-width, you’re connecting the appearance of your module to the
width of the entire canvas not the part of the canvas the component occupies.

#### Media queries are a hack
Some developers claim that [media queries are a hack](http://ianstormtaylor.com/media-queries-are-a-hack/),
and I totally agree! Imagine a design with a sidebar and a content area. In a responsive,
fluent design both the sidebar and the content has "unknown" widths. Trying to add a responsive grid into the content
area which relies on media queries, where you have no knowledge of how much space the sidebar occupies, is
in my opinion almost an impossible task.

#### Element queries to the rescue
An element query is similar to a media query in that, if a condition is met, some CSS will be applied.
Element query conditions (such as min-width, max-width, min-height and max-height) are based on elements,
instead of the browser viewport. Unfortunately, CSS doesn’t yet support element queries, but there are a
couple of JavaScript-based polyfills involving various syntaxes. **They are not standard - but that
should not stop us from using them.** Element-first design is the spirit of the Atomic design principle, but
looks very different in practice than how most people implement Atomic design using their mobile-first mindset.
Instead of writing styles on advance for every conceivable situation a widget my find itself in, we are able
to allow individual parts of the layout to adapt responsively when those elements require it.

Some of the polyfills available are:
* [eq.js](https://github.com/Snugug/eq.js)
* [EQCSS](https://github.com/eqcss/eqcss)
* [CSS Element Queries](https://github.com/marcj/css-element-queries)
* [BoomQueries](https://github.com/BoomTownROI/boomqueries)

These are all good libraries, and they serve the purpose. After some evaluation I decided to go for
[**eq.js**](https://github.com/Snugug/eq.js). It is a small library with support for width based breakpoints. 
It works without requiring a server to run (no Ajax stuff). It does not break the existing CSS standard. 
I can use SASS for styling. AND it works well in a Webpack workflow.

### How to use the eq.js version of MDLEXT grid

&nbsp;1. Install `eq,js`.
```sh
$ npm install --save eq,js
```

&nbsp;2. Import `mdl-ext-eqjs.scss` in your main SASS file. Remove `mdl-ext.scss`.
```css
@import '../node_modules/mdl-ext/src/mdl-ext-eqjs';
```

&nbsp;3. Require `eq.js` in your main.js file  
```javascript
const eqjs = require('eq.js');
```

&nbsp;4. Optionally trigger `eq.js`<br/>
If you're loading html fragments using e.g. Ajax, then trigger `eq.js` after page load.

```javascript
window.fetch(href, {method: 'get'})
 .then(response => response.text())
 .then(text => {
   contentPanelEl.insertAdjacentHTML('afterbegin', text);

   // Trigger eq.js
   eqjs.refreshNodes();
   eqjs.query(undefined, true);
})
.catch(err => console.error(err));
```

An example of how to use `eq.js` in a SPA can be found [here](https://github.com/leifoolsen/mdl-webpack).     

## To include a MDLEXT **grid** component:
Folow the documention for the [original mdl-grid](https://github.com/google/material-design-lite/blob/master/src/grid/README.md#to-include-an-mdl-grid-component). Just replace `mdl-` with `mdlext-`, and you're good to go. 
