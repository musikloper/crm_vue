'use strict'
var webpack = require('webpack');
const path = require( 'path' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );


module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
      new CKEditorWebpackPlugin( {
          // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
          language: 'en',
          addMainLanguageTranslationsToAllAssets: true,
          buildAllTranslationsToSeparateFiles: true,
      } )
    ]
  },
  // Vue CLI would normally use its own loader to load .svg and .css files, however:
//	1. The icons used by CKEditor must be loaded using raw-loader,
//	2. The CSS used by CKEditor must be transpiled using PostCSS to load properly.
  chainWebpack: config => {
    // (1.) To handle editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule( 'svg' );

    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add( path.join( __dirname, 'node_modules', '@ckeditor' ) );

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
        .rule( 'cke-svg' )
        .test( /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/ )
        .use( 'raw-loader' )
        .loader( 'raw-loader' );

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule( 'cke-css' )
      .test( /ckeditor5-[^/\\]+[/\\].+\.css$/ )
      .use( 'postcss-loader' )
      .loader( 'postcss-loader' )
      .tap( () => {
          return styles.getPostCssConfig( {
              themeImporter: {
                  themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
              },
              minify: true
          } );
      } );
  },
  devServer: {
    proxy: { // proxyTable 설정
      '/api': {
        target: 'https://localhost',
        changeOrigin: true
      },
      '/managers': {
        target: 'https://localhost',
        changeOrigin: true
      },
      '/Thumbnail': {
        target: 'https://localhost',
        changeOrigin: true
      },
      '/objects': {
        target: 'https://localhost',
        changeOrigin: true
      },
    }
  },
  outputDir: 'C:/Users/David/Desktop/levert/nest/crm/vue'
}