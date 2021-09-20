import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Loader} from '../../../components/Loader';

const DevicesDetailScreen = ({route, navigation}) => {
  const deviceDetail = route.params;
  const data = deviceDetail.deviceDetail[0];
  const key = Object.keys(data);
  const values = Object.values(data);

  return (
    <View style={styles.container}>
      <View style={styles.detailcard}>
        <View style={{paddingRight: '10%'}}>
          {key.map((item, i) => (
            <Text key={i}>{item} :</Text>
          ))}
        </View>
        <View>
          {values.map((item, i) => (
            <Text key={i}>{item} </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  detailcard: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: '5%',
    backgroundColor: '#fff',
    elevation: 3,
  },
});

export {DevicesDetailScreen};
