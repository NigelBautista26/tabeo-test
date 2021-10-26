import googleLoginPage from "./pages/googleLoginPage"
import mailinatorPage from './pages/mailinatorPage'
import mainPage from "./pages/mainPage"
import user from "./fixtures/user.json"

fixture('Authentication Tests')
.page("https://qa-challenge-tabeo.vercel.app/")
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
    await t.click(mainPage.signInButton())
  })

//Authentication test scenarios...
test.meta('testID', 'tb-20')("Google sign in", async (t) => {
    await mainPage.googleSignIn(t)
})

test.meta('testID', 'tb-21')("Email sign in", async (t) => {
  await mainPage.emailLogin(t)
})

test.meta('testID', 'tb-22')("Sign out", async (t) => {
  await mainPage.signOut(t)
})