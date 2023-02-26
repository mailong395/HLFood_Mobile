import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ButtonStatusTable({ label, onPress, backgroundColor, textColor }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={[styles.background, { backgroundColor: backgroundColor }]}>
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 6,
    },
    background: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        borderRadius: 4,

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
        fontWeight: "500",
    }
});