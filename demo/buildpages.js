'use strict';

// TODO: Automate this
const posthtml = require('posthtml');
const html = require('fs').readFileSync('partials/selectfield.html').toString();

posthtml()
  .use(require('posthtml-include')({ encoding: 'utf-8', root: 'partials/' }))
  .process(html/*, options */)
  .then(function(result) {
    console.log(result.html);
  })
  .catch(function(error) {
    console.error(error);
  });
