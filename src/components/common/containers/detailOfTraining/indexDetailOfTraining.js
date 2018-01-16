import React from 'react';
import { View, FlatList } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import FeedItem from '../../presentations/feedItem';
import DetailOfTeam from '../../presentations/detailOfTraining';

import {
  getDetailOfTrainingAction,
  getFeedsOfTrainingAction,
  refreshFeedsOfTrainingAction,
  isFetchingDetailOfTrainingSelector,
  isFetchingFeedsOfTrainingSelector,
  isRefreshingFeedsOfTrainingSelector,
  detailOfTrainingSelector,
  feedsOfTrainingSelector
} from './stateDetailOfTraining';

const $DetailOfTraining = (props) => {
  const {
    getFeedsOfTrainingAction,
    detailOfTraining,
    feedsOfTraining,
    page,
    isFetchingFeedsOfTraining,
    isFetchingDetailOfTraining,
    isRefreshingFeedsOfTraining,
  } = props;
  const { id } = props.screenProps;

  const handleOnEndReached =
  () => {
    if (!isRefreshingFeedsOfTraining && !isFetchingFeedsOfTraining && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      getFeedsOfTrainingAction(id, page);
    }
  };
  
  return (
    <FlatList
      style={{ flex: 1 }}
      data={isRefreshingFeedsOfTraining ? [] : feedsOfTraining[id]}
      renderItem={({ item }) => <FeedItem feed={item} />}
      ListHeaderComponent={() => (<DetailOfTeam 
        training={isFetchingDetailOfTraining ? null : detailOfTraining[id]}
      />)}
      keyExtractor={(item, index) => index}
      onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
      onEndReachedThreshold={0}
      ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#333', marginVertical: 10 }} />}
      onEndReached={() => handleOnEndReached()}
    />
  );
};

const HOCDetailOfTraining = compose(
  connect(
    state => ({
      detailOfTraining: detailOfTrainingSelector(state),
      feedsOfTraining: feedsOfTrainingSelector(state),
      isFetchingFeedsOfTraining: isFetchingFeedsOfTrainingSelector(state),
      isFetchingDetailOfTraining: isFetchingDetailOfTrainingSelector(state),
      isRefreshingFeedsOfTraining: isRefreshingFeedsOfTrainingSelector(state)
    }),
    {
      getDetailOfTrainingAction,
      getFeedsOfTrainingAction,
      refreshFeedsOfTrainingAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const { id } = this.props.screenProps;
      const {
        getDetailOfTrainingAction, refreshFeedsOfTrainingAction
      } = this.props;
      refreshFeedsOfTrainingAction(id);
      getDetailOfTrainingAction(id);
    },
    componentWillReceiveProps(nextProps) {
      const { id } = this.props.screenProps;
      const { setPage, feedsOfTraining } = this.props;
      const nextFeedsOfTraining = nextProps.feedsOfTraining;

      if (JSON.stringify(nextFeedsOfTraining[id]) !== JSON.stringify(feedsOfTraining[id])) {
        const page = Math.round(nextFeedsOfTraining.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($DetailOfTraining);

HOCDetailOfTraining.navigationOptions = {
  title: 'Training detail'
};

export default HOCDetailOfTraining;