import React from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

import ArcadeJoycon from './src/ArcadeJoycon';

const App = () => {
  return (
    <View style={styles.container}>
      <ArcadeJoycon />
      <StatusBar translucent hidden />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
