import auth from '@react-native-firebase/auth';

import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';

export default function LoginPage({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('User signed in');
        navigation.navigate("HomePage", {user: auth().currentUser});
      });
  };
  return (
    <View>
      <Text>LoginPage</Text>
      {/* login form */}
      <View>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail} />
        <Text>Password</Text>
        <TextInput value={password} onChangeText={setPassword} />
        {/* login button */}
        <Button title="Log in" onPress={handleLogin} />
      </View>
    </View>
  );
}
