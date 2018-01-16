import React from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {
  getMembersOfTeamAction,
  refreshMembersOfTeamAction,
  isFetchingMembersOfTeamSelector,
  isRefreshingMembersOfTeamSelector,
  membersOfTeamSelector
} from './stateMembersOfTeam';
import MemberItem from '../../presentations/memberItem';

const $MembersOfTeam = (props) => {
  const {
    getMembersOfTeamAction,
    refreshMembersOfTeamAction,
    membersOfTeamReducer,
    page,
    isFetchingMembersOfTeam,
    isRefreshingMembersOfTeam,
    navigation,
  } = props;

  const { id, type } = props.screenProps;

  const handleOnEndReached =
    () => {
      if (!isFetchingMembersOfTeam && !isRefreshingMembersOfTeam && !this.onEndReachedCalledDuringMomentum) {
        this.onEndReachedCalledDuringMomentum = true;
        getMembersOfTeamAction(id, page);
      }
    };

  const handleOnReFresh =
    () => {
      if (!isFetchingMembersOfTeam && !isRefreshingMembersOfTeam) {
        refreshMembersOfTeamAction(id);
      }
    };

  return (
    <View style={{ flex: 1 }}>
      {
        type === 2 &&
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Icon name="ios-lock" color="#f1c40f" size={40} style={{ marginTop: 20 }} />
          <Text style={{ marginTop: 10 }}>{`${strings.privateTeam}`}</Text>
        </View>
      }
      {
        type !== 2 &&
          <FlatList
            style={{ flex: 1 }}
            data={membersOfTeamReducer[id]}
            renderItem={({ item }) => <MemberItem user={item} navigation={navigation} />}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver', marginVertical: 10 }} />}
            onRefresh={() => handleOnReFresh(id)}
            onEndReachedThreshold={0}
            onEndReached={() => handleOnEndReached(id, page)}
            refreshing={isRefreshingMembersOfTeam}
          />
      }
      {
        isFetchingMembersOfTeam && 
        <ActivityIndicator 
          animating 
          style={{ 
            position: 'absolute', left: '50%', top: '50%', zIndex: 10001 
          }}  
        />
      }
    </View>
  );
};

const HOCMembersOfTeam = compose(
  connect(
    state => ({
      membersOfTeamReducer: membersOfTeamSelector(state),
      isFetchingMembersOfTeam: isFetchingMembersOfTeamSelector(state),
      isRefreshingMembersOfTeam: isRefreshingMembersOfTeamSelector(state)
    }),
    {
      getMembersOfTeamAction,
      refreshMembersOfTeamAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const {
        getMembersOfTeamAction, page
      } = this.props;
      const { id, type } = this.props.screenProps;
      if (type !== 2) {
        getMembersOfTeamAction(id, page);
      }
    },
    componentWillReceiveProps(nextProps) {
      const { setPage, membersOfTeamReducer } = this.props;
      const { id } = this.props.screenProps;
      const nextMembersOfTeam = nextProps.membersOfTeamReducer[id];
      if (membersOfTeamReducer[id] &&
        JSON.stringify(membersOfTeamReducer[id]) !== JSON.stringify(nextMembersOfTeam)) {
        const page = (nextMembersOfTeam.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($MembersOfTeam);

export default HOCMembersOfTeam;
