const { defineTest } = require('jscodeshift/dist/testUtils')

defineTest(__dirname, 'transform', null, 'simple-class-component')
defineTest(__dirname, 'transform', null, 'simple-functional-component')
defineTest(__dirname, 'transform', null, 'slightly-complicated-proptypes')
