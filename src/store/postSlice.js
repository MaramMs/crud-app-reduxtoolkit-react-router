import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(" http://localhost:5000/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const {
      auth: { userId },
    } = getState();
    item.userId = userId;
    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "content-type": " application/json; charset=utf-8",
        },
      });
      const data = res.json();

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(item),
        headers: {
          "content-type": " application/json; charset=utf-8",
        },
      });
      const data = res.json();
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
const initialState = { records: [], loading: false, error: null, record: {} };
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = {};
    },
  },
  extraReducers: {
    // fetch post
    [fetchPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.record = {};
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    //fetch Posts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    // insert post
    [insertPost.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [insertPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertPost.rejected]: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
    // update post
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete post
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;

      state.error = action.payload;
    },
  },
});
export const {cleanRecord } =  postSlice.actions
export default postSlice.reducer;
