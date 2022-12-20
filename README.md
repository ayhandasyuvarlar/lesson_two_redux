# Redux_lesson_two

- createAsyncThunk
- extraReducers
- axios

```jsx
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});
// Then, handle actions in your reducers:
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers(builder) {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and  reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
            eyes: 0,
          };
          return post;
        });
        // add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// export porcess
export const selectAllPost = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
```

# Redux Toolkit

#### Redux ile çalışırken yapılandırmalar ve middleware’ler arasında boğuşup duruyorsanız, karşılaştığınız sorunlarda bunun best practice’i nedir diye sürekli düşünüyorsanız Redux Toolkit’e geçmek için iyi bir zaman olabilir.

#### Redux Toolkit, Redux ve eklentilerini sizler için derleyip, best practice’leri uygulayarak bir araya getiren bir kütüphane.

# Redux Toolkit neleri içeriyor?

- Immutable state yönetimi için [immer](https://github.com/immerjs/immer).
- Selector kütüphanesi olarak [reselect](https://github.com/reduxjs/reselect)
- Async işlemler için [Redux-thunk](https://github.com/reduxjs/redux-thunk). (Redux-saga ile yapılandırabilirsiniz.)
- Debugging için [Redux-Devtools](https://github.com/reduxjs/redux-devtools) .

# Store’un Yapısı

#### Redux Toolkit’de Store’u yapılandırmak “createStore” a göre oldukça basit. Reducer’ları içeren rootReducer dosyanızı ve varsa custom middleware’ları aşağıdaki şekilde yapılandırabilirsiniz.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../post/postSlice";
import userSlice from "../users/userSlice";
export const store = configureStore({
  reducer: {
    posts: postSlice,
    users: userSlice,
  },
});
```

# Slice’ın Yapısı

#### Redux mantıksal ifadeleriniz oluşturmak için kullanabileceğiniz standart yöntem createSlice’ı kullanmaktır.

#### Bir Slice nesnesi, Redux Store’unun bir parçasını (key/value kısmını) temsil eder.

#### createSlice fonksiyonunun yapısı aşağıdaki gibi:

```jsx
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
});
```

#### Slice yapısı ile Action’lar otomatik olarak oluşturuluyor. Action’lara aşağıdaki şekilde erişebilirsiniz.

```jsx
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
     postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
    },
  })
export const { postAdded} = postSlice.actions;
```

# createAsyncThunk’ın Yapısı

#### Async istekleri yönetmek için standart yöntem createAsyncThunk’ı kullanmaktır.

#### Async isteklerinizi bu fonksiyonla kullandığınızda Promise’in dönüş durumuna bağlı olarak (pending, fulfilled, rejected) bir action çağırır.

#### createAsyncThunk type, payloadCreator ve options olmak üzere üç parametre alır.

#### Örneğin type için "posts/fetchPosts" parametresini kullandığımızda bu fonksiyon bize

```jsx
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return [...response.data];
  } catch (error) {
    return error.message;
  }
});
```

- pending: 'subreddit/fetchBySubreddit/pending'

- fulfilled: 'subreddit/fetchBySubreddit/fulfilled'

- rejected: 'subreddit/fetchBySubreddit/rejected'

- action type’larını oluşturur.

#### Daha sonra bu action’ları extraReducers içerisinde kullanabiliriz:

```jsx
const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and  reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
            eyes: 0,
          };
          return post;
        });
        // add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
```

Redux Toolkit ile örnek bir uygulama
