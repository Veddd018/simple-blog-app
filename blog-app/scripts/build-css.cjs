const fs = require('fs')
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

const input = fs.readFileSync('./src/index.css', 'utf8')

postcss([tailwind(), autoprefixer()])
  .process(input, { from: './src/index.css', to: './dist/tailwind.css' })
  .then(result => {
    if (!fs.existsSync('./dist')) fs.mkdirSync('./dist')
    fs.writeFileSync('./dist/tailwind.css', result.css)
    console.log('Wrote dist/tailwind.css')
    if (result.map) fs.writeFileSync('./dist/tailwind.css.map', result.map.toString())
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
