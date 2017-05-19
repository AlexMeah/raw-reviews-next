import { gql, graphql } from 'react-apollo';
import arrify from 'arrify';

const ITEMS_PER_PAGE = 20;

const feedQuery = gql`
  query feed($order: order, $time: time, $userId: String, $tags: [String], $offset: Int) {
      feed {
          feed(order: $order, time: $time, userId: $userId, offset: $offset, tags: $tags, limit: ${ITEMS_PER_PAGE}) {
              id,
              before,
              after,
              createdAt,
              title,
              ups,
              downs,
              score,
              userId,
              parent
          }
      }
  }
`;

const ComponentWithFeed = Component =>
    graphql(feedQuery, {
        options: props => {
            const query = (props.url && props.url.query) || {};

            return {
                variables: {
                    order: query.order || props.order || 'hot',
                    time: query.time || props.time || 'all',
                    tags: query.tags || props.tags || null,
                    userId: query.userId || props.userId
                        ? arrify(query.userId || props.userId)
                        : null
                }
            };
        },
        props({ data: { loading, feed, vote, fetchMore } }) {
            return {
                loading,
                feed,
                vote,
                loadMoreEdits() {
                    return fetchMore({
                        variables: {
                            offset: feed.feed.length
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult) {
                                return previousResult;
                            }

                            return Object.assign({}, previousResult, {
                                feed: {
                                    feed: [
                                        ...previousResult.feed.feed,
                                        ...fetchMoreResult.feed.feed
                                    ]
                                }
                            });
                        }
                    });
                }
            };
        }
    })(Component);

export default ComponentWithFeed;
