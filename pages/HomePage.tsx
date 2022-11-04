import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import TodoList from '../components/TodoList';
import { firebase } from '@react-native-firebase/firestore';

export default function HomePage({navigation, params}: any) {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User>();

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
        navigation.navigate('LoginPage');
      }
    });

   
  }, []);

  return (
    <View>
      <Text>HomePage</Text>
      {auth().currentUser ? (
        <View>
          <Text>You're logged in as {user?.email} </Text>
          <TodoList />
          <Button
            title="Create Todo!"
            onPress={() => navigation.navigate('CreateTodoPage')}
          />
          <Button title="Logout" onPress={() => auth().signOut()} />
        </View>
      ) : (
        <View>
          <Text>You're not logged in</Text>
          <Button
            title="Login"
            onPress={() => navigation.navigate('LoginPage')}
          />
          <Button
            title="Signup"
            onPress={() => navigation.navigate('SignupPage')}
          />
        </View>
      )}
    </View>
  );
}
