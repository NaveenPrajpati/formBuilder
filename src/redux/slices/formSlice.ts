import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FormCreateApi, FormUpdateApi} from '../../service/endPoints';
import {axiosInstance} from '../../service/interceptor';
import {formTypes} from '../../utils/types';

interface UserState {
  formFields: [];
  allForms: formTypes[];
  header: string;
  description: string;
  headerImg: string;
  formSaving: boolean;
  selectedForm: formTypes;
}

export const saveForm = createAsyncThunk(
  'form/save',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(FormCreateApi, data);
      return response.data;
    } catch (error) {
      console.error('Error saving form:', error);
      rejectWithValue(error.response.data);
    }
  },
);
export const updateForm = createAsyncThunk(
  'form/updateForm',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.put(
        FormUpdateApi(data.id),
        data.data,
      );
      return response.data;
    } catch (error) {
      console.error('Error updating form:', error);
      rejectWithValue(error.response.data);
    }
  },
);
export const getForms = createAsyncThunk(
  'form/getForms',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(FormCreateApi);
      return response.data;
    } catch (error) {
      console.error('Error saving form:', error);
      rejectWithValue(error.response.data);
    }
  },
);
export const deleteForm = createAsyncThunk(
  'form/deleteForm',
  async (id, {rejectWithValue, dispatch}) => {
    try {
      const response = await axiosInstance.delete(FormUpdateApi(id));
      dispatch(getForms());
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
  allForms: [],
  formSaving: false,
  selectedForm: {
    header: '',
    description: '',
    headerImg: '',
    fields: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addHeader: (state, action) => {
      const {field, data} = action.payload;
      state.selectedForm[field] = data;
    },
    setSelectedForm: (state, action) => {
      state.selectedForm = action.payload;
    },
    addField: (state, action) => {
      state.selectedForm.fields.push(action.payload);
    },
    resetField: (state, action) => {
      state.selectedForm.fields = [];
    },
    resetHeader: (state, action) => {
      state.header = 'Untitled Form';
      state.description = '';
      state.headerImg = '';
    },
    updateField: (state, action) => {
      const {id, key, value} = action.payload;
      const field = state.selectedForm.fields.find(field => field.id === id);
      if (field) {
        field[key] = value;
      }
    },
    deleteField: (state, action) => {
      state.selectedForm.fields = state.selectedForm.fields.filter(
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
      state.allForms.push(action.payload.data);
      state.selectedForm = action.payload.data;
      state.formSaving = false;
    });
    builder.addCase(saveForm.rejected, (state, action) => {
      console.error(action.payload);
      state.formSaving = false;
    });
    builder.addCase(updateForm.pending, (state, action) => {
      console.log('updating...');
      state.formSaving = true;
    });
    builder.addCase(updateForm.fulfilled, (state, action) => {
      state.selectedForm = {...state.selectedForm, ...action.payload.data};
      state.allForms = state.allForms.map(it => {
        if (it._id == state.selectedForm._id) {
          return state.selectedForm;
        }
        return it;
      });
      state.formSaving = false;
    });
    builder.addCase(updateForm.rejected, (state, action) => {
      console.error(action.payload);
      state.formSaving = false;
    });
    builder.addCase(getForms.pending, (state, action) => {
      console.log('getting');
    });
    builder.addCase(getForms.fulfilled, (state, action) => {
      state.allForms = action.payload.data;
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
  setSelectedForm,
} = formSlice.actions;

export default formSlice.reducer;
