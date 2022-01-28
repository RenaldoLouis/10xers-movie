import React, { memo, useState, useContext, useEffect } from 'react';

import { DataContext } from "../context/DataContext";
import { css } from "@emotion/css";


//import MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {

    return (
        <div>
            <Box id="navbar" sx={{ flexGrow: 1 }}>
                <AppBar color="warning" position="static">
                    <Toolbar>
                        <Typography style={{ cursor: "pointer" }} id="titleNavbar" variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            </Box>
        </div>
    )
}

export default memo(Header);