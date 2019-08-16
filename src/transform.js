const recastConfig = {
  quote: 'single',
  reuseWhitespace: false,
}
const prefix = 'schemas/'
const prefixLength = prefix.length

function filterCallExpressions(node) {
  const { arguments: callArgs } = node
  if (node.callee.name !== 'require' || callArgs.length !== 1) {
    return false
  }

  const requireArg = callArgs[0]
  return requireArg.type === 'Literal' && requireArg.value.startsWith(prefix)
}

function getSchemaLocation(path) {
  return path.value.arguments[0].value
}

function getImportIdentifierValue(location) {
  return `${location.slice(prefixLength)}Schema`
}

function getNewImport(j, name, location) {
  const nameIdentifier = j.importDefaultSpecifier(j.identifier(name))
  return j.importDeclaration([nameIdentifier], j.literal(location))
}

function getLastImport(j, tree) {
  const lastImport = tree.find(j.ImportDeclaration).at(-1)
  return lastImport.length > 0 ? lastImport.get() : null
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

function schemaRequireToImportTransformer(file, api) {
  const j = api.jscodeshift
  const tree = j(file.source)

  return tree
    .find(j.CallExpression, filterCallExpressions)
    .forEach(path => {
      const location = getSchemaLocation(path)
      const name = getImportIdentifierValue(location)
      addNewImport(j, tree, getNewImport(j, name, location))
      replaceRequire(j, path, name)
    })
    .toSource(recastConfig)
}

module.exports = schemaRequireToImportTransformer
