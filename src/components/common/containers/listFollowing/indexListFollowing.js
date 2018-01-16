import React from 'react';
import { FlatList, View } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {
  getListFollowerAction,
  refreshListFollowerAction,
  isFetchingListFollowerSelector,
  isRefreshingListFollowerSelector,
  listFollowerSelector
} from './stateListFollowing';
import MemberItem from '../../presentations/memberItem';

const $ListFollower = (props) => {
  const {
    getListFollowerAction,
    refreshListFollowerAction,
    listFollowerReducer,
    page,
    isFetchingListFollower,
    isRefreshingListFollower,
  } = props;

  const { id } = props.navigation.state.params;
  const handleOnEndReached =
    () => {
      if (!isFetchingListFollower && !isRefreshingListFollower && !this.onEndReachedCalledDuringMomentum) {
        this.onEndReachedCalledDuringMomentum = true;
        getListFollowerAction(id, page);
      }
    };

  const handleOnReFresh =
    () => {
      if (!isFetchingListFollower && !isRefreshingListFollower) {
        refreshListFollowerAction(id);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={listFollowerReducer[id]}
          renderItem={({ item }) => <MemberItem user={item} />}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver', marginVertical: 10 }} />}
          onRefresh={() => handleOnReFresh(id)}
          onEndReachedThreshold={0}
          onEndReached={() => handleOnEndReached(id, page)}
          refreshing={isRefreshingListFollower}
        />
      </View>
    </View>
  );
};

const HOCListFollower = compose(
  connect(
    state => ({
      listFollowerReducer: listFollowerSelector(state),
      isFetchingListFollower: isFetchingListFollowerSelector(state),
      isRefreshingListFollower: isRefreshingListFollowerSelector(state)
    }),
    {
      getListFollowerAction,
      refreshListFollowerAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const { id } = this.props.navigation.state.params;
      const {
        refreshListFollowerAction, page
      } = this.props;
      refreshListFollowerAction(id, page);
    },
    componentWillReceiveProps(nextProps) {
      const { setPage, membersOfTeamReducer, id } = this.props;
      const nextMembersOfTeam = nextProps.membersOfTeamReducer[id];
      if (membersOfTeamReducer[id] &&
        JSON.stringify(membersOfTeamReducer[id]) !== JSON.stringify(nextMembersOfTeam)) {
        const page = (nextMembersOfTeam.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($ListFollower);

export default HOCListFollower;
