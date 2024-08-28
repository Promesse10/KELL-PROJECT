import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../sevices/authService';
import Cookies from 'js-cookie';

const initialState = {
  user: JSON.parse(Cookies.get('user') || '{}'),
  isLoggedIn: !!Cookies.get('token'),
  loading: false,
  error: null,
};

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const data = await authService.register(userData);
    Cookies.set('user', JSON.stringify(data.user), { expires: 15 });
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const data = await authService.login(email, password);
    Cookies.set('user', JSON.stringify(data.user), { expires: 15 });
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Login failed');
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
  try {
    const data = await authService.getProfile();
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch profile');
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, thunkAPI) => {
  try {
    const data = await authService.updateProfile(userData);
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update profile');
  }
});

export const updatePassword = createAsyncThunk('auth/updatePassword', async (passwordData, thunkAPI) => {
  try {
    const data = await authService.updatePassword(passwordData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update password');
  }
});

export const updateProfilePic = createAsyncThunk('auth/updateProfilePic', async (formData, thunkAPI) => {
  try {
    const data = await authService.updateProfilePic(formData);
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to update profile picture');
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (resetData, thunkAPI) => {
  try {
    const data = await authService.resetPassword(resetData);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || 'Password reset failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      Cookies.remove('user');
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
