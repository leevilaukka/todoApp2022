import React from 'react';
import { Text } from 'react-native';
import {Card} from 'react-native-paper';

export default function AboutPage() {
  return (
    <Card>
      <Card.Title title="About and Contact" />
      <Card.Content>
        <Text>
          This is a simple todo app made by Leevi Laukka (2004696) for the Cross Platform Mobile App Development Course in Laurea UAS.
        </Text>
        <Text>
          The app is made with React Native and Firebase.
        </Text>
        <Text>
          Email: leevi.laukka@student.laurea.fi
        </Text>
      </Card.Content>
    </Card>
  );
}
