import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from './Icon';
const WIDTH = Dimensions.get('window').width; //full width

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <View>
      <Modal animationType="none" transparent={true} visible={isOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flex: 1,
                width: WIDTH - 80,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={onClose}
                style={{
                  paddingTop: 10,
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon icon="close" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <Text>Точно видалити?</Text>
            <View
              style={{
                display: 'flex',
                flexDirection:'row',
                justifyContent: 'space-around',
                width:"100%",
                paddingTop: 20
              }}
            >
              <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                <Text style={{ color: 'black' }}>Відміна</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                <Text style={{ color: 'black' }}>Видалити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  colorPicker: {
    width: 300,
    height: 500,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalView: {
    width: WIDTH - 40,
    marginVertical: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
