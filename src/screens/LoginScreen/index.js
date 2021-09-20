import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

import {Input, Button} from 'react-native-elements';

const LoginScreen = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    return await axios
      .post('http://ems.lande.com.tr/api/userlogin', {
        email: mail,
        password: password,
      })
      .then(response => {
        console.log(response.data);
        const userid = response.data.userid;
        const app_token = response.data.app_token;
        navigation.navigate('HomeScreen', {
          userid,
          app_token,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={setMail}
        keyboardType="email-address"
        placeholder="E-mail adress"
      />
      <Input
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />
      <Button onPress={() => login()} title="Login" type="outline" raised />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoginScreen};
