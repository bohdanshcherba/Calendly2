import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common';
import { AsyncThunkConfig } from '../store';
import { STORAGE_KEYS } from '../../common/consts';
import { generateMonthArrays } from '../../common/generateMonthArrays';

export const updateCalendar = createAsyncThunk<
  any,
  { day: string; color: string; selectedDate: Date },
  AsyncThunkConfig
>(
  ActionType.UPDATE_CALENDAR,
  async ({ day, color, selectedDate }, { extra, getState }) => {
    const { storage } = extra;
    const { currentCalendar, currentCalendarName } = getState().AppReducer;
    const newCalendar = [...currentCalendar];
    const currentMoth = selectedDate.getMonth();
    newCalendar[currentMoth] = currentCalendar[currentMoth].map((el) => {
      if (el.day === day) {
        return { ...el, color: color };
      }
      return el;
    });
    await storage.save(currentCalendarName, newCalendar);
    return newCalendar;
  }
);

export const loadCalendar = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.LOAD_CALENDARS,
  async (value, { extra }) => {
    const { storage } = extra;
    const currentCalendarName = await storage.load(
      STORAGE_KEYS.CURRENT_CALENDAR
    );
    if (!currentCalendarName) {
      throw Error('No calendars');
      // eslint-disable-next-line no-unreachable
      return null;
    }
    const calendar = await storage.load(currentCalendarName);
    const calendars = await storage.load(STORAGE_KEYS.CALENDARS);
    const colors = await storage.load(STORAGE_KEYS.COLORS);

    return { calendar, colors, currentCalendarName, calendars };
  }
);
export const changeCalendar = createAsyncThunk<any, any, AsyncThunkConfig>(
  ActionType.CHANGE_CALENDAR,
  async (value, { extra }) => {
    const { storage } = extra;

    const calendar = await storage.load(value);
    await storage.save(STORAGE_KEYS.CURRENT_CALENDAR, value);
    return { calendar, currentCalendarName: value };
  }
);

export const createCalendar = createAsyncThunk<any, string, AsyncThunkConfig>(
  ActionType.CREATE_CALENDAR,
  async (value, { extra, getState }) => {
    const { storage } = extra;
    const { calendarsNames, colors } = getState().AppReducer;
    await storage.save(STORAGE_KEYS.CURRENT_CALENDAR, value);
    const generated_calendar = generateMonthArrays();
    await storage.save(value, generated_calendar);
    await storage.save(STORAGE_KEYS.CALENDARS, [
      ...calendarsNames,
      { title: value, key: value },
    ]);

    return { generated_calendar, currentCalendar: value, colors };
  }
);

export const deleteCalendar = createAsyncThunk<any, string, AsyncThunkConfig>(
  ActionType.DELETE_CALENDAR_NAME,
  async (key, { extra, getState }) => {
    const { storage } = extra;
    const { calendarsNames, currentCalendarName, currentCalendar } =
      getState().AppReducer;
    let current = currentCalendarName;
    let calendar = currentCalendar;
    if (key === currentCalendarName) {
      current = calendarsNames[0].key;

      await storage.save(STORAGE_KEYS.CURRENT_CALENDAR, current);
      calendar = await storage.load(current);
    }
    let newCalendarNames = calendarsNames;
    if (calendarsNames.length > 1) {
      newCalendarNames = calendarsNames.filter((item) => item.key !== key);
      await storage.save(STORAGE_KEYS.CALENDARS, newCalendarNames);
      await storage.remove(key);
    }

    return {
      currentCalendarName: current,
      calendarsNames: newCalendarNames,
      currentCalendar: calendar,
    };
  }
);

export const updateColors = createAsyncThunk<
  any,
  { id: string; title: string; color: string },
  AsyncThunkConfig
>(ActionType.UPDATE_COLORS, async (color, { extra, getState }) => {
  const { storage } = extra;
  const { colors } = getState().AppReducer;
  const updatedColors = colors.map((item) =>
    item.id === color.id ? color : item
  );
  await storage.save(STORAGE_KEYS.COLORS, updatedColors);

  return updatedColors;
});
