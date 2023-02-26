import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
} from 'react-native';

const FlatListCustom = ({ DATA, renderItem, horizontal, numColumns = 1 }) => {
    return (
        <SafeAreaView>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
                numColumns={numColumns}
            />
        </SafeAreaView>
    );
};

export default FlatListCustom;