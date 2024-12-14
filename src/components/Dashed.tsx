import React from 'react';
import { SvgXml } from 'react-native-svg';
import { xml } from '../assets/dashed';
import { View } from 'react-native';

export const Dashed = ({ size, ...rest }: any) => {
  return (
    <View {...rest}>
      <SvgXml
        xml={xml}
        style={{ transform: [{ rotate: '-45deg' }] }}
        width={size}
        height={size}
      />
    </View>
  );
};
