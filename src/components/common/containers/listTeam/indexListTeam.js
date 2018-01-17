import React from 'react';
import { View, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import { LIMIT_RESULT_SERVICE } from '../../../../utils';
import TeamItem from '../../presentations/teamItem';

import {
  getListTeamAction,
  isFetchingListTeamSelector,
  listTeamSelector,
} from './stateListTeam';

const $ListTeam = (props) => {
  const {
    listTeam,
    page,
    isFetchingListTeam,
    id,
    dispatch
  } = props;

  const handleFlatListReload = (_page) => {
    if (!isFetchingListTeam && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      dispatch(getListTeamAction(id, _page));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={listTeam[id] && listTeam[id].slice(0, page * LIMIT_RESULT_SERVICE)}
        renderItem={({ item }) => <TeamItem team={item} />}
        keyExtractor={(item) => item.id}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver' }} />}
        onEndReached={() => handleFlatListReload(page)}
        onRefresh={() => handleFlatListReload(1)}
        refreshing={false}
      />
      {
        isFetchingListTeam && 
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

const HOCListTeam = compose(
  connect(
    state => ({
      listTeam: listTeamSelector(state),
      isFetchingListTeam: isFetchingListTeamSelector(state)
    }),
    dispatch => ({ dispatch })
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const {
        id, 
        dispatch,
        page
      } = this.props;
      dispatch(getListTeamAction(id, page));
    },
    componentWillReceiveProps(nextProps) { 
      const { 
        setPage, listTeam, id 
      } = this.props;
      const nextTeams = nextProps.listTeam[id];
      if (JSON.stringify(nextTeams) !== JSON.stringify(listTeam[id])) {
        const nextPage = Math.round(nextTeams.length / LIMIT_RESULT_SERVICE) + 1;
        setPage(nextPage);
      }
    }
  })
)($ListTeam);

export default HOCListTeam;