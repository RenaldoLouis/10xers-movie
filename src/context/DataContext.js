import { isMuiElement } from "@mui/material";
import { isEmpty } from "lodash";
import React, {
    useState,
    createContext,
    useEffect,
    useContext,
    useCallback,
} from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import GetApi from "../api/GetApi"

export const DataContext = createContext({});

export const DataContextProvider = (props) => {
    const [cookie, setCookie] = useCookies(["token", "filter", "filterOverview"]);
    const [isLoading, setLoading] = useState(false);
    const [toastPopup, setToastPopup] = useState({});
    const [selectedDetailData, setSelectedDetailData] = useState({})
    const [moviesData, setMoviesData] = useState({})
    const [genresData, setGenresData] = useState({})

    const toastify = (type, text) => {
        if (type === "success") {
            toast.success(text, {
                toastId: "success"
            });
        } else if (type === "error") {
            toast.error(text, {
                toastId: "error"
            });
        }
        setToastPopup(!toastPopup);
    }

    const getMoviesFromApi = async () => {
        const mappedMoviesData = [];
        const dataMovies = await GetApi.getAllMovies();
        if (!isEmpty(dataMovies)) {
            dataMovies.results.forEach((data) => {
                const moviesData = {
                    title: data.title,
                    description: data.overview,
                    backdrop: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
                    poster: "https://image.tmdb.org/t/p/w500" + data.poster_path
                }
                mappedMoviesData.push(moviesData);
            })
            setMoviesData(mappedMoviesData);
        }
    }

    const getGenresFromApi = async () => {
        const mappedGenreData = [];
        const dataGenre = await GetApi.getAllGenres();
        if (!isEmpty(dataGenre)) {
            dataGenre.genres.forEach((data) => {
                const genreData = {
                    genre: data.name
                }
                mappedGenreData.push(genreData);
            });
        }
        setGenresData(mappedGenreData);
    }

    const getMoviesBasedOnGenreFromApi = async () => {
        const mappedMoviesByGenreData = [];
        const dataMoviesByGenre = await GetApi.getMoviesByGenre();
        if (!isEmpty(dataMoviesByGenre)) {
            dataMoviesByGenre.results.forEach((data) => {
                const moviesData = {
                    title: data.title,
                    description: data.overview,
                    backdrop: "https://image.tmdb.org/t/p/w500" + data.backdrop_path,
                    poster: "https://image.tmdb.org/t/p/w500" + data.poster_path
                }
                mappedMoviesByGenreData.push(moviesData);
            })
            setMoviesData(mappedMoviesByGenreData);
        }
    }

    useEffect(() => {
        getMoviesFromApi();
        getGenresFromApi();
        getMoviesBasedOnGenreFromApi();
    }, [])

    const DataContextValue = {
        isLoading,
        setLoading,
        toastify,
        toastPopup,
        moviesData,
        genresData
    };

    return (
        <DataContext.Provider value={DataContextValue}>
            {props.children}
        </DataContext.Provider>
    );
};
