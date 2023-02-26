import { Pressable, StyleSheet, Text, View } from "react-native";

const Table = ({ nTable, status, onPress, backgroundColor = 'white', color = "#343434", borderWidth = 0 }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : (backgroundColor || 'white'),
                    },
                    styles.background,
                ]}>
                <Text style={[styles.title, { color: color }]}>Bàn {nTable}</Text>
                <Text style={[styles.supTitle, { color: color }]}>{status}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8,

        width: "50%",
        height: 100,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderColor: "#d9d9d9",

        width: "100%",

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
    title: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    supTitle: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        marginTop: 8,
    }
});

export default Table;