import * as React from 'react';
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
    TextField,
    Typography,
    Switch,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControlLabel,
    DialogContentText,
    Alert,
    AlertTitle,
    DialogActions,
} from "@mui/material";
import { Link } from 'react-router-dom';
export default function Add() {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const baseURL = `https://636b3e91ad62451f9fac618b.mockapi.io/Material`;
    const formik = useFormik({
        initialValues: {
            title: "",
            // nation: "",
            // club: "",
            views: 1,
            description: "",
            content: "",
            img: "",
            actractive: false,
            status: false,
        },
        
        onSubmit: (values) => {
            fetch(baseURL, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => setOpen(true))
                .catch((error) => console.log(error.message));
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            // nation: Yup.string()
            //     .required("Required.")
            //     .min(2, "Must be 2 characters or more"),
            // club: Yup.string()
            //     .required("Required.")
            //     .min(2, "Must be 2 characters or more"),
            views: Yup.number().integer()
                .required("Required.")
                .typeError("Please type a number."),
            content: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
            description: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
            img: Yup.string()
                .required("Required.")
                .min(10, "Must be 10 characters or more"),
        }),
    });

    return(
        <div className='Add_main'>
            <h1>Add </h1>
        <form onSubmit={formik.handleSubmit} className='Add_content'>
            <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.title}
                onChange={formik.handleChange}
                style={{color:"black"}}
            />
            {formik.errors.title && (
                <Typography variant="caption" color="red">
                    {formik.errors.title}
                </Typography>
            )}
            {/* <TextField
                margin="dense"
                name="club"
                label="Club"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.club}
                onChange={formik.handleChange}
            />
            {formik.errors.club && (
                <Typography variant="caption" color="red">
                    {formik.errors.club}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="nation"
                label="Nation"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.nation}
                onChange={formik.handleChange}
            />
            {formik.errors.nation && (
                <Typography variant="caption" color="red">
                    {formik.errors.nation}
                </Typography>
            )} */}
            <TextField
                margin="dense"
                name="img"
                label="URL of image"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.img}
                onChange={formik.handleChange}
                
            />
            {formik.errors.img && (
                <Typography variant="caption" color="red">
                    {formik.errors.img}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="views"
                label="Views"
                type="number"
                fullWidth
                variant="standard"
                value={formik.values.views}
                onChange={formik.handleChange}
            />
            {formik.errors.views && (
                <Typography variant="caption" color="red">
                    {formik.errors.views}
                </Typography>
            )}
            <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.description}
                onChange={formik.handleChange}
            />
            {formik.errors.description && (
                <Typography variant="caption" color="red">
                    {formik.errors.description}
                </Typography>
            )}
            <TextField
                multiline
                rows={2}
                margin="dense"
                name="content"
                label="Content"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.content}
                onChange={formik.handleChange}
            />
            {formik.errors.content && (
                <Typography variant="caption" color="red" display="block">
                    {formik.errors.content}
                    </Typography>
            )}
            <FormControlLabel
                control={<Switch />}
                label="Actractive"
                name="actractive"
                value={formik.values.actractive}
                onChange={formik.handleChange}
            />


            {formik.errors.content && (
                <Typography variant="caption" color="red" display="block">
                    {formik.errors.content}
                    </Typography>
            )}
            <FormControlLabel
                control={<Switch />}
                label="Status"
                name="status"
                value={formik.values.actractive}
                onChange={formik.handleChange}
            />


            
            <br />
            <Button variant="contained" size="medium" type="submit" className='Add_button'>
                <p className='Add_buttonc'>Add</p>
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
                            <AlertTitle>Adding successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>
                    <Typography textAlign="center">
                        <Link to='/dashboard' style={{textDecoration:"none"}}>Dashboard</Link>
                    </Typography>
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
        </div>
    );
}