import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import axios from 'axios';
import {Loader} from '../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({route, navigation}) => {
  const {userid, app_token} = route.params;
  const [loading, setLoading] = useState(false);
  const [deviceNo, setDeviceNo] = useState();
  const [deviceData, setDeviceData] = useState([]);
  const [deviceDetail, setDeviceDetail] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
    return unsubscribe;
  }, [navigation]);

  const getDeviceList = async () => {
    return await axios
      .post('http://ems.lande.com.tr/api/userdeviceslist', {
        app_token: app_token,
        userid: userid,
        cihaz_no: [deviceNo],
      })
      .then(response => {
        setDeviceData(response.data.cihaz_no);
        console.log(response.data.cihaz_no);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getDeviceDetail = async () => {
    return await axios
      .post('http://ems.lande.com.tr/api/userdevicesloglist', {
        app_token: app_token,
        userid: userid,
        limit: 1,
        cihaz_no: [deviceNo],
      })
      .then(response => {
        setDeviceDetail(response.data[`${deviceNo}`].cihaz_last_data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Input placeholder={'Cihaz No Giriniz'} onChangeText={setDeviceNo} />
      <Button
        buttonStyle={styles.button}
        onPress={() => {
          getDeviceList();
          getDeviceDetail();
        }}
        title="Devices List"
        type="outline"
      />

      <FlatList
        data={deviceData}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                getDeviceDetail();
                navigation.navigate('DevicesDetailScreen', {
                  deviceDetail,
                });
              }}>
              <View style={styles.card}>
                <Text> Ad Soyad : {item.ad_soyad} </Text>
                <Text> Cihaz No : {item.cihaz_no}</Text>
                <Text> Konum : {item.konum}</Text>
                <Text> Son Haberleşme : {item.son_haberlesme}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    margin: '5%',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
});

export {HomeScreen};
