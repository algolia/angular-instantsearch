const { runMode } = require('codemirror/addon/runmode/runmode.node');
require('codemirror/mode/shell/shell');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/css/css');
const escape = require('escape-html');

module.exports = function highlight(source, lang) {
  let tokenizedSource = '';
  let newLang = lang;

  if (newLang === 'html') {
    newLang = 'htmlmixed';
  }
  if (newLang === 'js') {
    newLang = 'jsx';
  }
  if (newLang === 'shell') {
    newLang = 'shell';
  }
  // eslint-disable-next-line no-unused-var
  const codeType = newLang === 'shell' ? 'Command' : 'Code';

  // this is a synchronous callback API
  runMode(source, newLang, (text, style) => {
    const escapedText = escape(text);

    if (!style) {
      tokenizedSource += escapedText;
      return;
    }

    tokenizedSource += `<span class="cm-${style.replace(/ +/g, ' cm-')}">${
      escapedText
    }</span>`;
  });

  return `<pre class="code-sample cm-s-mdn-like codeMirror ${
    newLang
  }" data-code-type="${codeType}"><div class="code-wrap"><code>${
    tokenizedSource
  }</code></div></pre>`;
};
