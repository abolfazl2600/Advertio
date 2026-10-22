export function createGoogleLogin(deps: {
  native: {signIn(): Promise<{idToken: string}>; clear(): Promise<void>}
  exchange(idToken: string): Promise<{token: string; userId: string}>
  accept(token: string, userId: string): Promise<boolean>; epoch(): number
}): {signIn(): Promise<boolean>; clear(): Promise<void>}
