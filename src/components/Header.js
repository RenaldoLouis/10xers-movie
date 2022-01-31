import React, { memo, useState, useContext, useEffect } from 'react';

import { DataContext } from "../context/DataContext";
import { css } from "@emotion/css";
import { isEmpty } from "lodash";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


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
    const responsive = {
        anyScreenSize: {
            breakpoint: { max: 4000, min: 0 },
            items: 1
        },
    };
    return (
        <div>
            <Box id="header" className='stickyHeader' sx={{ flexGrow: 1 }}>
                <div>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        transitionDuration={1000}
                        containerClass="carousel-container carousel-heigth"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        removeArrowOnDeviceType={["anyScreenSize"]}
                    >
                        {!isEmpty(moviesData) ?
                            moviesData.map((data, index) => {
                                return (
                                    <section key={index} style={{ width: "100%", height: "250px", backgroundImage: " url(" + data.backdrop + ")", backgroundSize: "cover", backgroundPosition: "50% 30%" }}>
                                        <div style={{ background: "linear-gradient(to right, #111 30%, transparent 70%)", width: "inherit", height: "inherit" }}></div>
                                        <div className="top-left" style={{ paddingTop: "10px" }}>{data.title}</div>
                                    </section>
                                )
                            })
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
                    </Carousel>
                </div>
            </Box>
        </div>
    )
}

export default memo(Header);