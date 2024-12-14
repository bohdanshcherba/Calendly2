import React, { useEffect, useState } from 'react';

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Calendar, size } from '../components/calendar';
import { ModalColorPicker } from '../components/modalColorPicker';
import { DropdownMenu } from '../components/DropdownMenu';
import { useAppDispatch, useAppSelector } from '../store/store';
import { CreateNewCalendarModal } from '../components/createNewCalendarModal';
import {
  changeCalendar,
  createCalendar,
  deleteCalendar,
  loadCalendar,
} from '../store/app/action';
import { MonthModal } from '../components/monthModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';

export const Home = (): JSX.Element => {
  const { calendarsNames, colors } = useAppSelector(
    (state) => state.AppReducer
  );
  const [isModal, setIsModal] = useState(false);
  const [itemForDelete, setItemForDelete] = useState('');
  const [modalColor, setModalColor] = useState('');
  const [isCreateNewModalOpen, setIsCreateNewModalOpen] = useState(false);
  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCalendar([])).then((e) => {
      // @ts-ignore
      if (e.error) {
        setIsCreateNewModalOpen(true);
      }
    });
  }, [dispatch]);

  const handleChangePage = (item: any) => {
    dispatch(changeCalendar(item.key));
  };
  const handleCreateNewCalendar = (name: string) => {
    if (name !== '') {
      dispatch(createCalendar(name));
      setIsCreateNewModalOpen(false);
    }
  };

  const handleOpenColorPicker = (color: any) => {
    setIsModal(true);
    setModalColor(color);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ModalColorPicker
        isOpen={isModal}
        setIsOpen={setIsModal}
        color={modalColor}
      />
      <CreateNewCalendarModal
        isOpen={isCreateNewModalOpen}
        setIsOpen={setIsCreateNewModalOpen}
        submit={handleCreateNewCalendar}
      />
      <ConfirmDeleteModal
        isOpen={Boolean(itemForDelete)}
        onClose={() => setItemForDelete('')}
        onSubmit={() => {
          dispatch(deleteCalendar(itemForDelete));
          setItemForDelete('');
        }}
      />
      <MonthModal
        isOpen={isMonthModalOpen}
        setIsOpen={setIsMonthModalOpen}
        onOpenColorPicker={handleOpenColorPicker}
      />
      <View style={{ flexDirection: 'row', flex: 2 }}>
        <View>
          <ScrollView>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsMonthModalOpen(true)}
            >
              <Calendar />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 20,
          }}
        >
          <DropdownMenu
            items={calendarsNames}
            setItem={handleChangePage}
            onItemLongPress={(item) => setItemForDelete(item.key)}
            onCreate={() => setIsCreateNewModalOpen(true)}
          />
          {colors.map((color) => (
            <View
              key={color.color}
              style={{
                flexDirection: 'row',
                height: size,
                width: '100%',
                justifyContent: 'space-around',
              }}
            >
              <View>
                <Text
                  style={{
                    color: color.color === 'dashed' ? 'black' : color.color,
                    fontWeight: '700',
                  }}
                >
                  {color.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
