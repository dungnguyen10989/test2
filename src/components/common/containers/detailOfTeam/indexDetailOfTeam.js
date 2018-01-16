import React from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import FeedItem from '../../presentations/feedItem';
import DetailOfTeam from '../../presentations/detailOfTeam';

import {
  getDetailOfTeamAction,
  getFeedsOfTeamAction,
  refreshFeedsOfTeamAction,
  isFetchingDetailOfTeamSelector,
  isFetchingFeedsOfTeamSelector,
  isRefreshingFeedsOfTeamSelector,
  detailOfTeamSelector,
  feedsOfTeamSelector
} from './stateDetailOfTeam';

const $DetailOfTeam = (props) => {
  const {
    getFeedsOfTeamAction,
    detailOfTeam,
    feedsOfTeam,
    page,
    isFetchingFeedsOfTeam,
    isFetchingDetailOfTeam,
    isRefreshingFeedsOfTeam,
    strings
  } = props;
  const { id, type } = props.screenProps;

  const handleOnEndReached =
  () => {
    if (!isRefreshingFeedsOfTeam && !isFetchingFeedsOfTeam && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      getFeedsOfTeamAction(id, page);
    }
  };
  
  return (
    <View style={{ flex: 1 }}>
      {
        detailOfTeam[id] && !isFetchingDetailOfTeam && 
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={{ 
          backgroundColor: 'orange',
          padding: 20,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 10000
        }}
        >
          <Text style={{ fontSize: 22, color: '#333' }}>{strings.joinRequest}</Text>
        </TouchableOpacity>
      }
      <FlatList
        style={{ flex: 1 }}
        data={isRefreshingFeedsOfTeam ? [] : feedsOfTeam[id]}
        renderItem={({ item }) => <FeedItem feed={item} />}
        ListHeaderComponent={() => (<DetailOfTeam 
          team={isFetchingDetailOfTeam ? null : detailOfTeam[id]}
          navigation={props.navigation}
        />)}
        ListFooterComponent={() => {
          if(type === 2) {
            return(
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="ios-lock" color="#f1c40f" size={40} style={{ marginTop: 40 }} />
                <Text style={{ marginBottom: 40 }}>{`${strings.privateTeam}`}</Text>
              </View>
            );
          }
          return null;
        }}
        keyExtractor={(item, index) => index}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={() => <View style={{ height: 0, marginVertical: 5 }} />}
        onEndReached={() => handleOnEndReached()}
      />
      {
        isFetchingFeedsOfTeam && 
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

const HOCDetailOfTeam = compose(
  connect(
    state => ({
      detailOfTeam: detailOfTeamSelector(state),
      feedsOfTeam: feedsOfTeamSelector(state),
      isFetchingFeedsOfTeam: isFetchingFeedsOfTeamSelector(state),
      isFetchingDetailOfTeam: isFetchingDetailOfTeamSelector(state),
      isRefreshingFeedsOfTeam: isRefreshingFeedsOfTeamSelector(state),
      strings: state.strings
    }),
    {
      getDetailOfTeamAction,
      getFeedsOfTeamAction,
      refreshFeedsOfTeamAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const { id, type } = this.props.screenProps;
      const {
        getDetailOfTeamAction, getFeedsOfTeamAction, page
      } = this.props;
      if (type !== 2) {
        getFeedsOfTeamAction(id, page);
      }
      getDetailOfTeamAction(id);
    },
    componentWillReceiveProps(nextProps) {
      const { id } = this.props.screenProps;
      const { setPage, feedsOfTeam } = this.props;
      const nextFeedsOfTeam = nextProps.feedsOfTeam;

      if (JSON.stringify(nextFeedsOfTeam[id]) !== JSON.stringify(feedsOfTeam[id])) {
        const page = Math.round(nextFeedsOfTeam.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($DetailOfTeam);

export default HOCDetailOfTeam;