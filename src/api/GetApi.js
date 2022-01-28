import api from "./HttpInit";

const baseApi = process.env.REACT_APP_BASE_API;
const getAllMovies = async () => {
    try {
        const res = await api.get(`${baseApi}movie/popular?api_key=9be5962f75cabd26c04eb4443674e0d2&language=en-US&page=1`)
        if (res.status === 200) {
            const data = res.data
            return data;
        } else {
            return null
        }
    } catch (e) {
        return { error: e.message }
    }
};

const getAllGenres = async () => {
    try {
        const res = await api.get(`${baseApi}genre/movie/list?api_key=9be5962f75cabd26c04eb4443674e0d2&language=en-US`)
        if (res.status === 200) {
            const data = res.data
            return data;
        } else {
            return null
        }
    } catch (e) {
        return { error: e.message }
    }
};

const exportedObject = {
    getAllMovies,
    getAllGenres
};

export default exportedObject;