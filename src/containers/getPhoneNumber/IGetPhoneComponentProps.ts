export default interface IGetPhoneComponentComponentProps {

  /**
   * Verify Phone Number
   *
   * @memberof IGetPhoneComponentComponentProps
   */
  getVerificationCode: (phoneNumber: string, recaptchaVerifier: any) => any

  /**
   * Store Phone Number in redux store
   *
   * @memberof IGetPhoneComponentComponentProps
   */
  storePhoneNumber: (phoneNumber: string) => any

  /**
   * Store Phone Number in redux store
   *
   * @memberof IGetPhoneComponentComponentProps
   */
  getCredential: (verificationId: any, verificationCode: string) => any

   /**
    * Store Phone Number in redux store
    *
    * @memberof IGetPhoneComponentComponentProps
    */
  loadRecaptcha: () => any

  /**
   * Phone Number
   *
   * @memberof IGetPhoneComponentComponentProps
   */
  phoneNumber: string


  /**
   * Phone Number
   *
   * @memberof IGetPhoneComponentComponentProps
   */
  isAuthed: boolean

 
}
