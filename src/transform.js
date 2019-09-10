const recastConfig = {
  quote: 'single',
  reuseWhitespace: false,
}
const schemaPrefix = 'schemas/'
const schemaPrefixLength = schemaPrefix.length
const replacementCharacter = '_'
const filter = {
  type: 'CallExpression',
  callee: {
    type: 'Identifier',
    name: 'require',
  },
  arguments: [
    {
      type: 'Literal',
    },
  ],
}

function getSchemaLocation(path) {
  return path.value.arguments[0].value
}

function getImportIdentifierValue(location) {
  const base = location.startsWith(schemaPrefix)
    ? `${location.slice(schemaPrefixLength)}Schema`
    : location

  return base.replace(/\W/g, replacementCharacter)
}

function getNewImport(j, name, location) {
  const nameIdentifier = j.importDefaultSpecifier(j.identifier(name))
  return j.importDeclaration([nameIdentifier], j.literal(location))
}

function getLastImport(j, tree) {
  const lastImport = tree.find(j.ImportDeclaration).at(-1)
  return lastImport.length > 0 ? lastImport.get() : null
}

function getExistingImportSpecifier(j, tree, location) {
  const paths = tree.find(j.ImportDefaultSpecifier).filter(path => {
    const importDeclaration = path.parentPath.parentPath.value
    if (importDeclaration.type !== 'ImportDeclaration') {
      return false
    }
    const source = importDeclaration.source
    return source.type === 'Literal' && source.value === location
  })
  return paths.length > 0 ? paths.get().value.local.name : null
}

function addNewImport(j, tree, newImport) {
  const lastImport = getLastImport(j, tree)
  if (lastImport === null) {
    j(tree.find(j.Program).get('body', 0)).insertBefore(newImport)
  } else {
    j(lastImport).insertAfter(newImport)
  }
}

function replaceRequire(j, path, name) {
  j(path).replaceWith(j.identifier(name))
}

function deepRequireToImportTransformer(file, api) {
  const j = api.jscodeshift
  const tree = j(file.source)

  return tree
    .find(j.CallExpression, filter)
    .forEach(path => {
      const location = getSchemaLocation(path)
      const existingSpecifier = getExistingImportSpecifier(j, tree, location)
      const name = existingSpecifier || getImportIdentifierValue(location)
      !existingSpecifier &&
        addNewImport(j, tree, getNewImport(j, name, location))
      replaceRequire(j, path, name)
    })
    .toSource(recastConfig)
}

module.exports = deepRequireToImportTransformer
