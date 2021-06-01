let generateIconConfig = require('./generateIconConfig')

module.exports = (opts = {}) => {
  let fontAwesomePro = opts.fontAwesomePro || false
  // let fontFamily = opts.fontFamily || (fontAwesomePro ? 'Font Awesome 5 Pro' : 'Font Awesome 5 Pro')

  let icons = generateIconConfig({fontAwesomePro})

  return {
    postcssPlugin: 'postcss-font-awesome',
    Declaration: {
      content: decl => {
        let theIcon = ''

        // Test to see if the content's value has an `fa-` in it
        if (/fa-/i.test(decl.value)) {
          let theIconFa = /fa-([a-z-]*)/i.exec(decl.value)

          // Test to see if the icon actually exists
          if (theIconFa[1]) {
            theIcon = `\\f${icons[theIconFa[1]]}`

            // decl.cloneBefore({
            //     prop: 'font-family',
            //     value: fontFamily,
            // })
          }

          let newValue = decl.value.replace(/fa-[a-z-]*/i, theIcon)

          decl.value = newValue
        }
      },
      'font-awesome': decl => {
        let iconValue = decl.value

        // Get our unicode value if it exists
        if (icons[decl.value]) {
          iconValue = `'\\f${icons[decl.value]}'`
        }
  
        if (opts.replacement) {
          // Add core properties that are normally on the fa- class
          // https://github.com/FortAwesome/Font-Awesome/blob/master/scss/_core.scss#L10-L16
          decl.cloneAfter({
            prop: '-moz-osx-font-smoothing',
            value: 'grayscale'
          })
          decl.cloneAfter({
            prop: '-webkit-font-smoothing',
            value: 'antialiased'
          })
          decl.cloneAfter({
            prop: 'display',
            value: 'inline-block'
          })
          decl.cloneAfter({
            prop: 'font-style',
            value: 'normal'
          })
          decl.cloneAfter({
            prop: 'font-variant',
            value: 'normal'
          })
          decl.cloneAfter({
            prop: 'text-rendering',
            value: 'auto'
          })
          decl.cloneAfter({
            prop: 'line-height',
            value: 1
          })
  
          // Since we want the whole font awesome styles involved we need
          // to put the unicode on a pseudo element instead of the selector
          let before = decl.parent.cloneAfter({
            nodes: [],
            selectors: decl.parent.selectors.map(i => i + '::before')
          })
          before.append('content: ' + iconValue)
        } else {
          decl.cloneAfter({
            prop: 'content',
            value: iconValue
          })
  
          // Only add the font family if the icon exists
          // if (icons[decl.value]) {
          //     decl.cloneAfter({
          //         prop: 'font-family',
          //         value: fontFamily, // TODO: Make this configurable
          //     })
          // }
        }
  
        // we don't want the font-awesome property persisting
        decl.remove()
      }
    }
  }
}

module.exports.postcss = true