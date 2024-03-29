import 'isomorphic-fetch';

import React from 'react';
import styled from 'styled-components';
import UpIcon from 'react-icons/lib/fa/thumbs-o-up';
import DownIcon from 'react-icons/lib/fa/thumbs-o-down';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactGA from 'react-ga';

import vars from '../../css/vars';

const disabled = 'rgba(238, 238, 238, 0.4)';

const Container = styled.div`
    text-align: center;
    margin-bottom: 2rem;

    > * {
        display: inline-block;
    }
`;

const Score = styled.div`
    vertical-align: middle;
    font-weight: bold;
    color: ${props => props.color};
    width: 5rem;
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
        return disabled;
    }

    return vars.colors.negative;
};

const upColor = vote => {
    if (vote === -1) {
        return disabled;
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
            vote: 0,
            originalVote: props.userVote !== undefined ? props.userVote : 0
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
            .then(() => {
                ReactGA.event({
                    category: 'Vote',
                    action: 'Click',
                    label: dir
                });
            })
            .catch(err => {
                const error = err.message.replace('GraphQL error: ', '');

                ReactGA.event({
                    category: 'Vote',
                    action: 'Failure',
                    label: error
                });
                alert(error);
            });
    }

    render() {
        const { ups, downs, userVote } = this.props;
        const _userVote = userVote !== undefined ? userVote : this.state.vote;

        return (
            <Container>
                <Down
                    onClick={() => this.handleClick(voteEnum.down)}
                    size={40}
                    color={downColor(_userVote)}
                />
                <Score>
                    {ups - downs - this.state.originalVote + _userVote}
                </Score>
                <Up
                    onClick={() => this.handleClick(voteEnum.up)}
                    size={40}
                    color={upColor(_userVote)}
                />
            </Container>
        );
    }
}

const voteQuery = gql`
  query vote($editId: String!) {
      vote {
          votes(editId: [$editId]) {
              id,
              vote
          }
      }
  }
`;

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

export default CreateVoteWithMutation;
