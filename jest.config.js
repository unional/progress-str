const { tsCjsPreset, withChalk, withTransformEsmPackages } = require('@repobuddy/jest')
/** @type {import('jest').Config} */
module.exports = {
  ...withTransformEsmPackages(withChalk(tsCjsPreset, 'cjs'))
}
