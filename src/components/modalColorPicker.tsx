import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';
import { ModalHeader } from './ModalHeader';
import { useAppDispatch } from '../store/store';
import { updateColors } from '../store/app/action';
// @ts-ignore
import colorConvert from 'color-convert';

const WIDTH = Dimensions.get('window').width; //full width

export const ModalColorPicker = ({ isOpen, setIsOpen, color }: any) => {
  const [selectedColor, setSelectedColor] = useState<any>(color.color);
  const [value, setValue] = useState(color.title);

  useEffect(() => {
    setSelectedColor(color.color);
    setValue(color.title);
  }, [color.title, color.color]);

  const dispatch = useAppDispatch();

  const submitColor = () => {
    dispatch(
      updateColors({
        id: color.id,
        title: value,
        color: selectedColor,
      })
    );
    setIsOpen(false);
  };

  const handleColorChange = (newColor: any) => {
    const rgbColor = colorConvert.hsv.hex(
      newColor.h,
      newColor.s * 100,
      newColor.v * 100
    );
    setSelectedColor('#' + rgbColor);
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalHeader setIsOpen={setIsOpen} />
            <TriangleColorPicker
              color={selectedColor}
              onColorChange={(color) => handleColorChange(color)}
              style={styles.colorPicker}
              defaultColor={color.color}
              onColorSelected={() => submitColor()}
            />
            <TextInput
              value={selectedColor}
              onChangeText={(text) => setSelectedColor(text)}
              style={{
                borderWidth: 1,
                width: 200,
                color: 'black',
                borderRadius: 5,
                marginBottom: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            />
            <TextInput
              value={value}
              onChangeText={(text) => setValue(text)}
              style={{
                borderWidth: 1,
                width: 200,
                color: 'black',
                borderRadius: 5,
                marginBottom: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            />
            <View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => submitColor()}
              >
                <Text style={{ color: 'black' }}>Зберегти</Text>
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
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalView: {
    width: WIDTH - 40,
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
