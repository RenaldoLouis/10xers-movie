import React, { memo, useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { DataContext } from "../context/DataContext";
import { isEmpty } from "lodash";


function Content() {
    const { moviesData, genresData } = useContext(DataContext);
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 2100 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 2100, min: 1800 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1800, min: 1441 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 1441, min: 1065 },
            items: 3
        },
        mobileSmall: {
            breakpoint: { max: 1065, min: 725 },
            items: 2
        },
        mobileExtraSmall: {
            breakpoint: { max: 725, min: 0 },
            items: 1
        }
    };
    return (
        <div >
            {/* <Container sx={{ mx: 0, my: 2 }}> */}
            <Grid container spacing={2} sx={{ ml: 0 }}>
                <Grid item xs={12} md={12}>
                    <div>My favourite List</div>
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
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                    >
                        {!isEmpty(moviesData) ? moviesData.map((data, index) => {
                            return (
                                <Card className="card" key={index} sx={{ maxWidth: 345, marginY: "10px" }}>
                                    <CardMedia
                                        component="img"
                                        alt={data.title}
                                        height="140"
                                        image={data.backdrop}
                                    />
                                </Card>
                            )
                        }) :
                            <div>
                                Emtpy data
                            </div>}
                    </Carousel>
                </Grid>
                {!isEmpty(genresData) ? genresData.map((data, index) => {
                    return (
                        <Grid item key={index} xs={12} md={12}>
                            <div>{data.genre}</div>
                        </Grid>
                    )
                }
                ) : null}
            </Grid>
            {/* </Container> */}
        </div>
    )
}

export default Content;