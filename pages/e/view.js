import { gql, graphql, compose } from 'react-apollo';
import React from 'react';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import get from 'lodash.get';
import BasicLayout from '../../layouts/Basic';
import H1 from '../../components/H1';
import ExifView from '../../components/ExifView';
import ImageCompare from '../../components/ImageCompare';
import Vote from '../../components/Vote';
import Link from '../../components/Link';
import Ad from '../../components/Ad';
import P from '../../components/P';
import TagList from '../../components/TagList';
import Button from '../../components/Button';
import Embed from '../../components/Embed';
import ReEditGrid from '../../components/ReEditGrid';

import withData from '../../hoc/withData';
import config from '../../config';

const trackButton = (action, label = null) => () => {
    ReactGA.event({
        category: 'Button',
        action,
        label
    });
};

const Post = props => {
    if (props.EditQuery.loading) {
        return (
            <BasicLayout className="tac">
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
        return <BasicLayout>Not found</BasicLayout>;
    }

    return (
        <BasicLayout>
            <Helmet>
                <title>{`${config.siteName} | ${edit.title}`}</title>
            </Helmet>

            <H1 className="tac">
                {edit.title} {edit.parent ? '(Re-Edit)' : null}{' '}
                <span>
                    by{' '}
                    <Link
                        to={`/u/profile?userId=${edit.userId}`}
                        as={`/u/${edit.userId}`}
                        color="primary"
                    >
                        {edit.userId}
                    </Link>
                </span>
            </H1>

            {edit.description &&
                edit.description !== edit.title &&
                <P copy>
                    {edit.description}
                </P>}

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
                        onClick={trackButton('View Original', edit.parent)}
                    >
                        View Original Post
                    </Button>}
            </div>

            <ImageCompare before={edit.before} after={edit.after} />

            <Ad slot={7323729177} />

            <div className="row">
                <div className="col-sm-6">
                    {!edit.parent && <ReEditGrid reedits={reedits} />}
                    <TagList tags={edit.tags} />
                </div>

                <div className="col-sm-6">
                    <ExifView {...exif.tags} />
                </div>
            </div>

            <br />

            <div className="col-xs-12 middle-xs">
                <div className="row center-xs">
                    <div className="col-xs-12 mb2">
                        {edit.raw &&
                            <Button
                                color="secondary"
                                type="button"
                                href={`${config.cdnOriginal}/${edit.raw}`}
                                onClick={trackButton(
                                    'Download',
                                    edit.parent || edit.id
                                )}
                                download
                            >
                                DOWNLOAD RAW
                            </Button>}
                        {!edit.raw &&
                            <Button
                                color="secondary"
                                type="button"
                                href={`${config.cdn}/reduced/${edit.before}`}
                                onClick={trackButton(
                                    'Download',
                                    edit.parent || edit.id
                                )}
                                download
                            >
                                DOWNLOAD BEFORE JPG
                            </Button>}
                    </div>
                    <div className="col-xs-12 mb2">
                        <Button
                            to={`/e/r/create?editId=${edit.parent || edit.id}`}
                            as={`/e/${edit.parent || edit.id}/r/create`}
                            color="primary"
                            type="button"
                            onClick={trackButton(
                                'Submit Re-Edit',
                                edit.parent || edit.id
                            )}
                        >
                            SUBMIT RE-EDIT
                        </Button>
                    </div>
                    <div className="col-xs-12 mb2">
                        <Embed
                            id={edit.id}
                            before={edit.before}
                            after={edit.after}
                        />
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
                tags
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
                id
                editId
                vote
            }
        }
    }
`;

export default compose(
    withData,
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
