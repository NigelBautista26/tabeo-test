import { Selector, t } from 'testcafe'
import user from "./../fixtures/user.json"
import mailinatorPage from './mailinatorPage'
import googleLoginPage from './googleLoginPage'
import mainPage from './mainPage'
class MainPage {

    signInButton() { return Selector('.justify-between > .text-sm') }
    signInWithGoogleButton() { return Selector('.mt-6 > .w-full') }
    emailField() { return Selector('#email') }
    signInWithEmailButton() { return Selector('button').withText('Sign in with email') }
    accountName() { return Selector('span').withText(user.fullName) }
    subscriptionButton() { return Selector('button').withText('Pay £20/mo') }
    singlePayButton() { return Selector('button').withText('Pay £220') }
    loggedInAccountButton() { return Selector('.bg-gray-200') }
    signOutButton() { return Selector('.origin-top-right > .block') }

    async googleSignIn(t) {
      await t.click(mainPage.signInWithGoogleButton())
      await googleLoginPage.googleLogin(t)
      await t.expect(mainPage.accountName().textContent).contains(user.fullName)
    }

    async emailSignIn(t) {
      await t.typeText(this.emailField(), user.email)
      await t.click(this.signInWithEmailButton()).wait(7000) // this wait is to give mailinator the time to recieve the email with the magic link...
      await t.navigateTo(mailinatorPage.mailinatorPage())
      await t.click(mailinatorPage.recievedEmail())
      await t.switchToIframe(mailinatorPage.iframe())
      await t.click(mailinatorPage.magicLink()).maximizeWindow()
    }

    async signOutGoogleAccount(t) {
      await this.googleSignIn(t)
      await t.click(mainPage.loggedInAccountButton())
      await t.click(mainPage.signOutButton())
      await t.expect(mainPage.signInButton().visible).ok()
    }

    async signOutEmailAccount(t) {
      await this.emailSignIn(t)
      await t.click(mainPage.loggedInAccountButton())
      await t.click(mainPage.signOutButton())
      await t.expect(mainPage.signInButton().visible).ok()
    }

  }
  export default new MainPage()
  