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
import { Icon } from './Icon';
import { getCurrentMonthDays } from '../common/generateMonthArrays';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Dashed } from './Dashed';
import { updateCalendar } from '../store/app/action';

const WIDTH = Dimensions.get('window').width; //full width
const size = (WIDTH - 80) / 7;

const monthsUA = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const DayComponent = ({ day, color, onClick }: any) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(day)}
      activeOpacity={0.6}
      style={[
        styles.block,
        {
          overflow: 'hidden',
          backgroundColor: color !== 'dashed' ? color : 'white',
        },
      ]}
    >
      {color === 'dashed' ? (
        <Dashed
          style={{
            position: 'absolute',
            transform: [{ translateX: 0 }, { translateY: 0 }],
          }}
          size={size + 40}
        />
      ) : null}
      <Text style={styles.blockText}> {day.split('/')[0]}</Text>
    </TouchableOpacity>
  );
};
const Day = React.memo(DayComponent);

export const MonthModal = ({ isOpen, setIsOpen, onOpenColorPicker }: any) => {
  const { colors, currentCalendar } = useAppSelector(
    (state) => state.AppReducer
  );
  const [days, setDays] = useState<Array<any>>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedColor, setSelectedColor] = useState('dashed');
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentCalendar.length > 0) {
      setDays(getCurrentMonthDays(currentCalendar, selectedDate));
    }
  }, [currentCalendar, selectedDate]);

  const handleMarkDay = (day: any) => {
    console.log(day);
    setDays((prevState) =>
      prevState.map((el) => {
        if (el && el.day === day) {
          return { ...el, color: selectedColor };
        }
        return el;
      })
    );
    dispatch(
      updateCalendar({ day, color: selectedColor, selectedDate: selectedDate })
    );
  };

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={isOpen}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                marginBottom: 20,
                width: WIDTH - 40,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon icon="close" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                disabled={selectedDate.getMonth() === 0}
                onPress={() =>
                  setSelectedDate((prevState) => {
                    const newDate = new Date(prevState);
                    newDate.setMonth(prevState.getMonth() - 1);
                    return newDate;
                  })
                }
              >
                <Icon icon="chevronLeft" color="black" size={20} />
              </TouchableOpacity>
              <Text style={{ fontWeight: 500, fontSize: 18 }}>
                {monthsUA[selectedDate.getMonth()]}
              </Text>
              <TouchableOpacity
                disabled={selectedDate.getMonth() === 11}
                onPress={() =>
                  setSelectedDate((prevState) => {
                    const newDate = new Date(prevState);
                    newDate.setMonth(prevState.getMonth() + 1);
                    return newDate;
                  })
                }
              >
                <Icon icon="chevronRight" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={{ width: size * 7 }}>
              <View style={{ flexDirection: 'row' }}>
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map((day) => (
                  <View
                    key={day}
                    style={[
                      styles.block,
                      {
                        borderRadius: 5,
                      },
                    ]}
                  >
                    <Text style={styles.blockText}>{day}</Text>
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {days.map((day, index) =>
                  day ? (
                    <Day
                      key={day.day}
                      day={day.day}
                      color={day.color}
                      onClick={handleMarkDay}
                    />
                  ) : (
                    <View
                      key={`month_day_${index}`}
                      style={[styles.block, { borderWidth: 0 }]}
                    />
                  )
                )}
              </View>
              <View
                style={{
                  gap: 40,
                  width: '100%',
                  marginTop: 30,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {colors.map((color) => (
                  <View key={color.color}>
                    {color.color === 'dashed' ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedColor(color.color)}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 99,
                          overflow: 'hidden',
                          borderWidth: selectedColor === color.color ? 1 : 0,
                        }}
                      >
                        <Dashed size={30} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedColor(color.color)}
                        style={{
                          backgroundColor: color.color,
                          width: 30,
                          height: 30,
                          borderRadius: 99,
                          borderWidth: selectedColor === color.color ? 1 : 0,
                        }}
                      />
                    )}
                    <TouchableOpacity onPress={() => onOpenColorPicker(color)}>
                      <Text
                        style={{
                          color: 'black',
                          borderBottomWidth: 1,
                          textAlign: 'center',
                          paddingVertical: 5,
                        }}
                      >
                        {color.title}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: WIDTH - 20,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
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
  block: {
    width: size,
    height: size,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#d0d0d0',
  },
  blockText: {
    color: '#000000',
    textAlign: 'center',
  },
});
