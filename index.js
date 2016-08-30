/* jshint node: true */
'use strict';

var defaults = {
  css: true,
  javascript: true,
  fonts: true,
  images: true,
  path: 'bower_components/semantic-ui/dist',
  theme: 'default'
};

var getWithDefault = function(property, default_property) {
  if (property === null || property === undefined) {
    return default_property;
  }

  return property;
};

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    var options = (app && app.options['SemanticUI']) || {};
    var path = getWithDefault(options['path'], defaults['path']);
    var theme = getWithDefault(options['theme'], defaults['theme']);

    if (getWithDefault(options['css'], defaults['css'])) {
      app.import({
        development: path + '/semantic.css',
        production: path + '/semantic.min.css'
      });
    }

    if (getWithDefault(options['javascript'], defaults['javascript'])) {
      app.import({
        development: path + '/semantic.js',
        production: path + '/semantic.min.js'
      });
    }

    if (getWithDefault(options['images'], defaults['images'])) {
      var imageOptions = { destDir: 'assets/themes/' + theme + '/assets/images' };
      app.import(path + '/themes/' + theme + '/assets/images/flags.png', imageOptions);
    }

    if (getWithDefault(options['fonts'], defaults['fonts'])) {
      var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff','.woff2'];
      var fontOptions = { destDir: 'assets/themes/' + theme + '/assets/fonts' };
      for (var i = fontExtensions.length - 1; i >= 0; i--) {
        app.import(path + '/themes/' + theme + '/assets/fonts/icons'+fontExtensions[i], fontOptions);
      }
    }
  }
};
