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
    await t.click(mainPage.signInWithGoogleButton())
    await googleLoginPage.googleLogin(t)
    await t.expect(mainPage.accountName().textContent).contains(user.fullName)
})

test.meta('testID', 'tb-21')("Email sign in", async (t) => {
  await mainPage.emailLogin(t)
  await t.navigateTo(mailinatorPage.mailinatorPage())
  await t.click(mailinatorPage.recievedEmail())
  await t.switchToIframe(mailinatorPage.iframe())
  await t.click(mailinatorPage.magicLink()).maximizeWindow()
})

test.meta('testID', 'tb-22')("Sign out", async (t) => {
  await t.click(mainPage.signInWithGoogleButton())
  await googleLoginPage.googleLogin(t)
  await t.expect(mainPage.accountName().textContent).contains(user.fullName)
  await t.click(mainPage.loggedInAccountButton())
  await t.click(mainPage.signOutButton())
  await t.expect(mainPage.signInButton().visible).ok()
})