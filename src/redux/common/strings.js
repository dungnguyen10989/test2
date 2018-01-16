import enString from '../../localization/en.strings';
import frString from '../../localization/fr.strings';
import speString from '../../localization/spe.strings';

export default strings = (state = enString, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      if (action.payload === 'spe') {
        return speString;
      } else if (action.payload === 'fr') {
        return frString;
      }
      return enString;
    default:
      return state;
  }
};