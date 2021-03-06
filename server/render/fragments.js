/* eslint-disable max-len, import/no-unresolved */
import fs from 'fs';
import assetsManifest from '../../build/client/assetsManifest.json';

export const assets = Object.keys(assetsManifest)
  .reduce((obj, entry) => ({
    ...obj,
    [entry]: {
      ...assetsManifest[entry],
      styles: assetsManifest[entry].css
        ? fs.readFileSync(`build/client/css/${assetsManifest[entry].css.split('/').pop()}`, 'utf8')
        : undefined,
    },
  }), {});
