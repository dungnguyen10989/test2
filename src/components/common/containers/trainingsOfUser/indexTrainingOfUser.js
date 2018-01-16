import React from 'react';
import { FlatList, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import {
  getTrainingsOfTeamAction,
  refreshTrainingsOfTeamAction,
  isFetchingTrainingsOfTeamSelector,
  isRefreshingTrainingsOfTeamSelector,
  trainingsOfTeamSelector,
} from './stateTrainingOfUser';
import TrainingItem from '../../presentations/trainingItem';

const $TrainingsOfTeam = (props) => {
  const {
    getTrainingsOfTeamAction,
    refreshTrainingsOfTeamAction,
    trainingsOfTeamReducer,
    page,
    isFetchingTrainingsOfTeam,
    isRefreshingTrainingsOfTeam,
    strings
  } = props;

  const { id, type } = props.screenProps;

  const handleOnEndReached = () => {
    if (!isFetchingTrainingsOfTeam && !isRefreshingTrainingsOfTeam && !this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      getTrainingsOfTeamAction(id, page);
    }
  };

  const handleOnRefresh = () => {
    if (!isFetchingTrainingsOfTeam && !isRefreshingTrainingsOfTeam) {
      refreshTrainingsOfTeamAction(id);
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
        <View style={{ flex: 1 }}>
          {
            !isRefreshingTrainingsOfTeam && !isFetchingTrainingsOfTeam &&
            trainingsOfTeamReducer[id] &&
            trainingsOfTeamReducer[id].length === 0 &&
            <Text style={{ marginTop: 20, textAlign: 'center' }}>{`${strings.noTraining}`}</Text>
          }
          <FlatList
            style={{ flex: 1 }}
            data={isRefreshingTrainingsOfTeam || !trainingsOfTeamReducer[id] ? [] : trainingsOfTeamReducer[id].slice(0, page * 12)}
            renderItem={({ item }) => <TrainingItem training={item} />}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 0, marginVertical: 5 }} />}
            onRefresh={() => handleOnRefresh()}
            onEndReachedThreshold={0}
            onEndReached={() => handleOnEndReached()}
            refreshing={isRefreshingTrainingsOfTeam}
          />
        </View>
      }

    </View>
  );
};

const HOCTrainingsOfTeam = compose(
  connect(
    state => ({
      strings: state.strings,
      trainingsOfTeamReducer: trainingsOfTeamSelector(state),
      isFetchingTrainingsOfTeam: isFetchingTrainingsOfTeamSelector(state),
      isRefreshingTrainingsOfTeam: isRefreshingTrainingsOfTeamSelector(state)
    }),
    {
      getTrainingsOfTeamAction,
      refreshTrainingsOfTeamAction
    }
  ),
  withState('page', 'setPage', 1),
  lifecycle({
    componentDidMount() {
      const {
        refreshTrainingsOfTeamAction, page
      } = this.props;
      const { id, type } = this.props.screenProps;
      if (type !== 2) {
        refreshTrainingsOfTeamAction(id, page);
      }
    },
    componentWillReceiveProps(nextProps) {
      const { setPage, trainingsOfTeamReducer } = this.props;
      const { id } = this.props.screenProps;
      const nextTrainings = nextProps.trainingsOfTeamReducer[id];
      if (trainingsOfTeamReducer[id]
        && JSON.stringify(trainingsOfTeamReducer[id]) !== JSON.stringify(nextTrainings)) {
        const page = Math.round(nextTrainings.length / 12) + 1;
        setPage(page);
      }
    }
  })
)($TrainingsOfTeam);

HOCTrainingsOfTeam.navigationOptions = {
  title: 'Home'
};

export default HOCTrainingsOfTeam;