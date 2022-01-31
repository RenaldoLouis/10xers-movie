import React, { memo, useState, useContext, useEffect } from 'react';

import { DataContext } from "../context/DataContext";
import { css } from "@emotion/css";
import { isEmpty } from "lodash";


//import MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';


function Header() {
    const { moviesData, toastify, setLoading } = useContext(DataContext);
    console.log("moviesData", moviesData[0])
    return (
        <div>
            <Box id="header" className='stickyHeader' sx={{ flexGrow: 1 }}>
                <div>
                    {!isEmpty(moviesData) ?
                        // <Container maxWidth="md" sx={{ mx: 0, px: 0, ml: 0, pl: 0, pr: 0 }} style={{ paddingLeft: "0", paddingRight: "0" }}>
                        //     <img src={moviesData[0].backdrop} alt="moviesBackdrop" width="100%" height="100%" />
                        // </Container>

                        <div style={{ width: "100%", height: "250px" }}>
                            <img src={moviesData[0].backdrop} className='moviesBackdrop' alt="moviesBackdrop" width="100%" height="100%" />
                        </div>

                        :
                        <AppBar color="warning" position="static">
                            <Toolbar>
                                <Typography style={{ cursor: "pointer" }} id="titleheader" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    Movies
                                </Typography>
                                <div
                                    data-tip
                                    data-for="initialTipMobile"
                                    data-letters="RL"
                                    className={css`
                                            &:before {
                                            content: attr(data-letters);
                                            display: inline-block;
                                            font-size: 0.8em;
                                            font-weight: bold;
                                            width: 2.5em;
                                            height: 2.4em;
                                            line-height: 2.2em;
                                            text-align: center;
                                            border-radius: 50%;
                                            border-style: solid;
                                            border-width: thin;
                                            vertical-align: middle;
                                            background: "white;
                                            color:"black";
                                            }
                                        `}
                                    style={{ margin: "auto" }}
                                ></div>
                            </Toolbar>
                        </AppBar>
                    }
                </div>
            </Box>
        </div>
    )
}

export default memo(Header);