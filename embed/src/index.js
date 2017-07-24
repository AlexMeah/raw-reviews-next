import { render, h } from 'preact';

import ImageCompare from './components/ImageCompare';

const embeds = Array.from(document.querySelectorAll('.raw-progress-embed'));

embeds.forEach(embed => {
    const before = embed.getAttribute('data-before');
    const after = embed.getAttribute('data-after');

    const renderEl = document.createElement('span');

    embed.parentNode.replaceChild(renderEl, embed);

    render(
        <div>
            <ImageCompare before={before} after={after} />
        </div>,
        renderEl
    );
});
