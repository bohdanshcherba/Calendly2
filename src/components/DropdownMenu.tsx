import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

export const DropdownMenu = ({
  items,
  setItem,
  onCreate,
  onItemLongPress,
}: {
  items: any[];
  onCreate: () => void;
  setItem: (item: any) => void;
  onItemLongPress: (item: any) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{ alignItems: 'center', width: '100%' }}
        onPress={() => setOpen((prevState) => !prevState)}
      >
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '700' }}>
          ...
        </Text>
      </TouchableOpacity>
      {open && (
        <View
          style={{
            position: 'absolute',
            top: 40,
            right: 0,
            backgroundColor: 'white',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            width: 200,
            maxHeight: 150,
            zIndex: 1,
          }}
        >
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setOpen(false);
                  setItem(item);
                }}
                onLongPress={() => {
                  setOpen(false);
                  onItemLongPress(item);
                }}
                style={{ padding: 10 }}
              >
                <Text style={{ color: 'black' }}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              onCreate();
              setOpen(false);
            }}
            style={{ padding: 10 }}
          >
            <Text style={{ color: 'black' }}>Створити</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
