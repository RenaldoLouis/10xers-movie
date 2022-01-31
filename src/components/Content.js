import React, { useState, useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { DataContext } from "../context/DataContext";
import { isEmpty } from "lodash";
import GetApi from "../api/GetApi";
import DeleteIcon from '@mui/icons-material/Delete';


function Content() {
    const { genresData, toastify, setLoading } = useContext(DataContext);
    const [moviesByGenre, setMoviesByGenre] = useState([]);
    const [favouriteListData, setFavouriteListData] = useState([]);
    const [getStorageFlag, setGetStorageFlag] = useState(true);
    const [deleteMovieFlag, setDeleteMovieFlag] = useState(false);
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
        }, 8000);
    }

    const saveFavourite = (dataStorage, id, genre) => {
        localStorage.setItem("favourite" + id, [dataStorage, id]);
        if (!isEmpty(localStorage)) {
            for (let i = 0; i < localStorage.length; i++) {
                let number = i;
                let moviesPoster = localStorage.getItem(localStorage.key(number)).split(",");
                if (favouriteListData.includes(moviesPoster[0]) === false) {
                    toastify("success", "Movie Has Been Added To My List");
                }
            };
        }
        setTimeout(() => {
            setGetStorageFlag(!getStorageFlag);
        }, 500);
        setAnimationIinput(id, genre);

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

    const setAnimationIinput = (id, genre) => {
        document.getElementById(id + genre).classList.remove("animate__zoomIn")
        document.getElementById(id + genre).classList.add("animate__zoomOutUp")

        setTimeout(() => {
            document.getElementById(id + genre).classList.remove("animate__zoomOutUp")
            document.getElementById(id + genre).classList.add("animate__zoomIn")
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

    const displayDeleteIcon = (status, index) => {
        if (status === "hov") {
            setTimeout(() => {
                document.getElementById("deleteIcon" + index).style.display = ""
            }, 1);

        } else {
            setTimeout(() => {
                document.getElementById("deleteIcon" + index).style.display = "none"
            }, 1);

        }
    }

    useEffect(() => {
        !isEmpty(genresData) && genresData.forEach((data, index) => {
            getMoviesBasedOnGenreFromApi(data);
        })
    }, [genresData])

    useEffect(() => {
        if (!isEmpty(localStorage)) {
            for (let i = 0; i < localStorage.length; i++) {
                let number = i;
                let moviesPoster = localStorage.getItem(localStorage.key(number)).split(",");
                if (favouriteListData.includes(moviesPoster[0]) === false) {
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
        };
    }, [getStorageFlag])

    return (
        <div style={{ paddingTop: "255px" }}>
            <Grid container spacing={2} sx={{ ml: 0, my: 1, mb: 3 }}>
                <Grid item xs={12} md={12}>
                    <div style={{ color: "white" }}>My favourite List</div>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        customTransition="transform 500ms ease-in-out"
                        transitionDuration={1000}
                        containerClass="carousel-container carousel-heigth"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        removeArrowOnDeviceType={[]}
                    >
                        {!isEmpty(favouriteListData) ? favouriteListData.map((data, index) => {
                            return (
                                <Card
                                    id={"favouriteCard" + index}
                                    className="card animate__animated animate__bounceIn" //animate__zoomOutDown
                                    key={index}
                                    sx={{ maxWidth: 345, marginY: "10px" }}
                                    style={{ background: "white" }}
                                >

                                    <CardMedia
                                        component="img"
                                        alt={index}
                                        height="140"
                                        image={data}
                                        onClick={() => deleteFavourite(data, index)}
                                        onMouseOver={() => displayDeleteIcon("hov", index)}
                                        onMouseOut={() => displayDeleteIcon("rev", index)}
                                    />
                                    <DeleteIcon id={"deleteIcon" + index} style={{ display: "none", color: "black" }}></DeleteIcon>
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
                        <Grid item key={index} xs={12} md={12} sx={{ my: 2 }}>
                            <div style={{ color: "white" }}>{data.genre}</div>
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
                                removeArrowOnDeviceType={[]}
                            >
                                {data.data.map((insideData, index) => {
                                    return (
                                        <Card
                                            id={insideData.id + data.genre}
                                            className="card animate__animated animate__zoomIn" // animate__zoomOutUp
                                            key={index}
                                            sx={{ maxWidth: 345, marginY: "20px" }}>
                                            <CardMedia
                                                component="img"
                                                alt={insideData.title}
                                                height="140"
                                                image={insideData.backdrop}
                                                onClick={() => saveFavourite(insideData.backdrop, insideData.id, data.genre)}
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
        </div >
    )
}

export default Content;