import { gql, graphql, compose } from 'react-apollo';
import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash.get';

import BasicLayout from '../../layouts/Basic';
import H1 from '../../components/H1';
import ExifView from '../../components/ExifView';
import ImageCompare from '../../components/ImageCompare';
import Vote from '../../components/Vote';
import Ad from '../../components/Ad';
import P from '../../components/P';
import Button from '../../components/Button';
import ReEditGrid from '../../components/ReEditGrid';

import isAuthed from '../../hoc/isAuthed';
import withData from '../../hoc/withData';
import config from '../../config';

const Post = props => {
    if (props.EditQuery.loading) {
        return (
            <BasicLayout loggedIn={props.loggedIn} className="tac">
                <Helmet>
                    <title>{`${config.siteName} | Loading...`}</title>
                </Helmet>
                Loading edit...
            </BasicLayout>
        );
    }

    const edit = get(props, 'EditQuery.edit.edit', false);
    const reedits = get(props, 'EditQuery.edit.reedits', []);
    const userVote = get(props, 'VoteQuery.vote.votes[0].vote');
    const exif = get(props, 'EditQuery.exif.exif.afterExif', { tags: {} });

    if (!edit) {
        return (
            <BasicLayout loggedIn={props.loggedIn}>
                Not found
            </BasicLayout>
        );
    }

    return (
        <BasicLayout loggedIn={props.loggedIn}>
            <Helmet>
                <title>{`${config.siteName} | ${edit.title}`}</title>
            </Helmet>

            <H1 style={{ textAlign: 'center' }}>
                {edit.title} {edit.parent ? '(Re-Edit)' : null}
            </H1>

            {edit.description &&
                edit.description !== edit.title &&
                <P copy>{edit.description}</P>}

            <Vote
                id={edit.id}
                ups={edit.ups}
                downs={edit.downs}
                userVote={userVote}
            />

            <div className="tac mb2">
                {edit.parent &&
                    <Button
                        to={`/e/view?editId=${edit.parent}`}
                        as={`/e/${edit.parent}`}
                        color="positive"
                        type="button"
                    >
                        View Original
                    </Button>}
            </div>

            <ImageCompare before={edit.before} after={edit.after} />

            <Ad slot={7323729177} />

            <div className="row">

                {!edit.parent &&
                    <div className="col-sm-6">
                        <ReEditGrid reedits={reedits} />
                    </div>}

                <div className="col-sm-6">
                    <ExifView {...exif.tags} />
                </div>
            </div>

            <br />

            <div className="col-xs-12 middle-xs">
                <div className="row around-xs">
                    <div className="col">
                        {edit.raw &&
                            <Button
                                color="secondary"
                                style={{ marginRight: '2rem' }}
                                type="button"
                                href={`${config.cdnOriginal}/${edit.raw}`}
                                download
                            >
                                Download Raw
                            </Button>}
                        {!edit.raw &&
                            <Button
                                color="secondary"
                                style={{ marginRight: '2rem' }}
                                type="button"
                                href={`${config.cdn}/reduced/${edit.before}`}
                                download
                            >
                                Download Before JPG
                            </Button>}
                        <Button
                            to={`/e/r/create?editId=${edit.parent || edit.id}`}
                            as={`/e/${edit.parent || edit.id}/r/create`}
                            color="primary"
                            type="button"
                        >
                            Submit Re-edit
                        </Button>
                    </div>

                </div>
            </div>
        </BasicLayout>
    );
};

const editQuery = gql`
  query edit($editId: String!) {
      edit {
          edit(id: $editId) {
              id
              before
              after
              raw
              description
              title
              ups
              downs
              createdAt
              userId
              parent
          }
          reedits(parent: $editId) {
              id
              after
          }
      }
      exif {
          exif(editId: $editId) {
              afterExif {
                  imageSize {
                      width
                      height
                  }
                  tags {
                      fNumber
                      exposureTime
                      focalLength
                      focalLengthIn35mmFormat
                      iSO
                      lensModel
                      make
                      model
                      shutterSpeedValue
                      software
                  }
              }
          }
      }
  }
`;

const voteQuery = gql`
  query vote($editId: String!) {
      vote {
          votes(editId: [$editId]) {
              id,
              editId,
              vote
          }
      }
  }
`;

export default compose(
    withData,
    isAuthed,
    graphql(voteQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    editId: query.editId || props.editId || null
                },
                fetchPolicy: 'network-only'
            };
        },
        name: 'VoteQuery'
    }),
    graphql(editQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    editId: query.editId || props.editId || null,
                    userId: query.userId || props.userId || null
                }
            };
        },
        name: 'EditQuery'
    })
)(Post);
