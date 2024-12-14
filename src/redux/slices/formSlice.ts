import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {FormCreateApi} from '../../service/endPoints';

interface UserState {
  formFields: [];
  allFroms: [];
  header: string;
  description: string;
  headerImg: string;
  formSaving: boolean;
}

export const saveForm = createAsyncThunk(
  'form/save',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(FormCreateApi, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error saving form:', error);
      rejectWithValue(error.response.data);
    }
  },
);
export const getForms = createAsyncThunk(
  'form/getForms',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(FormCreateApi);
      return response.data;
    } catch (error) {
      console.error('Error saving form:', error);
      rejectWithValue(error.response.data);
    }
  },
);

const initialState: UserState = {
  formFields: [],
  header: 'Untitled Form',
  description: '',
  headerImg: '',
  allFroms: [],
  formSaving: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addHeader: (state, action) => {
      const {field, data} = action.payload;
      state[field] = data;
    },
    addField: (state, action) => {
      state.formFields.push(action.payload);
    },
    resetField: (state, action) => {
      state.formFields = [];
    },
    resetHeader: (state, action) => {
      state.header = 'Untitled Form';
      state.description = '';
      state.headerImg = '';
    },
    updateField: (state, action) => {
      const {id, key, value} = action.payload;
      const field = state.formFields.find(field => field.id === id);
      if (field) {
        field[key] = value;
      }
    },
    deleteField: (state, action) => {
      state.formFields = state.formFields.filter(
        field => field.id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(saveForm.pending, (state, action) => {
      console.log('aaddinng');
      state.formSaving = true;
    });
    builder.addCase(saveForm.fulfilled, (state, action) => {
      state.allFroms.push(action.payload.data);
      state.formSaving = false;
    });
    builder.addCase(saveForm.rejected, (state, action) => {
      console.error(action.payload);
      state.formSaving = false;
    });
    builder.addCase(getForms.pending, (state, action) => {
      console.log('getting');
    });
    builder.addCase(getForms.fulfilled, (state, action) => {
      state.allFroms = action.payload.data;
    });
    builder.addCase(getForms.rejected, (state, action) => {
      console.error(action.payload);
    });
  },
});

export const {
  addField,
  updateField,
  deleteField,
  addHeader,
  resetField,
  resetHeader,
} = formSlice.actions;

export default formSlice.reducer;
