import { gql, graphql } from 'react-apollo';
import React from 'react';

import BasicLayout from '../../layouts/Basic';
import H1 from '../../components/H1';
import H3 from '../../components/H3';
import ExifView from '../../components/ExifView';
import ImageCompare from '../../components/ImageCompare';
import Card from '../../components/Card';
import P from '../../components/P';
import Button from '../../components/Button';

import withData from '../../hoc/withData';

const Post = props => {
    if (props.data.loading) {
        return <p>Loading...</p>;
    }

    const edit = props.data.edit.edit;
    const exif = (props.data.exif.exif || {}).afterExif || { tags: {} };

    return (
        <BasicLayout>
            <H1 style={{ textAlign: 'center' }}>{edit.title}</H1>

            <ImageCompare before={edit.before} after={edit.after} />

            <div className="row">
                <div className="col-sm-6">
                    <ExifView {...exif.tags} />
                </div>
                {edit.description &&
                    edit.description !== edit.title &&
                    <div className="col-sm-6">
                        <H3>Description</H3>
                        <Card>
                            <P color="bodyDark">{edit.description}</P>
                        </Card>
                    </div>}
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
                            >
                                Download Raw
                            </Button>}
                        <Button color="positive" type="button">
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
              createdAt
              userId
              votes {
                  ups
                  downs
              }
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

export default withData(
    graphql(editQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    editId: query.editId || props.editId || null,
                    userId: query.userId || props.userId || null
                }
            };
        }
    })(Post)
);
