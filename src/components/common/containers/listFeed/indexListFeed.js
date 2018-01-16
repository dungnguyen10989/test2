import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import { LIMIT_RESULT_SERVICE } from '../../../../utils';
import FeedItem from '../../presentations/feedItem';

import {
  getListFeedAction,
  isFetchingListFeedSelector,
  listFeedReducerSelector,
} from './stateListFeed';

const $ListFeed = (props) => {
  const {
    listFeed,
    page,
    dispatch,
    isFetchingListFeed,
    id
  } = props;

  const handleFlatListReload = (_page) => {
    if (!isFetchingListFeed && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      dispatch(getListFeedAction(id, _page));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listFeed[id] && listFeed[id].slice(0, page * LIMIT_RESULT_SERVICE)}
        renderItem={({ item }) => <FeedItem feed={item} />}
        keyExtractor={(item) => item.id}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver' }} />}
        onEndReached={() => handleFlatListReload(page)}
        onRefresh={() => handleFlatListReload(1)}
        refreshing={false}
      />
      {
        isFetchingListFeed && 
        <ActivityIndicator 
          animating 
          style={{ 
            position: 'absolute', left: '50%', top: '50%', right: '50%', zIndex: 10001 
          }}  
        />
      }
    </View>
  );
};

const HOCListFeed = compose(
  connect(
    state => ({
      listFeed: listFeedReducerSelector(state),
      isFetchingListFeed: isFetchingListFeedSelector(state)
    }),
    dispatch => ({ dispatch })
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const {
        dispatch, id, page
      } = this.props;
      dispatch(getListFeedAction(id, page));
    },
    componentWillReceiveProps(nextProps) { 
      const { 
        setPage, listFeed, id,
      } = this.props;
      const nextFeeds = nextProps.listFeed[id];
      if (JSON.stringify(nextFeeds) !== JSON.stringify(listFeed[id])) {
        const page = Math.round(nextFeeds.length / LIMIT_RESULT_SERVICE) + 1;
        setPage(page);
      }
    }
  })
)($ListFeed);

export default HOCListFeed;