import { User } from 'core/domain/users'
import { LoginUser, RegisterUserResult, OAuthType } from 'core/domain/authorize'

/**
 * Authentication service interface
 *
 * @export
 * @interface IAuthorizeService
 */
export interface IAuthorizeService {
    /**
     * On entering phone number, user gets OTP
     *
     * @memberof IAuthorizeService
     */
    getVerificationCode: (phoneNumber: string, recaptchaVerifier: any) => void

    /**
     * On entering phone number, user gets OTP
     *
     * @memberof IAuthorizeService
     */
    generateCredential: (verificationId: any, verificationCode: string) => void

    /**
     * On entering phone number, user gets OTP
     *
     * @memberof IAuthorizeService
     */
    loadRecaptcha: () => void


    /**
     * Login the user
     *
     * @returns {Promise<void>}
     * @memberof IAuthorizeService
     */
  login: (email: string, password: string) => Promise<LoginUser>

   /**
    * Logs out the user
    *
    * @returns {Promise<void>}
    * @memberof IAuthorizeService
    */
  logout: () => Promise<void>

    /**
     * @returns {Promise<void>}
     */
  updatePassword: (newPassword: string) => Promise<void>

    /**
     * @returns {Promise<void>}
     */
  registerUser: (user: User) => Promise<RegisterUserResult>

  /**
   * On user authorization changed event
   *
   * @memberof IAuthorizeService
   */
  onAuthStateChanged: (callBack: (isVerifide: boolean, user: LoginUser) => void) => void

 
  /**
   * Reset user password
   *
   * @memberof IAuthorizeService
   */
  resetPassword: (email: string) => Promise<void>

  /**
   * Send email verification
   *
   * @memberof IAuthorizeService
   */
  sendEmailVerification: () => Promise<void>

  /**
   * Login user by OAuth authentication
   *
   * @memberof IAuthorizeService
   */
  loginWithOAuth: (type: OAuthType) => Promise<LoginUser>
}
