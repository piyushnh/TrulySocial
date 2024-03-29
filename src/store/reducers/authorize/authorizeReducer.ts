// - Import react components
import { Reducer, Action } from 'redux'

// - Import action types
import { AuthorizeActionType } from 'constants/authorizeActionType'

import { IAuthorizeAction } from './IAuthorizeAction'
import { AuthorizeState } from './AuthorizeState'
import { Map } from 'immutable'

/**
 *  Authorize reducer
 * @param {object} state
 * @param {object} action
 */
export let authorizeReducer = (state = Map(new AuthorizeState() as any), action: IAuthorizeAction) => {
  const { payload } = action
  switch (action.type) {
    case AuthorizeActionType.LOGIN:
    return state
        .set('uid', payload.uid)
        .set('tokenId', payload.tokenId)
        .set('authed', true)
        .set('guest', false)
        .set('isVerifide', payload.isVerifide)
    case AuthorizeActionType.VERIFY_PHONE:
    return state
        .set('phoneNumber', payload.phoneNumber)
      
    case AuthorizeActionType.LOGOUT:
      return state
        .set('uid', '')
        .set('tokenId', '')
        .set('authed', false)
        .set('guest', true)
        .set('phoneNumber', '')
        .set('isVerifide', false)
    case AuthorizeActionType.SIGNUP:
      return state
      .set('uid', payload.userId)
    case AuthorizeActionType.UPDATE_PASSWORD:
      return state
      .set('updatePassword', payload.updatePassword)
    default:
      return state

  }

}
