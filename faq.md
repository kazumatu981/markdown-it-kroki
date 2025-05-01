# FAQ

## What is the purpose of this package?

This package is a plugin for [markdown-it](https://github.com/markdown-it/markdown-it) to embed [Kroki.io](https://kroki.io/) diagram.
This package was designed to embed the diagram into [Marp](https://marp.app/) slide decks.

## Why do I need to install this package to use Kroki.io?

You don't need to install this package to use Kroki.io.
You can use Kroki.io without installing this package.
This package is just a plugin for markdown-it to make it easy to use Kroki.io with Marp.

## How can I use this package?

You can use this package by calling the `use()` method of [markdown-it](https://github.com/markdown-it/markdown-it) and passing an instance of this package as an argument.
like this:

```javascript
const markdownIt = require('markdown-it');
const markdownItKroki = require('@kazumatu981/markdown-it-kroki');

const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

md.use(markdownItKroki);
```

## The Rendered Diagram May Appear Smaller Than Expected

When rendering diagrams using `markdown-it-kroki`, you may notice that the output appears smaller than expected.  
This issue can be resolved through CSS styling.  

For example, consider the following Markdown code:

    ```mermaid[mermaid image]
    graph TD
    A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
    B --> C{ How to contribute? }
    C --> D[ Reporting bugs ]
    C --> E[ Sharing ideas ]
    C --> F[ Advocating ]
    ```

When using markdown-it-kroki to render this Markdown, the output will be:

```html
<embed title="mermaid image" src="https://kroki.io/mermaid/svg/....">
```

To adjust the size of the rendered diagram, you can define the following CSS:

```css
embed[title="mermaid image"] {
    width: 500px;
    height: auto;
}
```

