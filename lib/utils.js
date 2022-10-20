const { deflateSync } = require('zlib')

const SupportLanguages = [
    'actdiag',
    'blockdiag',
    'bpmn',
    'bytefield',
    'c4plantuml',
    'ditaa',
    'dot',
    'erd',
    'excalidraw',
    'graphviz',
    'mermaid',
    'nomnoml',
    'nwdiag',
    'packetdiag',
    'pikchr',
    'plantuml',
    'rackdiag',
    'seqdiag',
    'svgbob',
    'umlet',
    'vega',
    'vegalite',
    'wavedrom',
];

const SupportImageTypes = [
    'png', 'svg', 'jpeg', 'pdf', 'base64'
];


function assertNonEmptyString(test, msg) {
    if (test === ''
        || test === null
        || test === undefined) throw new Error(msg);
    if (typeof test !== 'string') throw new Error(msg);
}
function assertToTrue(test, msg) {
    if (!test) throw new Error(msg);
}

function safeProperty(obj, properName, defaultValue) {
    return (obj !== null && obj !== undefined) && obj[properName] ?
        obj[properName] : defaultValue;
}

function encodeDiagram(diagram) {
    return deflateSync(diagram, { level: 9 }).toString('base64url');
}
function generateUrl(entrypoint, lang, imgType, diagram) {

    assertNonEmptyString(entrypoint, '\'entrypoint\' must be non-empty string.');
    assertNonEmptyString(lang, '\'lang\' must be non-empty string.');
    assertNonEmptyString(imgType, '\'imgType\' must be non-empty string.');
    assertNonEmptyString(diagram, '\'diagram\' must be non-empty string.');
    assertToTrue(isSupportImageType(imgType), 'Not Supported Image Type.');
    assertToTrue(isSupportLanguage(lang), 'Not Supported Diagram Language.');

    const api = `${lang}/${imgType}/${encodeDiagram(diagram)}`;

    return entrypoint.endsWith('/') ?
        `${entrypoint}${api}` : `${entrypoint}/${api}`;
}

function isSupportLanguage(lang) {
    return SupportLanguages.includes(lang);
}

function isSupportImageType(imageType) {
    return SupportImageTypes.includes(imageType);
}

module.exports = {
    // constants
    SupportLanguages,
    SupportImageTypes,
    // safe-access
    safeProperty,

    // encoding 
    encodeDiagram,
    isSupportLanguage,
    isSupportImageType,
    generateUrl
};
