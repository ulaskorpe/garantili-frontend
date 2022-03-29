import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTemps} from "../selectors/temp";
import {deleteTemp, setTemp} from "../actions/temp";

const useTemp = () => {
    const temps = useSelector(getTemps);
    const dispatch = useDispatch();

    const getTempFC = useCallback((key) => {
        let value = undefined;
        if (
            key
            && typeof temps[key] !== 'undefined'
            && temps[key]
        ) value = temps[key];

        return value;
    }, [temps]);

    const setTempFC = useCallback((
        key,
        value,
    ) => {
        dispatch(setTemp({
            key,
            value,
        }))
    }, [dispatch]);

    const deleteTempFC = useCallback((key) => {
        dispatch(deleteTemp(key))
    }, [dispatch])

    return {
        temps,

        getTemp: getTempFC,
        setTemp: setTempFC,
        deleteTemp: deleteTempFC,
    };
};

export default useTemp;
