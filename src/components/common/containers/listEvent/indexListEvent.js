import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import {
  getListEventAction,
  refreshListEventAction,
  isFetchingListEventSelector,
  isRefreshingListEventSelector,
  listEventReducerSelector,
} from './stateListEvent';

const $ListEvent = (props) => {
  const {
    listEventReducer,
    page,
    getListEventAction,
    refreshListEventAction,
    isFetchingListEvent,
    isRefreshingListEvent,
    id
  } = props;

  scrollToTop = () => {
    this.list.scrollToOffset({ x: 0, animating: true });
  };

  const handleOnEndReached =
    () => {
      if (!isFetchingListEvent && !isRefreshingListEvent && !this.onEndReachedCalledDuringMomentum) {
        this.onEndReachedCalledDuringMomentum = true;
        getListEventAction(id, page);
      }
    };

  const handleOnReFresh =
    () => {
      if (!isFetchingListEvent && !isRefreshingListEvent) {
        refreshListEventAction(id);
      }
    };

  const arr = [];

  for (let i = 0; i < 30; i++) {
    arr.push(Math.random());
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'aqua' }}>
      <FlatList
        data={arr}
        renderItem={({ item }) => <Text style={{ padding: 20 }}>{item}</Text>}
        keyExtractor={(item, index) => index}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver' }} />}
        onEndReached={() => handleOnEndReached()}
        onRefresh={() => handleOnReFresh()}
        refreshing={isRefreshingListEvent}
        ref={(list) => { this.list = list; }}
      />
      {
        isFetchingListEvent &&
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

const HOCListEvent = compose(
  connect(
    state => ({
      listEventReducer: listEventReducerSelector(state),
      isFetchingListEvent: isFetchingListEventSelector(state),
      isRefreshingListEvent: isRefreshingListEventSelector(state),
    }),
    {
      getListEventAction,
      refreshListEventAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentWillMount() {

    },
    componentDidMount() {
      this.props.navigation.setParams({
        scrollToTopFlatList: scrollToTop
      });
      const {
        getListEventAction, page
      } = this.props;
      getListEventAction(page);
    },
    componentWillReceiveProps(nextProps) {
      const {
        setPage, listEventReducer, id, getListEventAction, page
      } = this.props;
      const nextEvents = nextProps.listEventReducer[id];
      if (listEventReducer[id] && JSON.stringify(nextEvents) !== JSON.stringify(listEventReducer[id])) {
        const page = Math.round(nextEvents.length / 12) + 1;
        setPage(page);
      }
      if (nextProps.id !== this.props.id) {
        getListEventAction(nextProps.id, page);
      }
    }
  })
)($ListEvent);

export default HOCListEvent;