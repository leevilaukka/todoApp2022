import {View, Text} from "react-native";

export default function Todo({ description, completed, title }) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
            {completed ? <Text>Completed</Text> : <Text>Not Completed</Text>}
        </View>
    );
}
