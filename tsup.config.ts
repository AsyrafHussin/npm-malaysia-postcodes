import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';

// Read package.json for version
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const banner = `/*!
 * 
 *   malaysia-postcodes v${packageJson.version} (https://github.com/AsyrafHussin/npm-malaysia-postcodes)
 *   Copyright 2020-2025 Asyraf Hussin
 *   Licensed under ISC (https://github.com/AsyrafHussin/npm-malaysia-postcodes/blob/main/LICENSE)
 *
 */`;

export default defineConfig([
  // ES Modules and CommonJS for Node.js
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    outDir: 'dist',
    banner: {
      js: banner
    },
    outExtension({ format }) {
      return {
        js: format === 'cjs' ? '.cjs' : '.js'
      };
    }
  },
  // Browser IIFE build with banner
  {
    entry: { 'malaysia-postcodes': 'src/index.ts' },
    format: ['iife'],
    globalName: 'malaysiaPostcodes',
    outDir: 'dist',
    banner: {
      js: banner
    },
    minify: false,
    clean: false,
    outExtension() {
      return {
        js: '.js'
      };
    }
  },
  // Minified browser IIFE build
  {
    entry: { 'malaysia-postcodes.min': 'src/index.ts' },
    format: ['iife'],
    globalName: 'malaysiaPostcodes',
    outDir: 'dist',
    banner: {
      js: banner
    },
    minify: true,
    clean: false,
    outExtension() {
      return {
        js: '.js'
      };
    }
  }
]);
