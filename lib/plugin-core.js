const {
    isSupportLanguage,
    generateUrl,
    safeProperty
} = require('./utils');

function MarkdownItKrokiCore(md, opt) {
    const defaultFence = md.renderer.rules.fence;
    const entrypoint = safeProperty(opt, 'entrypoint', 'https://kroki.io');
    const marpAutoScaling = safeProperty(opt, 'marpAutoScaling', true);
    const containerClass = safeProperty(opt, 'containerClass', 'kroki-image-container');
    const defaultImageType = safeProperty(opt, 'defaultImageType', 'svg');

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const info = md.utils.unescapeAll(tokens[idx].info).trim()

        if (info) {
            let [lang, imageType] = info.split(/(\s+)/g).filter(s => s != ' ');

            imageType = imageType ? imageType : defaultImageType;

            if (isSupportLanguage(lang)) {
                const url = generateUrl(entrypoint, lang, imageType, tokens[idx].content);

                return marpAutoScaling ?
                    `<p class="${containerClass}"><marp-auto-scaling data-downscale-only><img src="${url}"/></marp-auto-scaling></p>` :
                    `<p class="${containerClass}"><img src="${url}"/></p>`;
            }
        }

        return defaultFence.call(self, tokens, idx, options, env, self)
    }
}
module.exports = {
    MarkdownItKrokiCore
}