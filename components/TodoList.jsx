import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Todo from './Todo';
import {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = firestore()
            .collection('todos')
            .where('owner', '==', auth().currentUser.email)
            .onSnapshot(querySnapshot => {
                console.log(querySnapshot)
                const todolist = [];
                querySnapshot.forEach(documentSnapshot => {
                    todolist.push({
                        ...documentSnapshot.data(),
                        id: documentSnapshot.id,
                    });
            });

            setTodos(todolist);
            setLoading(false);
            console.log(todolist);
        });

    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
  return (
    <View>
        {loading ? (
            <ActivityIndicator/>
        ) : (
            todos.map((todo) => (
                <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} completed={todo.completed} date={todo.date} />
            ))
        )}
    </View>
  );
}
