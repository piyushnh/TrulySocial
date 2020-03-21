/**
 * Post state
 *
 * @export
 * @class AuthorizeState
 */
export class AuthorizeState {

    /**
     * Authorized user identifier
     *
     * @type {string}
     * @memberof AuthorizeState
     */
  uid: string = ''

   /**
    * Authorized user identifier
    *
    * @type {string}
    * @memberof AuthorizeState
    */
  tokenId: string = ''

   /**
    * Authorized user identifier
    *
    * @type {string}
    * @memberof AuthorizeState
    */
   phoneNumber: string = ''

    /**
     * If user is authed {true} or not {false}
     *
     * @type {Boolean}
     * @memberof AuthorizeState
     */
  authed: Boolean = false

  /**
   * If user is verifide {true} or not {false}
   *
   * @type {Boolean}
   * @memberof AuthorizeState
   */
  isVerifide: Boolean = false

    /**
     * If user password is updated {true} or not {false}
     *
     * @type {Boolean}
     * @memberof AuthorizeState
     */
  updatePassword: Boolean = false

    /**
     * If the user is guest {true} or not {false}
     *
     * @type {Boolean}
     * @memberof AuthorizeState
     */
  guest: Boolean = false


}
