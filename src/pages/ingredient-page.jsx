import React, {useEffect} from "react";
import {getIngredients} from "../services/actions/ingredients";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/elements/loader";
import FetchError from "../components/elements/fetch-error";
import {useRouteMatch} from "react-router-dom";
import IngredientDetails from "../components/burger-ingredients/details";

const IngredientPage = () => {
    const dispatch = useDispatch();
    const loading = useSelector(store => store.ingredients.loading);
    const fetchError = useSelector(store => store.ingredients.fetchError);
    const ingredients = useSelector(store => store.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    const { params } = useRouteMatch();

    if (!ingredients.length) {
        return null;
    }

    const ingredient = ingredients.find(ingredient => ingredient._id === params.id);

    return <>
        {!fetchError && !loading && <IngredientDetails {...ingredient} />}
        {loading && <Loader/>}
        {fetchError && <FetchError error={fetchError}/>}
    </>;
};

export default IngredientPage;