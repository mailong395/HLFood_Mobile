import { StyleSheet, Text, View } from "react-native";

const BookedTable = ({ item }) => {
    const hourAndMinute = item.time.getHours() + ":" + item.time.getMinutes();
    return (
        <View style={styles.tableBody}>
            <Text style={styles.tableContent}>Bàn {item.table_num}</Text>
            <Text style={styles.tableContent}>{hourAndMinute}</Text>
            <Text style={styles.tableContent}>{item.name}</Text>
            <Text style={styles.tableContent}>{item.phone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tableBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#d9d9d9",
    },
    tableContent: {
        flex: 1,
        fontSize: 14,
        fontWeight: "400",
        color: "#343434",
    },
});

export default BookedTable;