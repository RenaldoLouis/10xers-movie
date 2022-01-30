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
import GetApi from "../api/GetApi";
import { CommentsDisabledOutlined, ElevatorSharp } from '@mui/icons-material';


function Content() {
    const { moviesData, genresData, toastify, setLoading } = useContext(DataContext);
    const [moviesByGenre, setMoviesByGenre] = useState([]);
    const [favouriteListData, setFavouriteListData] = useState([]);
    const [getStorageFlag, setGetStorageFlag] = useState(true);
    const [deleteMovieFlag, setDeleteMovieFlag] = useState(false);
    const [firstTimeLoad, setFirstTimeLoad] = useState(true);
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

    const getMoviesBasedOnGenreFromApi = async (dataGenre) => {
        const mappedMoviesByGenreData = [];
        const dataMoviesByGenre = await GetApi.getMoviesByGenre(dataGenre.id);
        if (!isEmpty(dataMoviesByGenre.results)) {
            dataMoviesByGenre.results.forEach((data) => {
                const moviesByGenreData = {
                    id: data.id,
                    genreId: data.genre_ids,
                    title: data.title,
                    description: data.overview,
                    backdrop: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
                    poster: "https://image.tmdb.org/t/p/w500" + data.poster_path
                }
                mappedMoviesByGenreData.push(moviesByGenreData);
            });
            setMoviesByGenre(prevState => [...prevState, { genre: dataGenre.genre, data: mappedMoviesByGenreData }])
        }
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    useEffect(() => {
        !isEmpty(genresData) && genresData.forEach((data, index) => {
            getMoviesBasedOnGenreFromApi(data);
        })
    }, [genresData])

    const saveFavourite = (dataStorage, id) => {
        localStorage.setItem("favourite" + id, [dataStorage, id]);
        setGetStorageFlag(!getStorageFlag);
        setAnimationIinput(id);
    }
    const deleteFavourite = (dataStorage, index) => {
        setDeleteMovieFlag(true);
        toastify("success", "Movie Has been Removed From My List")
        let deletedFromList = "";
        for (let i = 0; i < localStorage.length; i++) {
            let number = i;
            let moviesPoster = localStorage.getItem(localStorage.key(number)).split(",");
            if (moviesPoster[0] === dataStorage) {
                deletedFromList = moviesPoster[1];
            }
        };
        localStorage.removeItem("favourite" + deletedFromList, dataStorage);
        setGetStorageFlag(!getStorageFlag);
        setAnimationDelete(index);
    }

    const setAnimationIinput = (id) => {
        document.getElementById(id).classList.remove("animate__zoomIn")
        document.getElementById(id).classList.add("animate__zoomOutUp")

        setTimeout(() => {
            document.getElementById(id).classList.remove("animate__zoomOutUp")
            document.getElementById(id).classList.add("animate__zoomIn")
        }, 1500);
    }
    const setAnimationDelete = (index) => {
        document.getElementById("favouriteCard" + index).classList.remove("animate__bounceIn")
        document.getElementById("favouriteCard" + index).classList.add("animate__zoomOutDown")

        setTimeout(() => {
            document.getElementById("favouriteCard" + index).classList.remove("animate__zoomOutDown")
            document.getElementById("favouriteCard" + index).classList.add("animate__bounceIn")
        }, 1500);
    }

    useEffect(() => {
        if (!isEmpty(localStorage)) {
            for (let i = 0; i < localStorage.length; i++) {
                let number = i;
                let moviesPoster = localStorage.getItem(localStorage.key(number)).split(",");
                if (favouriteListData.includes(moviesPoster[0]) === false) {
                    console.log("masuk1", localStorage.length)
                    if (!firstTimeLoad) {
                        toastify("success", "Movie Has Been Added To My List")
                    } else {
                        setFirstTimeLoad(false);
                    }
                    setFavouriteListData(prevState => [...prevState, moviesPoster[0]])
                }
                else if (deleteMovieFlag) {
                    setFavouriteListData([]);
                    setDeleteMovieFlag(false);
                    setGetStorageFlag(!getStorageFlag);
                }
                else if (favouriteListData.includes(moviesPoster[0]) === true) {
                    setTimeout(() => {
                        toastify("error", "Movie Already In My List")
                    }, 1);
                };
            };
        }
        else if (isEmpty(localStorage)) {
            setTimeout(() => {
                setFavouriteListData([]);
            }, 500);
        }
        ;
    }, [getStorageFlag, localStorage])


    return (
        <div style={{ marginTop: "55px" }}>
            <Grid container spacing={2} sx={{ ml: 0, my: 1, mb: 3 }}>
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
                        {!isEmpty(favouriteListData) ? favouriteListData.map((data, index) => {
                            return (
                                <Card
                                    id={"favouriteCard" + index}
                                    className="card animate__animated animate__bounceIn" //animate__zoomOutDown
                                    key={index}
                                    sx={{ maxWidth: 345, marginY: "10px" }}>
                                    <CardMedia
                                        component="img"
                                        alt={index}
                                        height="140"
                                        image={data}
                                        onClick={() => deleteFavourite(data, index)}
                                    />
                                </Card>
                            )
                        }) :
                            <div>
                                <b>Nothing here! Scroll to discover more </b>
                            </div>}
                    </Carousel>
                </Grid>

                {!isEmpty(moviesByGenre) ? moviesByGenre.map((data, index) => {
                    return (
                        <Grid item key={index} xs={12} md={12}>
                            <div>{data.genre}</div>
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
                                {data.data.map((insideData, index) => {
                                    return (
                                        <Card
                                            id={insideData.id}
                                            className="card animate__animated animate__zoomIn" // animate__zoomOutUp
                                            key={index}
                                            sx={{ maxWidth: 345, marginY: "10px" }}>
                                            <CardMedia
                                                component="img"
                                                alt={insideData.title}
                                                height="140"
                                                image={insideData.backdrop}
                                                onClick={() => saveFavourite(insideData.backdrop, insideData.id)}
                                            />
                                        </Card>
                                    )
                                })}
                            </Carousel>
                        </Grid>
                    )
                }
                ) : <Grid item xs={12} md={12}>
                    <b>No Data</b>
                </Grid>}
            </Grid>
        </div>
    )
}

export default Content;