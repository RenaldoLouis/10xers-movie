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
    const [isLoading, setLoading] = useState(true);
    const [toastPopup, setToastPopup] = useState({});
    const [moviesData, setMoviesData] = useState({});
    const [genresData, setGenresData] = useState({});

    const toastify = (type, text) => {
        if (type === "success") {
            toast.success(text);
        } else if (type === "error") {
            toast.error(text);
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
                    id: data.id,
                    genre: data.name
                }
                mappedGenreData.push(genreData);
            });
        }
        setGenresData(mappedGenreData);
    }

    useEffect(() => {
        getMoviesFromApi();
        getGenresFromApi();
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
