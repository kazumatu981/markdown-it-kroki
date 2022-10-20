const support = require('./support');
const diagramEncoder = require('./diagram-encoder');

class MarkdownItKrokiCore {
    constructor(md) {
        this._md = md;
        this._defaultFence = md.renderer.rules.fence;
    }
    setOptions(opt) {
        this._entrypoint = opt?.entrypoint ?? 'https://kroki.io';
        this._marpAutoScaling = opt?.marpAutoScaling ?? true;
        this._containerClass = opt?.containerClass ?? 'kroki-image-container';
        this._imageFormat = opt?.imageFormat ?? 'svg';
        return this;
    }
    use() {
        this._md.renderer.rules.fence
            = (tokens, idx, options, env, self) => this.krokiFencePlugin(tokens, idx, options, env, self);
    }
    static readLanguageAndAltText(info) {
        let language = '';
        let alt = '';
        if (!info) return { language, alt };

        const trimed = info.trim();
        const found = /[\s|\[]/.exec(trimed);
        if (found) {
            language = trimed.substring(0, found.index);
            const altFound = /\[.*?\]/.exec(trimed);
            if (altFound) {
                alt = altFound[0]
                    .replace('[', '').replace(']', '');
            }
        } else {
            language = trimed;
        }
        return { language, alt };
    }
    buildEmbedHTML(langAndAlt, diagramCode) {
        // build url
        const url = diagramEncoder.generateUrl(
            this._entrypoint, langAndAlt.language, this._imageFormat, diagramCode);
        // build img tag
        const imgTag = langAndAlt.alt ?
            `<img alt="${langAndAlt.alt}" src="${url}" />` : `<img src="${url}" />`;
        // build container contents
        const containerContents = this._marpAutoScaling ?
            `<marp-auto-scaling data-downscale-only>${imgTag}</marp-auto-scaling>` : imgTag;
        // build embed HTML
        return `<p class="${this._containerClass}">${containerContents}</p>`;
    }
    krokiFencePlugin(tokens, idx, options, env, self) {
        const info = this._md.utils.unescapeAll(tokens[idx].info)
        const langAndAlt = MarkdownItKrokiCore.readLanguageAndAltText(info);

        return support.languageSupports(langAndAlt.language) ?
            this.buildEmbedHTML(langAndAlt, tokens[idx].content) :
            this._defaultFence.call(self, tokens, idx, options, env, self);
    }
}
module.exports = {
    MarkdownItKrokiCore
}