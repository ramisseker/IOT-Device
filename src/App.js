import React from 'react';
import MainStack from './navigation/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './utils/navigation';

import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{flex: 1}}>
        <MainStack />
      </SafeAreaView>
    </NavigationContainer>
  );
};
export default App;
