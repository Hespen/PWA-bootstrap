/* eslint-disable max-len, import/no-unresolved */
import {assets, scripts} from './fragments';
import assetsManifest from '../../build/client/assetsManifest.json';

export default {
  earlyChunk(route) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
          <link rel="preconnect" href="//static.cdn.com">
          <link rel="preconnect" href="//images.cdn.com">

          <link rel="preload" type="text/javascript" as="script" href="${assets.webpackManifest.js}">
          <link rel="preload" type="text/javascript" as="script" href="${assets.vendor.js}">
          <link rel="preload" type="text/javascript" as="script" href="${assets.main.js}">
          
          ${!assets[route.name] ? '' : `<link rel="preload" as="script" href="${assets[route.name].js}">`}`;

  },

  lateChunk(app, head, initialState, route) {
    return `
          ${__LOCAL__ ? '' : `<style>${assets.vendor.styles}</style>`}
          ${__LOCAL__ ? '' : `<style>${assets.main.styles}</style>`}
          ${__LOCAL__ || !assets[route.name] ? '' : `<style id="${route.name}.css">${assets[route.name].styles}</style>`}
          ${__LOCAL__ ? '' : '<link rel="manifest" href="/manifest.json">'}
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="application-name" content="PWA">
          <meta name="apple-mobile-web-app-title" content="PWA">
          <meta name="theme-color" content="#5500eb">
          <meta name="msapplication-navbutton-color" content="#5500eb">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
          <meta name="msapplication-starturl" content="/">
          <link rel="icon" type="image/png" sizes="256x256" href="http://www.fancyicons.com/free-icons/232/cinema/png/256/the_flash_sign_256.png">
          <link rel="apple-touch-icon" type="image/png" sizes="256x256" href="http://www.fancyicons.com/free-icons/232/cinema/png/256/the_flash_sign_256.png">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
          ${head.title.toString()}
          ${head.meta.toString()}
          ${head.link.toString()}
          ${head.script.toString()}
        </head>
        <body>
          <div id="root">${app}</div>
          <script type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
          <script type="text/javascript">window.__ASSETS_MANIFEST__ = ${JSON.stringify(assetsManifest)}</script>
          <script src="${assets.webpackManifest.js}" type="text/javascript"></script>
          <script src="${assets.vendor.js}" type="text/javascript"></script>
          <script src="${assets.main.js}" type="text/javascript"></script>
          <script>
//           if ('serviceWorker' in navigator) {
//              navigator.serviceWorker.register('/build/client/sw.js')
//              .then(function(swReg) {
//                swRegistration = swReg;
//                console.log('registration succesfull', swRegistration);
//              })
//              .catch(function(error) {
//                console.error('Service Worker Error', error);
//              });
//            }
         </script>
         </body>
      </html>`;
  },
};
