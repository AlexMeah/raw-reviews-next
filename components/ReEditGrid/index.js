import React from 'react';
import styled from 'styled-components';

import H3 from '../H3';
import P from '../P';
import Link from '../Link';
import config from '../../config';
import vars from '../../css/vars';

const Container = styled.div`
    margin-bottom: 2rem;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    max-width: 15rem;
    border: 4px solid #fff;
    border-radius: ${vars.radius};
`;

const Edit = ({ after, id }) => (
    <div className="col">
        <Link to={'/e/view?editId={id}'} as={`/e/${id}`}>
            <Image src={`${config.cdn}/resized/square/${after}`} alt={id} />
        </Link>
    </div>
);

export default ({ reedits = [] }) => (
    <Container className="row">
        <div className="col-xs-12">
            <H3>Re-Edits</H3>
            {reedits.length === 0 && <P>No re-edits yet :(</P>}
        </div>
        {reedits.map(e => <Edit {...e} />)}
    </Container>
);
