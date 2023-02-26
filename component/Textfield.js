import { useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Textfield({ placeholder, onChangeText, value }) {
    const inputRef = useRef();
    return (
        <TouchableOpacity
            style={styles.input}
            onPress={
                () => inputRef.current.focus()
            }
        >
            <Icon
                name="search"
                size={20} color="#343434"
                style={styles.icon}
            />
            <TextInput
                placeholder={placeholder}
                style={styles.text}
                ref={inputRef}
                onChangeText={onChangeText}
                value={value}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    input: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
    },
});