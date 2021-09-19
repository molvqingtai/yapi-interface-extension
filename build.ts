#!/usr/bin/env node

import { build } from 'esbuild'
import glob from 'glob'
import { $ } from 'zx'

const isDevelop = process.env.NODE_ENV === 'develop'
const files = glob.sync('src/**/*.ts')

void (async () => {
  console.time('Build Success')
  await $`rm -rf dist`
  await build({
    entryPoints: files,
    outdir: 'dist',
    target: ['esnext'],
    bundle: true,
    minify: true,
    format: 'esm',
    watch: isDevelop,
    sourcemap: isDevelop ? 'inline' : false
  }).then(async (res) => {
    await $`cp -r public/* dist`
    console.timeEnd('Build Success')
    isDevelop && console.log('Watch files...')
  })
})().catch((error) => {
  console.log(error)
})
