const path = require('path')
const LineByLine = require('n-readlines')

function generateIconConfig (opts = { fontAwesomePro: false }) {
    let config = {
        src: path.resolve(
            'node_modules',
            '@fortawesome',
            opts.fontAwesomePro ? 'fontawesome-pro' : 'fontawesome-free',
            'scss',
            '_variables.scss'
        )
    }

    let icons = {}

    let liner = new LineByLine(config.src)
    let line = null

    while ((line = liner.next())) {
        let str = line.toString()

        if (str !== undefined && str !== '' && str.startsWith('$fa-var-')) {
            let icon = str
                .substring(0, str.indexOf(':'))
                .replace('$fa-var-', '')

            let code = str
                .substring(str.indexOf('\\f'), str.indexOf(';'))
                .replace('\\f', '')

            icons[icon] = code
        }
    }

    return icons
}

module.exports = generateIconConfig
