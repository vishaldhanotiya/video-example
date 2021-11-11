import {CommonActions, StackActions} from '@react-navigation/native';

let navigation;

function setTopLevelNavigator(navigatorRef) {
  navigation = navigatorRef;
}

function navigate(name, params) {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

const pop = count => {
  const popAction = StackActions.pop(count);
  if (navigation) {
    navigation?.dispatch(popAction);
  }
};

const push = (name, params) => {
  if (navigation) {
    navigation?.dispatch(StackActions.push(name, params));
  }
};

function goBack() {
  if (navigation) {
    navigation?.dispatch(CommonActions.goBack());
  }
}

// Add screen in background of current screen
function addScreenBeforeLast(routeName) {
  navigation.dispatch(insertBeforeLast(routeName));
}

const insertBeforeLast = (routeName, params) => state => {
  const routes = [
    ...state.routes.slice(0, -1),
    {name: routeName, params},
    state.routes[state.routes.length - 1],
  ];

  return CommonActions.reset({
    ...state,
    routes,
    index: routes.length - 1,
  });
};

/**
 * Clear stack before navigation
 * to prevent going back to previous screen
 * by using Android back button
 */
const navigateToClearStack = state => {
  if (navigation) {
    navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: state}],
      }),
    );
  }
};

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
  push,
  addScreenBeforeLast,
  navigateToClearStack,
};
