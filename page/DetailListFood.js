import { StyleSheet, Text, View } from "react-native";

const DetailListFood = () => {

    return <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.title}>Thông tin chung</Text>
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Trạng thái</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Ngày</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Giờ</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Tên khách hàng</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Số điện thoại</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
            </View>
        </View>
        <View>
            <Text>Danh sách món ăn</Text>
            <View></View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    info: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 4,
    },
    supTitle: {
        flex: 1.5,
        paddingVertical: 2,
    },
    content: {
        flex: 2
    }
});

export default DetailListFood;