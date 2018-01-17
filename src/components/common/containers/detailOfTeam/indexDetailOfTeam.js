import React from 'react';
import { View, FlatList, Text, ActivityIndicator, ScrollView } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import FeedItem from '../../presentations/feedItem';
import DetailOfTeam from '../../presentations/detailOfTeam';
import { LIMIT_RESULT_SERVICE } from '../../../../utils';

import {
  getDetailOfTeamAction,
  getFeedsOfTeamAction,
  isFetchingDetailOfTeamSelector,
  isFetchingFeedsOfTeamSelector,
  detailOfTeamSelector,
  feedsOfTeamSelector
} from './stateDetailOfTeam';

const $DetailOfTeam = (props) => {
  const {
    detailOfTeam,
    feedsOfTeam,
    page,
    isFetchingFeedsOfTeam,
    isFetchingDetailOfTeam,
    strings,
    dispatch
  } = props;
  const { id, type } = props.screenProps;

  const handleOnEndReached =
    () => {
      if (!isFetchingFeedsOfTeam && !this.onEndReachedCalledDuringMomentum) {
        this.onEndReachedCalledDuringMomentum = true;
        dispatch(getFeedsOfTeamAction(id, page));
      }
    };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ display: !isFetchingDetailOfTeam ? 'flex' : 'none' }}>
        <DetailOfTeam
          team={detailOfTeam[id]}
          navigation={props.navigation}
        />
        <FlatList
          style={{ flex: 1 }}
          data={feedsOfTeam[id] && feedsOfTeam[id].slice(0, page * LIMIT_RESULT_SERVICE)}
          renderItem={({ item }) => <FeedItem feed={item} />}
          keyExtractor={(item) => item.id}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReachedThreshold={0}
          ItemSeparatorComponent={() => <View style={{ height: 0, marginVertical: 5 }} />}
          onEndReached={() => handleOnEndReached()}
        />
        {
          type === 2 && 
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="ios-lock" color="#f1c40f" size={40} style={{ marginTop: 40 }} />
            <Text style={{ marginBottom: 40 }}>{`${strings.privateTeam}`}</Text>
          </View>
        }
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
    </ScrollView>
  );
};

const HOCDetailOfTeam = compose(
  connect(
    state => ({
      detailOfTeam: detailOfTeamSelector(state),
      feedsOfTeam: feedsOfTeamSelector(state),
      isFetchingFeedsOfTeam: isFetchingFeedsOfTeamSelector(state),
      isFetchingDetailOfTeam: isFetchingDetailOfTeamSelector(state),
      strings: state.strings
    }),
    dispatch => ({ dispatch })
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const { id, type } = this.props.screenProps;
      const {
        dispatch, page
      } = this.props;
      if (type !== 2) {
        dispatch(getFeedsOfTeamAction(id, page));
      }
      dispatch(getDetailOfTeamAction(id));
    },
    componentWillReceiveProps(nextProps) {
      const { id } = this.props.screenProps;
      const { setPage, feedsOfTeam } = this.props;
      const nextFeedsOfTeam = nextProps.feedsOfTeam;

      if (JSON.stringify(nextFeedsOfTeam[id]) !== JSON.stringify(feedsOfTeam[id])) {
        const page = Math.round(nextFeedsOfTeam.length / LIMIT_RESULT_SERVICE) + 1;
        setPage(page);
      }
    }
  })
)($DetailOfTeam);

export default HOCDetailOfTeam;