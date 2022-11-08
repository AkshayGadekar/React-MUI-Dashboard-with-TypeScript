export type User = Record<string, any>
export interface UserSlice {
  isLoggedIn: boolean|null,
  user: User
}
