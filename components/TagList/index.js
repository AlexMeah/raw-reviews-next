import React from 'react';

import Link from '../Link';
import H3 from '../H3';

export default ({ tags }) => (
    <div>
        <H3>Tags</H3>
        {tags &&
            tags.map(t => (
                <span key={t}>
                    <Link
                        to={`/tag?tags=${t}`}
                        as={`/tag/${t}`}
                        color="primary"
                    >
                        #{t}
                    </Link>&nbsp;
                </span>
            ))}
        {!tags && <p>No tags</p>}
    </div>
);
