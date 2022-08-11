import React, {useEffect} from "react";
import {getIngredients} from "../services/actions/ingredients";
import Loader from "../components/elements/loader";
import FetchError from "../components/elements/fetch-error";
import {useRouteMatch} from "react-router-dom";
import IngredientDetails from "../components/burger-ingredients/details";
import {TDetails} from "../utils/types";
import {useAppSelector, useAppDispatch} from "../hooks";

interface MatchParams {
    ingredientId: string;
}

const IngredientPage = () => {
    const dispatch = useAppDispatch();
    const { loading, fetchError, ingredients } = useAppSelector(store => store.ingredients);

    useEffect(() => {
        dispatch(getIngredients() as any);
    }, []);

    const { params } = useRouteMatch<MatchParams>();

    if (!ingredients.length) {
        return null;
    }

    const ingredient = ingredients.find(ingredient => ingredient._id === params.ingredientId);

    return (
        <>
            {!fetchError && !loading && <IngredientDetails {...ingredient as TDetails} />}
            {loading && <Loader/>}
            {fetchError && <FetchError error={fetchError as string}/>}
        </>
    );
};

export default IngredientPage;