import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import TodoList from '../components/TodoList';

export default function HomePage({navigation, params}: any) {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User>();

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
        navigation.navigate('WelcomePage');
      }
    });

   
  }, []);

  return (
    <View>
      {user ? (
        <ScrollView>
          <View
            style={{
              margin: 20
            }}
          >
          <Button
              title="Create Todo!"
              color={"green"}
              onPress={() => navigation.navigate('CreateTodoPage')}
            />
          </View>
          
          <TodoList />
          <View style={{margin: 20}}>
            
            <Text
              style={{alignContent: 'center', textAlign: 'center', paddingTop: 10}}>
            You're logged in as {user?.email} </Text>
            <Button title="Logout" color="red" onPress={() => auth().signOut()} />
            <View style={{margin: 20}}>          
              <Button title="Contact" onPress={() => navigation.navigate("AboutPage")} />
            </View>
          </View>
        </ScrollView>
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
