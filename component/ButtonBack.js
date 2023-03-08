import { Pressable, Text } from "react-native";

const ButtonBackScreen = ({ navigation, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Text>Back</Text>
        </Pressable>
    );
}

export default ButtonBackScreen;
