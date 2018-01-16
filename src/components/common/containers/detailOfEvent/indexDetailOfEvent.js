import React from 'react';
import { View, FlatList } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import FeedItem from '../../presentations/feedItem';
import DetailOfUser from '../../presentations/detailOfUser';

import {
  getDetailOfUserAction,
  getFeedsOfUserAction,
  refreshFeedsOfUserAction,
  isFetchingDetailOfUserSelector,
  isFetchingFeedsOfUserSelector,
  isRefreshingFeedsOfUserSelector,
  detailOfUserSelector,
  feedsOfUserSelector
} from './stateDetailOfEvent';

const $DetailOfUser = (props) => {
  const {
    getFeedsOfUserAction,
    detailOfUser,
    feedsOfUser,
    page,
    isFetchingFeedsOfUser,
    isFetchingDetailOfUser,
    isRefreshingFeedsOfUser,
  } = props;
  const { id } = props.navigation.state.params;

  const handleOnEndReached =
  () => {
    if (!isRefreshingFeedsOfUser && !isFetchingFeedsOfUser && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      getFeedsOfUserAction(id, page);
    }
  };
  
  return (
    <FlatList
      style={{ flex: 1 }}
      data={isRefreshingFeedsOfUser ? [] : feedsOfUser[id]}
      renderItem={({ item }) => <FeedItem feed={item} />}
      ListHeaderComponent={() => (<DetailOfUser 
        user={isFetchingDetailOfUser ? null : detailOfUser[id]}
      />)}
      keyExtractor={(item, index) => index}
      onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      onEndReachedThreshold={0}
      ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#333', marginVertical: 10 }} />}
      onEndReached={() => handleOnEndReached()}
    />
  );
};

const HOCDetailOfUser = compose(
  connect(
    state => ({
      detailOfUser: detailOfUserSelector(state),
      feedsOfUser: feedsOfUserSelector(state),
      isFetchingFeedsOfUser: isFetchingFeedsOfUserSelector(state),
      isFetchingDetailOfUser: isFetchingDetailOfUserSelector(state),
      isRefreshingFeedsOfUser: isRefreshingFeedsOfUserSelector(state)
    }),
    {
      getDetailOfUserAction,
      getFeedsOfUserAction,
      refreshFeedsOfUserAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const { id } = this.props.navigation.state.params;
      const {
        getDetailOfUserAction, refreshFeedsOfUserAction
      } = this.props;
      refreshFeedsOfUserAction(id);
      getDetailOfUserAction(id);
    },
    componentWillReceiveProps(nextProps) {
      const { id } = this.props.navigation.state.params;
      const { setPage, feedsOfUser } = this.props;
      const nextFeedsOfUser = nextProps.feedsOfUser;

      if (JSON.stringify(nextFeedsOfUser[id]) !== JSON.stringify(feedsOfUser[id])) {
        const page = Math.round(nextFeedsOfUser.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($DetailOfUser);

export default HOCDetailOfUser;