const { defineTest } = require('jscodeshift/dist/testUtils')

defineTest(__dirname, 'transform', null, 'simple-class-component')
defineTest(__dirname, 'transform', null, 'simple-functional-component')
defineTest(__dirname, 'transform', null, 'slightly-complicated-proptypes')
defineTest(__dirname, 'transform', null, 'non-trivial-require-locations')
defineTest(__dirname, 'transform', null, 'multiple-duplicate-requires')
defineTest(__dirname, 'transform', null, 'existing-import')
