import {View, Text, Button} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import React from 'react';
import { Card } from 'react-native-paper';

export default function Todo({
  description,
  completed,
  title,
  id,
  date,
}: {
  description: string;
  completed: boolean;
  title: string;
  id: string;
  date: FirebaseFirestoreTypes.Timestamp;
}) {
  const toggleCompleted = () => {
    firestore()
      .collection('todos')
      .doc(id)
      .update({
        completed: !completed,
      })
      .catch(error => {
        console.error(error);
      });
    console.log(date);
  };

  const handleDelete = () => {
    firestore()
      .collection('todos')
      .doc(id)
      .delete()
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Card
      style={{
        borderRadius: 10,
        padding: 10,
        margin: 10,
      }}>
      
      <Card.Title title={title} />
        <Card.Content>
            <Text>{description}</Text>
            <Text>
                {
                    completed ? 'Done!' : `Due ${date.toDate().toLocaleDateString('fi')}`
                }
            </Text>
        </Card.Content>
        <Card.Actions
            style={{
                justifyContent: 'space-between',
            }}
        >
            <Button title={ completed ? "Mark un-done" : "Mark Done" } onPress={toggleCompleted} />
            {
                completed ? <Button title="Delete" color={"red"} onPress={handleDelete} /> : null
            }
        </Card.Actions>
    </Card>
  );
}
