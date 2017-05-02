import marked from 'marked';
import React from 'react';

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: false,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
});

export default props => (
    <div
        dangerouslySetInnerHTML={{
            __html: marked(props.children || '')
        }}
    />
);
