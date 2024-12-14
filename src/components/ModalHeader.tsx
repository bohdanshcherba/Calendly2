import React, { Dimensions, TouchableOpacity, View } from 'react-native';
import { Icon } from './Icon';
const WIDTH = Dimensions.get('window').width; //full width

export const ModalHeader = ({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: WIDTH - 80,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}
    >
      <TouchableOpacity
        onPress={() => setIsOpen(false)}
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
  );
};
