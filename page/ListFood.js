import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FlatListCustom from "../component/FlatListCustom";
import Textfield from "../component/Textfield";
import { Keyboard } from 'react-native';
import ButtonCustom from "../component/ButtonStatusTable";
import { OPTION_FOOD } from '../config/config';

export default function ListFood() {
    const [search, onChangeSearch] = useState('');
    const [selectedId, setSelectedId] = useState('1');

    console.log("Search: " + search);

    const renderKindOfFood = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#CB3737' : '#EE6F57';
        const color = item.id === selectedId ? 'white' : 'black';

        const handleChangeButton = () => {
            setSelectedId(item.id);

            console.log("click button: " + item.title);
        }

        return (
            <ButtonCustom
                label={item.title}
                onPress={handleChangeButton}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <Pressable
            style={styles.container}
            onPress={Keyboard.dismiss}
        >
            <View style={styles.texting}>
                <Textfield placeholder="Tìm kiếm" onChangeText={onChangeSearch} value={search} />
            </View>
            <FlatListCustom
                DATA={OPTION_FOOD}
                renderItem={renderKindOfFood}
                horizontal={true}
            />
            <Image source={{ uri: 'https://bom.so/j1Armv' }}
                style={{ width: 400, height: 400 }}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    texting: {
        paddingVertical: 10,
        paddingHorizontal: 20,

    }
});