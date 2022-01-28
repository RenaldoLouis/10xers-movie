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
    // console.log("moviesData", moviesData);
    return (
        <div >
            <Container sx={{ mx: 0, my: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <div>My favourite List</div>
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
            </Container>
        </div>
    )
}

export default Content;