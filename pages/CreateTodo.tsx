import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';

export default function CreateTodo({navigation}: any) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState('');

  const handleCreateTodo = () => {
    // create todo and save to firebase
    firestore()
      .collection('todos')
      .add({
        title,
        description,
        date,
        owner: auth().currentUser?.email,
        completed: false,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        console.log('Todo created!');
        navigation.navigate('HomePage');
      });
  };

  return (
    <View>
      <Text>CreateTodo</Text>

      {/* todo form */}
      {auth().currentUser?.email ? (
        <View>
          <Text>Title</Text>
          <TextInput value={title} onChangeText={setTitle} />
          <Text>Description</Text>
          <TextInput value={description} onChangeText={setDescription} />
          <Text>Due Date</Text>
          <TextInput value={date} onChangeText={setDate} />
          {/* create todo button */}
          <Button title="Create Todo" onPress={handleCreateTodo} />
        </View>
      ) : (
        <Text>You must be logged in to create a todo</Text>
      )}
    </View>
  );
}
