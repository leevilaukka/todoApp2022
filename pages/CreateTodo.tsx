import React from 'react';
import {View, Text, Button, TextInput,  DatePickerIOSComponent} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker';
import { Card } from 'react-native-paper';

export default function CreateTodo({navigation}: any) {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleCreateTodo = () => {
    if (title === '' || description === '') {
      setErrors(['Please fill in all fields', ...errors]);
      return;
    }

    const newDate = new Date(date.setHours(0,0,0,0));
    
    // create todo and save to firebase
    firestore()
      .collection('todos')
      .add({
        title,
        description,
        date: firestore.Timestamp.fromDate(newDate),
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
      {auth().currentUser?.email ? (
        <Card
          style={{
            padding: 20,
            margin: 20,
          }}
        >
          <Card.Content>
            <Text>Title</Text>
            <TextInput value={title} onChangeText={setTitle} />
            <Text>Description</Text>
            <TextInput value={description} onChangeText={setDescription} />
            <Text>Due Date</Text>
            <DatePicker 
              date={date}
              onDateChange={setDate}
              mode="date"
              style={{alignContent: 'center'}}
              androidVariant='nativeAndroid'
              />
            {errors.map((error, index) => {
              return <Text key={index}>{error}</Text>;
            })}
          </Card.Content>
          {/* create todo button */}
          <Card.Actions>
            <Button title="Create Todo" onPress={handleCreateTodo} />
          </Card.Actions>
        </Card>
      ) : (
        <Text>You must be logged in to create a todo</Text>
      )}
    </View>
  );
}
