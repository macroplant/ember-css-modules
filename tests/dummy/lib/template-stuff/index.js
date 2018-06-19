/* eslint-env node */
/* eslint node/no-extraneous-require:off */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = {
  name: 'template-stuff',

  isDevelopingAddon() {
    return true;
  },

  included() {
    this._super.included.apply(this, arguments);

    if (EmberApp.env() === 'test') {
      this.import('node_modules/ember-source/dist/ember-template-compiler.js');
      this.import('vendor/ecm-template-transform.js', {
        using: [{ transformation: 'amd', as: 'ecm-template-transform' }]
      });
    }
  },

  treeForVendor() {
    const Rollup = require('broccoli-rollup');
    return new Rollup(`${__dirname}/../../../../lib`, {
      rollup: {
        input: 'htmlbars-plugin/index.js',
        plugins: [
          require('rollup-plugin-commonjs')(),
          require('rollup-plugin-node-resolve')()
        ],
        output: {
          file: 'ecm-template-transform.js',
          format: 'umd',
          name: 'ecm-template-transform'
        }
      }
    });
  }
};
