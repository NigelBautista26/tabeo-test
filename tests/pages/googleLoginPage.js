import { Selector } from "testcafe"
import user from "./../fixtures/googleUser.json"

class GoogleLoginPage {

    googleEmailField() { return Selector('#identifierId') }
    googleNextButton() { return Selector('#identifierNext') }
    googlePasswordField() { return Selector("[name='password']") }
    googleNextButton2() { return Selector('#passwordNext') }

    async googleLogin(t) {
      await t.typeText(this.googleEmailField(), user.gmail)
      await t.click(this.googleNextButton())
      await t.typeText(this.googlePasswordField(), user.gmailPassword)
      await t.click(this.googleNextButton2())
    }

  }
  export default new GoogleLoginPage()
  