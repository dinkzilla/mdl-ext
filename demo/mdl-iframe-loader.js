'use strict';

/**
 * Inject required CSS and JS into html fragment loaded into an <iframe>
 * @type {{}}
 */
var mdlIframeLoader = {};
(function(self) {

  // The CSS and JS needed to run MDL snippets in an <iframe>
  var docs = [
    { 'type': 'css', 'id': 'font-roboto-css',   'src': 'https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en' },
    { 'type': 'css', 'id': 'material-icon-css', 'src': 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    { 'type': 'css', 'id': 'material-css',      'src': 'node_modules/material-design-lite/material.css' },
    { 'type': 'css', 'id': 'mdlext-css',        'src': 'lib/mdl-ext-eqjs.css' },
    { 'type': 'css', 'id': 'demo-css',          'src': 'demo/demo.css' },
    { 'type': 'js',  'id': 'eq-js',             'src': 'node_modules/eq.js/dist/eq.min.js' },
    { 'type': 'js',  'id': 'material-js',       'src': 'node_modules/material-design-lite/material.js' },
    { 'type': 'js',  'id': 'mdlext-js',         'src': 'lib/index.js' }
  ];

  var joinOrigin = function(origin, src) {
    return src.startsWith('http') ? src : origin.concat(src);
  };

  var loadResources = function( origin, loadCompleted ) {
    var expectToLoad = docs.length;
    var filesLoaded = 0;

    for (var i = 0; i < docs.length; i++) {
      if (document.getElementById(docs[i].id) === null) {
        var el;
        var src = joinOrigin(origin, docs[i].src);

        if (docs[i].type === 'css') {
          el = document.createElement('link');
          el.href = src;
          el.rel = 'stylesheet';
          el.type = 'text/css';
        }
        else {
          el = document.createElement('script');
          el.src = src;
          el.type = 'text/javascript';
          el.async = false;
          el.charset = 'utf-8';
        }
        el.id = docs[i].id;
        el.onload = function () {
          filesLoaded++;
          if(filesLoaded >= expectToLoad) {
            loadCompleted();
          }
        };
        document.head.appendChild(el);
      }
      else {
        expectToLoad--;
      }
    }
  };

  /**
   * Inject required CSS and JS into html fragment loaded into an <iframe>
   * @param origin path relative to root of this project, e.g. "../../../
   */
  self.load = function( origin ) {
    loadResources( origin, function () {
      if(window.componentHandler) {
        window.componentHandler.upgradeDom();
      }
    });
  };

  return self;
})(mdlIframeLoader);
