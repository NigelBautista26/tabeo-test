import mainPage from "./pages/mainPage"

fixture('Authentication Tests')
.page("https://qa-challenge-tabeo.vercel.app/")
.beforeEach(async (t) => {
    await t.setNativeDialogHandler(() => true)
    await t.maximizeWindow()
    await t.click(mainPage.signInButton())
  })

//Authentication test scenarios...
test.meta('testID', 'tb-21')("Google sign in and sign out", async (t) => {
  await mainPage.signOutGoogleAccount(t)
})

test.meta('testID', 'tb-22')("Email sign in and sign out", async (t) => {
  await mainPage.signOutEmailAccount(t)
})