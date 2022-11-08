import auth from '@react-native-firebase/auth';

import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import { Card } from 'react-native-paper';

export default function LoginPage({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errors, setErrors] = React.useState<string[]>([]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('User signed in');
        navigation.navigate('HomePage');
      })
      .catch(error => {
        setErrors([error.message, ...errors]);
      });
  };
  return (
    <Card
      style={{
        padding: 20,
        margin: 20,

      }}
    >
      <Card.Content>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={(text) => {
          setErrors([]);
          setEmail(text);
        }} />
        <Text>Password</Text>
        <TextInput value={password} secureTextEntry onChangeText={(text) => {
          setErrors([]);
          setPassword(text);
        }} />
        {errors.map((error, index) => {
          return <Text key={index}>{error}</Text>;
        })}
      </Card.Content>
      <Card.Actions
        style={{
          justifyContent: 'space-around',
        }}
      >
        <Button title="Login" onPress={handleLogin} />
        <Button
          title="Signup"
          onPress={() => navigation.navigate('SignupPage')}
        />
      </Card.Actions>
    </Card>
  );
}
