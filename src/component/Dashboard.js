import { Button, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from 'react-materialize'; 
import Notification from "./Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    TextField,
    Switch,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    DialogContentText,
    Alert,
    AlertTitle,
    DialogActions,
} from "@mui/material";
import { setDefaultEventParameters } from "firebase/analytics";

export default function Dashboard() {

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const baseURL = `https://636b3e91ad62451f9fac618b.mockapi.io/Material`;
    const formik = useFormik({
        initialValues: {
            title: "",
            nation: "",
            club: "",
            views: 0,
            description: "",
            content: "",
            img: "",
            famous: false,
        },

        onSubmit: (values) => {
            setOpen(true)
        }
    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    const [APIData, setAPIData] = useState([]);
    const[title, settitle] = useState("");
    const[nation, setNation] = useState("");
    const[club, setClub] = useState("");
    const[views, setviews] = useState("");
    const[content, setcontent] = useState("");
    const[description, setdescription] = useState("");
    const[img, setImg] = useState("");
    const[famous, setFamous] = useState(false);
    const [userId,setUserId]=useState(null)
    // const baseUrl=`https://635a851b38725a1746c8a79a.mockapi.io/Players`
    const baseUrl = `https://636b3e91ad62451f9fac618b.mockapi.io/Material`
    const [buttonPopup, setButtonPopup] = useState(false);

    // function getUsers(){
    //    fetch(baseUrl)
    //    .then(response => {
       
    //    if (response.ok) {return response;}
    //    else {var error = new Error('Error ' + response.status + ': ' + response.statusText);  error.response = response;
    //    throw error;}
    //    },
    //     error => {var errmess = new Error(error.message);  throw errmess;
    //    })
    //   .then(response => response.json())
    //   .then(data => setAPIData(data))
    //   .catch(error => console.log(error.message));
    // }
    function getUsers(){
        fetch(baseUrl).then((result) =>{
            result.json().then((resp)=>{
                setAPIData(resp)
                settitle(resp[0].title)
                setNation(resp[0].nation)
                setClub(resp[0].club)
                setviews(resp[0].views)
                setcontent(resp[0].content)
                setdescription(resp[0].description)
                setImg(resp[0].img)
                setFamous(resp[0].famous)
                setUserId(resp[0].id)
            })
        })
    }
    useEffect(()=>{
      getUsers();
    },[])

    function deleteUser(id){
        fetch(`https://636b3e91ad62451f9fac618b.mockapi.io/Material/${id}`,{
            method:'DELETE'
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getUsers()
            })
        })
    }
    
    function selectUser(id){
        console.warn("function called", APIData[id-1])
        let item= APIData[id-1]
        settitle(item.title)
        setNation(item.nation)
        setClub(item.club)
        setviews(item.views)
        setcontent(item.content)
        setdescription(item.description)
        setImg(item.img)
        setFamous(item.famous)
        setUserId(item.id)
    }
    function updateUser(){
        let item={title, nation, club, views, content, description, img, famous}
        console.warn("item", item)
        fetch(`https://636b3e91ad62451f9fac618b.mockapi.io/Material/${userId}`,{
            method:'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify(item)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.warn(resp)
                getUsers()
            })
        })
    }

    function buttonpop(){
        setButtonPopup(true)
    }
    function buttonclose(){
        setButtonPopup(false)
    }

    
    return(
        <div classtitle="Dashboard_main">
            <div classtitle="add_post">
            <div classtitle="addc">
            <h1>Dashboard </h1>
            </div>
            <Typography classtitle="Dashboard_add">
                <Link to='/add' style={{textDecoration:"none"}} classtitle="Dashboard_adda">
                <Icon>add_circle_outline</Icon> Add data
                </Link>
            </Typography>
            
            </div>
            <div classtitle="head_tab">
                <table>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>title</th>
                       
                      
                        <th>Img</th>
                        <th>Description</th>
                        {/* <th>Famous</th>
                        <th>Nation</th> */}
                        <th>Content</th>
                        <th>Views</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {APIData.map((data)=>(
                        <tr>
                            <td>{data.id}</td>
                            <td>{data.title}</td>
                            
                            
                            <td><img src={data.img} /></td>
                            <td>{data.description}</td>
                            {/* <td>{String(data.famous)}</td>
                            <td>{data.nation}</td> */}
                            <td>{data.content}</td>  
                            <td>{data.views}</td>
                            <td>
                            <button onClick={
                                function buttona(){
                                    selectUser(data.id);
                                    buttonpop();
                                }
                            }
                            style={{marginBottom:'10px'}}
                            >
                                <Icon left >edit</Icon>
                            </button>

                            <button onClick={() =>deleteUser(data.id)}>
                                <Icon left >remove</Icon>
                            </button>    
                            </td>  
                        </tr>
                    ))}
                    </tbody>
                </table>






{/*------------------------------------------------------------------------- PopUp Zone ---------------------------------------------------------------------*/}
            <Notification trigger={buttonPopup} setTrigger={setButtonPopup}>
            <div>
            <div classtitle='Add_content'>
            <form onSubmit={formik.handleSubmit} classtitle='Add_content'>
            <TextField
                autoFocus
                margin="dense"
                title="title"
                label="title"
                type="text"
                fullWidth
                variant="standard"
                value={title}
                onChange={(e) => {settitle(e.target.value)}}
            />
           
            <TextField
                margin="dense"
                title="img"
                label="URL of image"
                type="text"
                fullWidth
                variant="standard"
                value={img}
                onChange={(e) => {setImg(e.target.value)}}
            />
            
            <TextField
                margin="dense"
                title="views"
                label="Views"
                type="number"
                fullWidth
                variant="standard"
                value={views}
                onChange={(e) => {setviews(e.target.value)}}
            />
            
            <TextField
                margin="dense"
                title="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={description}
                onChange={(e) => {setdescription(e.target.value)}}
            />
            
            <TextField
                multiline
                rows={2}
                margin="dense"
                title="content"
                label="Content"
                type="text"
                fullWidth
                variant="standard"
                value={content}
                onChange={(e) => {setcontent(e.target.value)}}
            />
            <FormControlLabel
                control={<Switch />}
                label="Status"
                title="Status"
                value={famous}
                onChange={(e) => {setFamous(e.target.value)}}
            />
            <FormControlLabel
                control={<Switch />}
                label="Actractive"
                title="Actractive"
                value={famous}
                onChange={(e) => {setFamous(e.target.value)}}
            />
            <br />
            <Button variant="contained" size="medium"  classtitle='Add_button' type="submit"
            onClick={updateUser}
            >
                <p classtitle='Add_buttonc'>Edit</p>
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Edit successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={
                            function buttonb(){
                                handleClose();
                                buttonclose();
                            }
                        }>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            </form>
        </div>
        </div> 
                </Notification>
            </div>
        </div>
    )
}