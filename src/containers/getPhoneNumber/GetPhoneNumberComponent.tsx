// - Import external components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'
import Paper from '@material-ui/core/Paper'
import RaisedButton from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import ActionAndroid from '@material-ui/icons/Android'
import { withStyles } from '@material-ui/core/styles'
import config from 'src/config'
import { localize } from 'react-localize-redux'
import Button from '@material-ui/core/Button' 
import TextField from '@material-ui/core/TextField' 
import Dialog from '@material-ui/core/Dialog' 
import DialogActions from '@material-ui/core/DialogActions' 
import DialogContent from '@material-ui/core/DialogContent' 
import DialogContentText from '@material-ui/core/DialogContentText' 
import DialogTitle from '@material-ui/core/DialogTitle' 
import InputAdornment from '@material-ui/core/InputAdornment' 
import ExpansionPanel from '@material-ui/core/ExpansionPanel' 
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails' 

// - Import actions
import * as authorizeActions from 'src/store/actions/authorizeActions'
import  IGetPhoneComponentProps from './IGetPhoneComponentProps'
// import { IGetPhoneComponentState } from './IGetPhoneComponentState'
import { OAuthType } from 'src/core/domain/authorize'
import Grid from '@material-ui/core/Grid/Grid'
import CommonAPI from 'api/CommonAPI'

const styles = (theme: any) => ({
  textField: {
    minWidth: 280,
    marginTop: 20
  },
  contain: {
    margin: '0 auto'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  bottomPaper: {
    display: 'inherit',
    fontSize: 'small',
    marginTop: '50px'
  },
  link: {
    color: '#0095ff',
    display: 'inline-block'
  }
})

// - Create Login component class
export class GetPhoneNumberComponent extends Component<IGetPhoneComponentProps, any> {


  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IGetPhoneComponentProps) {
    super(props)

    this.state = {
      inputPhoneNumber: '',
      phoneInputError: '',
      OTPInputError: '',
      verificationCode: '',
      verificationId: null,
      recaptcha: null
      
    }

    // Binding function to `this`
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleOTPChange = this.handleOTPChange.bind(this)
    // this.recaptcha = null

  }

  componentWillMount()
  {
    this.setState({
      recaptcha: this.props.loadRecaptcha()
    })
    
  }

  handlePhoneChange(event: any) {
    this.setState({
      inputPhoneNumber: event.target.value
    })
  }

  handleOTPChange(event: any) {
    this.setState({
      inputOTP: event.target.value
    })
  }
  
  

  /**
   * Handle register form
   */
  handleSubmit() {
    if (!this.state.verificationId && this.state.verificationCode == '') {
        let error = false
        if (this.state.inputPhoneNumber.toString() === '') {
          this.setState({
            phoneInputError: 'Please enter 10 Digit phone number'
          })
          error = true
        } 
        // if (this.state.inputPhoneNumber.toString().length != 10) {
        //     this.setState({
        //       phoneInputError: 'Phone number should have 10 digits'
        //     })
        //     error = true
        //   }    
    
        if (!error)
        {
            // let recaptcha = this.props.loadRecaptcha
            this.setState({
                verificationId: this.props.getVerificationCode(this.state.inputPhoneNumber, this.state.recaptcha)
              })
            
        }
    }
    else {
      let temp = this.props.getCredential(this.state.verificationId, this.state.verificationCode)
    }
    
    

  }

  // componentDidUpdate()
  // {
  //   console.log('verifcation codeeeeeeeeee')
  //   console.log(this.state.verificationCode)
  // }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    // const { classes, loginWithOAuth, translate } = this.props


    return (
        <div>
      
        <Dialog open={this.props.phoneNumber == '' && this.props.isAuthed} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Verify Phone Number</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your 10 digit phone number. We shall be sending you an OTP to verify.
            </DialogContentText>
            <TextField
                // className={classes.margin}
                id="phone-number"
                type="string"
                onChange={this.handlePhoneChange}
                value={this.state.inputPhoneNumber}
                label="Phone Number"
                helperText={this.state.phoneInputError}
                // error={this.state.phoneInputError.toString().trim() != ''}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {'+91'}
                    </InputAdornment>
                ),
                }}
            />
          </DialogContent>
            <ExpansionPanel expanded={this.state.verificationCode != ''}>
                
              <ExpansionPanelDetails>
                    <TextField
                        // className={classes.margin}
                        id="otp-input"
                        type="string"
                        onChange={this.handleOTPChange}
                        value={this.state.inputOTP}
                        label="OTP"
                        helperText={this.state.OTPInputError}
                        // error={this.state.phoneInputError.toString().trim() != ''}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                {'OTP'}
                            </InputAdornment>
                        ),
                        }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          <div id='recaptcha-container'></div> 
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
            {this.state.verificationCode ? 'Verify' : 'Generate OTP'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: any) => {
  return {
    getVerificationCode: (phoneNumber: string, recaptchaVerifier: any) => {
      return dispatch(authorizeActions.dbGetVerificationCode(phoneNumber, recaptchaVerifier))
    },
    storePhoneNumber: (phoneNumber: string) => {
        return dispatch(authorizeActions.storePhoneNumber(phoneNumber))
    },
    loadRecaptcha: () => {
      return dispatch(authorizeActions.loadRecaptcha())
    },
    getCredential: (verificationId: any, verificationCode: string) => {
      return dispatch(authorizeActions.dbGetCredential(verificationId, verificationCode))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any) => {
  return {
    phoneNumber: state.getIn(['authorize', 'phoneNumber'], ''),
    isAuthed: state.getIn(['authorize', 'authed'], false),
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(GetPhoneNumberComponent))) 
