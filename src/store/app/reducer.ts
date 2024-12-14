import { createReducer } from '@reduxjs/toolkit';

import {
  changeCalendar,
  createCalendar,
  deleteCalendar,
  loadCalendar,
  updateCalendar,
  updateColors,
} from './action';
import { DATA_STATUS } from '../../common/consts';
const defaultColors = [
  {
    id: 'color1',
    color: 'dashed',
    title: '0',
  },
  {
    id: 'color2',
    color: '#f57a26',
    title: '10',
  },
  {
    id: 'color3',
    color: '#f03',
    title: '20',
  },
  {
    id: 'color4',
    color: '#672929',
    title: '30',
  },
  {
    id: 'color5',
    color: '#12ffe4',
    title: '40',
  },
  {
    id: 'color6',
    color: '#7e7e00',
    title: '40',
  },
  {
    id: 'color7',
    color: 'rgba(255,0,0,0.9)',
    title: '40',
  },
  {
    id: 'color8',
    color: 'rgba(27,12,12,0.9)',
    title: '40',
  },
  {
    id: 'color9',
    color: 'rgba(117,35,35,0.9)',
    title: '40',
  },
  {
    id: 'color10',
    color: 'rgba(99,69,69,0.9)',
    title: '40',
  },
];

type State = {
  dataStatus: string;
  calendarsNames: Array<{ title: string; key: string }>;
  currentCalendar: Array<Array<{ day: string; color: string }>>;
  currentCalendarName: string;
  colors: Array<{ id: string; color: string; title: string }>;
  error: any;
};

const initialState: State = {
  dataStatus: DATA_STATUS.IDLE,

  calendarsNames: [],
  currentCalendarName: '',
  currentCalendar: [],
  colors: defaultColors,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCalendar.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.currentCalendar = action.payload.calendar;
    state.currentCalendarName = action.payload.currentCalendarName;
    state.colors = action.payload.colors || defaultColors;
    state.calendarsNames = action.payload.calendars;
  });
  builder.addCase(changeCalendar.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.currentCalendar = action.payload.calendar;
    state.currentCalendarName = action.payload.currentCalendarName;
  });
  builder.addCase(deleteCalendar.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.currentCalendar = action.payload.currentCalendar;
    state.currentCalendarName = action.payload.currentCalendarName;
    state.calendarsNames = action.payload.calendarsNames;
  });
  builder.addCase(createCalendar.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.currentCalendarName = action.payload.currentCalendar;
    state.currentCalendar = action.payload.generated_calendar;
    state.calendarsNames.push({
      title: action.payload.currentCalendar,
      key: action.payload.currentCalendar,
    });
  });
  builder.addCase(updateCalendar.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.currentCalendar = action.payload;
  });
  builder.addCase(updateColors.fulfilled, (state, action) => {
    state.dataStatus = DATA_STATUS.FULFILLED;
    state.colors = action.payload;
  });
});

export { reducer };
