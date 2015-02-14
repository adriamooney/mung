Package.describe({
  name: 'adriamooney:bootswatch-cyborg',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api){
    api.versionsFrom('1.0.3.1');
    var clientFiles=[
        // css
        "css/bootstrap.cyborg.min.css",
        // fonts
        "fonts/glyphicons-halflings-regular.eot",
        "fonts/glyphicons-halflings-regular.svg",
        "fonts/glyphicons-halflings-regular.ttf",
        "fonts/glyphicons-halflings-regular.woff",
        "fonts/glyphicons-halflings-regular.woff2",

        //js
        'js/bootstrap.min.js'
    ];
    api.addFiles(clientFiles,"client");
});


Package.onTest(function(api) {
  api.use('tinytest');
  api.use('adriamooney:bootswatch-cyborg');
  api.addFiles(['adriamooney:bootswatch-cyborg-tests.js, bootstrap.cyborg.min.css'], 'client');
});


