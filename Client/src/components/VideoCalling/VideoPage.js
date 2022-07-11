import React,{useState,useEffect} from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notification';
import Header from '../headers/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor:"lightgrey"
  },
}));

const VideoPage = () => {
  const [docEmail, setdocEmail] = useState("")
  const params = useParams()
  const id = params.id
  const classes = useStyles();
  const loadDoct = async(id) =>{
    const uri = `http://localhost:5000/patients/getPatient/${id}`
    const res = await axios.get(uri)
    setdocEmail(res.data.data.email)
    console.log(res.data.data.email)
  }
  useEffect(() => {
    loadDoct(id)
  }, [id])
  
  return (
    <>
    <Header />
    <div className={classes.wrapper}>
     
      
      <VideoPlayer />
      <Sidebar email={docEmail} >
        <Notifications />
      </Sidebar>
    </div>
    </>
  );
};

export default VideoPage;