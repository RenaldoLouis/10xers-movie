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
        const dataMovies = await GetApi.getAllMovies();
        setMoviesData(dataMovies);
    }
    const getGenresFromApi = async () => {
        const mappedGenreData = [];
        const dataGenre = await GetApi.getAllGenres();
        dataGenre.genres.forEach((data) => {
            const genreData = {
                genre: data.name
            }
            mappedGenreData.push(genreData);
        });
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
