import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { ACTIVE_EMP, ACTIVE_FOOD, ACTIVE_TABLE } from '../../config/config';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const ModalComp = ({ isShow, props, handleCloseModal, itemSelected }) => {
  const userSelector = useSelector((state) => state.auth);
  const renderItem = ({ item }) => {
    const isShow = checkStatus(item.id);

    return isShow ? (
      <Button icon={item.icon} mode="contained" onPress={() => props(item.id)} style={{ flex: 1, margin: 8 }}>
        {item.title}
      </Button>
    ) : (
      <></>
    );
  };

  // Handle
  const checkStatus = (id) => {
    switch (id) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        if (itemSelected?.is_outdated) {
          return false;
        }
        return true;
      case 3:
        if (itemSelected?.is_outdated) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isShow} onRequestClose={handleCloseModal}>
      <Pressable style={styles.centeredView} onPress={handleCloseModal}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={{ alignItems: 'center', paddingTop: 10 }}>
              <View style={{ height: 4, width: 40, backgroundColor: '#d9d9d9', borderRadius: 10 }}></View>
            </View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Chức năng</Text>
              <Pressable style={styles.buttonClose} onPress={handleCloseModal}>
                <Icon name="close" size={24} color={'#c4c4c4'} />
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <FlatList
                data={ACTIVE_FOOD}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalComp;

const styles = StyleSheet.create({
  // Style Modal
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 10,
    width: 48,
  },
  modalBody: {
    padding: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
