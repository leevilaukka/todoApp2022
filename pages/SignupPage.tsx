import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default function SignupPage({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        navigation.navigate('HomePage', {user});
      })
      .catch(error => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
      });
  };

  return (
    <View>
      <Text>SignupPage</Text>
      {/* login form */}
      <View>
        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail} />
        <Text>Password</Text>
        <TextInput value={password} onChangeText={setPassword} />
        <Text>Confirm Password</Text>
        <TextInput value={password} onChangeText={setPassword} />
        {/* login button */}
        <Button title="Signup" onPress={handleSignup} />
        <Button title='To home' onPress={() => navigation.navigate('HomePage')} />
      </View>
    </View>
  );
}
