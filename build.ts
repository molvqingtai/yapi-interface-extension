#!/usr/bin/env node

import { build } from 'esbuild'
import glob from 'glob'
import fs from 'fs-extra'
import { $, chalk } from 'zx'

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
    try {
      await $`cp -r public/* dist`
      if (isDevelop) {
        // 使用 tsc 做类型检查，不生成编译文件
        await $`tsc --watch --noEmit`
      } else {
        await $`tsc --noEmit`
        const { version } = await fs.readJSON('package.json')
        await $`zip -q -r yapi-interface-extension-v${version}.zip dist`
      }
      console.timeEnd('Build Success')
    } catch (error) {
      res.stop?.()
      throw error
    }
  })
})().catch((error) => {
  console.error(chalk.red(error))
})
