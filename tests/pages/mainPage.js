import { Selector, t } from 'testcafe'
import user from "./../fixtures/user.json"

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

    async emailLogin(t) {
      await t.typeText(this.emailField(), user.email)
      await t.click(this.signInWithEmailButton()).wait(7000) // this wait is to give mailinator the time to recieve the email with the magic link...
    }

  }
  export default new MainPage()
  