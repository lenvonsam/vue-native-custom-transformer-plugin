const defaultScript = `const ${constants.SCRIPT_OPTIONS} = {}`;
const constants = require('vue-native-scripts/src/util/constants');

function transformScriptContent(content, lang) {
  if (!lang) {
    return content;
  }

  const transform = registeredPlugins.script[lang];
  if (!transform) {
    return content;
  }
  transform(content);
}

function parseScript(script) {
  if (!script) {
    return defaultScript;
  }

  const scriptContent = script.content.replace(/\/\/\n/g, '');
  const transformedContent = transformScriptContent(scriptContent, lang);
  const s = `const ${constants.SCRIPT_OPTIONS} = `;
  return transformedContent
    .replace(/[\s;]*module.exports[\s]*=/, `\n${s}`)
    .replace(/[\s;]*export[\s]+default[\s]*\{/, `\n${s} {`);
}

module.exports = parseScript;
