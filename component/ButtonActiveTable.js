import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ButtonActiveTable({ label, onPress, backgroundColor, textColor }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={({ pressed }) => [
                { backgroundColor: pressed ? 'rgb(210, 230, 255)' : backgroundColor },
                styles.background,
            ]}>
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 6,
    },
    background: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#d9d9d9",

        height: 48,

        // Box Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    text: {
        fontSize: 14,
        fontWeight: "500",
    }
});