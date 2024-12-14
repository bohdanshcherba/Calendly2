import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { generateMonthArrays } from '../common/generateMonthArrays';
import { useAppSelector } from '../store/store';
import { Dashed } from './Dashed';

const width = Dimensions.get('window').width; //full height
const height = Dimensions.get('window').height; //full height
export const size = height / 32;

const days = Array.from({ length: 31 }, (v, i) => i + 1);
const monthsNames = [
  { day: '', key: '000' },
  { day: 'С', key: '123' },
  { day: 'Л', key: '456' },
  { day: 'Б', key: '789' },
  { day: 'К', key: '012' },
  { day: 'Т', key: '345' },
  { day: 'Ч', key: '678' },
  { day: 'Л', key: '901' },
  { day: 'С', key: '234' },
  { day: 'В', key: '567' },
  { day: 'Ж', key: '890' },
  { day: 'Л', key: '1234' },
  { day: 'Г', key: '4564' },
];
let resultArray = generateMonthArrays();

let Day = ({ day }: any) => {
  const isDashed = day.color === 'dashed';

  return (
    <View
      style={[
        styles.block,
        {
          overflow: 'hidden',
          backgroundColor: !isDashed ? day.color : 'white',
          borderColor: isDashed ? 'black' : borderColor,
          borderWidth: isDashed ? 1.5 : 1,
        },
      ]}
    >
      {isDashed ? (
        <Dashed style={{ position: 'absolute' }} size={size + 20} />
      ) : null}
    </View>
  );
};

const MemoDay = React.memo(Day);

const Month = ({ month }: any) => {
  return (
    <View>
      {month.map((day: any, dayIndex: number) => (
        <MemoDay day={day} key={dayIndex} />
      ))}
    </View>
  );
};
const borderColor = '#e3e3e3';
const CalendarComponent = () => {
  const { currentCalendar } = useAppSelector((state) => state.AppReducer);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: borderColor,
          borderTopEndRadius: 5,
        }}
      >
        {monthsNames.map((el) => (
          <View key={el.key} style={styles.block}>
            <Text style={{ color: 'black', textAlign: 'center', width: size }}>
              {el.day}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: borderColor,
        }}
      >
        <View>
          {days.map((el) => (
            <View key={el} style={styles.block}>
              <Text style={{ color: 'black' }}>{el}</Text>
            </View>
          ))}
        </View>
        <View style={styles.container}>
          {currentCalendar.map((month, index) => (
            <Month
              key={Math.random()}
              month={month}
              lastMonth={index === resultArray.length - 1}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export const Calendar = React.memo(CalendarComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  monthBlock: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 5,
  },
  text: {
    color: 'black',
  },
});
