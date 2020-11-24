import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {value:'',open:false,message:''}
    this.access = this.access.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  access() {
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("pablo-access", "Client ID");

    var raw = JSON.stringify({"mail":this.state.value});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };
    fetch("https://class-access.mybluemix.net/access", requestOptions)
      .then(response => response.json())
      .then((result) => {
        this.setState({message:result['result'],open:true})
      })
      .catch((error) => {
        this.setState({message:error,open:true})
      })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  render(){
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
      <Dialog
        open={this.state.open}
        onClose={()=>this.setState({open:false})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Registration class'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.state.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.setState({open:false})} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Assistance
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={this.state.value} 
            onChange={this.handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.access}
          >
            Pass assistance
          </Button>
        </form>
      </div>
      <Box mt={8}>
        {/*<Copyright />*/}
      </Box>
    </Container>
  );
  }
}

export default App;