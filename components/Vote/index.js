import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import UpIcon from 'react-icons/lib/fa/angle-up';
import DownIcon from 'react-icons/lib/fa/angle-down';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import vars from '../../css/vars';
import withData from '../../hoc/withData';

const Container = styled.div`
    text-align: center;
    width: 4rem;
`;

const Score = styled.div`
    vertical-align: middle;
    font-weight: bold;
    color: ${props => props.color};
`;

const Up = styled(UpIcon)`
    cursor: pointer;
    transition: transform 0.2s linear;
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(.8);
    }
`;

const Down = styled(DownIcon)`
    cursor: pointer;
    transition: transform 0.2s linear;
    &:hover {
        transform: scale(1.1);
    }
    &:active {
        transform: scale(.8);
    }
`;

const downColor = vote => {
    if (vote === 1) {
        return '#eee';
    }

    return vars.colors.negative;
};

const upColor = vote => {
    if (vote === -1) {
        return '#eee';
    }

    return vars.colors.positive;
};

const voteEnum = {
    up: 'up',
    down: 'down',
    neutral: 'neutral'
};
const voteValue = {
    up: 1,
    down: -1,
    neutral: 0
};

class Vote extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            vote: 0
        };
    }

    handleClick(dir) {
        const vote = dir;

        // if (
        //     (dir === voteEnum.up && this.props.userVote === 1) ||
        //     (dir === voteEnum.down && this.props.userVote === -1)
        // ) {
        //     vote = voteEnum.neutral;
        // }

        this.setState({
            vote: voteValue[vote]
        });

        this.props
            .mutate({
                variables: {
                    editId: this.props.id,
                    vote
                }
            })
            .catch(err => {
                alert(err.message);
            });
    }

    render() {
        const { id, ups, downs, userVote, color = '#2c3e50' } = this.props;
        console.log(ups - downs, this.state.vote);

        return (
            <Container>
                <Up
                    onClick={() => this.handleClick(voteEnum.up)}
                    size={40}
                    color={upColor(userVote || this.state.vote)}
                />
                <Score color={color}>
                    {ups - downs + this.state.vote}
                </Score>
                <Down
                    onClick={() => this.handleClick(voteEnum.down)}
                    size={40}
                    color={downColor(userVote || this.state.vote)}
                />
            </Container>
        );
    }
}

const createVoteMutation = gql`
  mutation vote_vote($vote: vote!, $editId: String!) {
    vote_vote(vote: $vote, editId: $editId) {
        id,
        editId,
        vote
    }
  }
`;

const CreateVoteWithMutation = graphql(createVoteMutation)(Vote);

export default withData(CreateVoteWithMutation);
