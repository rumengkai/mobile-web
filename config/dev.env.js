var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"sit"',
	BASE_API: '"http://dev.kofuf.com"',
	NIM_App_Key: '"17ea242b45483d8b7ba72ab7d8dbd571"'
})
