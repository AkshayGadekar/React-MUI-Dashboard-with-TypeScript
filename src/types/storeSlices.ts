export type User = Record<string, any>
export interface UserSlice {
  isLoggedIn: boolean|null,
  loading: boolean
  user: User
  error: string
}