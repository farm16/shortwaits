import { store } from "."

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type ThemeState = {
  theme: "default" | null | undefined
  darkMode: boolean | null | undefined
}

export type ThemePayload = {
  payload: {
    theme: "default" | null | undefined
    darkMode: boolean | null | undefined
  }
}

export type AuthState = {
  token: string | null
}

export type AuthRequestLoginPayload = {
  payload: {
    username?: string | null
    email: string | null
    password: string | null
  }
}
