import {useAppSelector} from "./index";
import {useMemo} from "react";
import {SectionsType} from "../utils/types";


export function useIngredientsWithCount(ingredients: string[]) {
    const mainIngredients = useAppSelector(store => store.ingredients);

    const listIngredients = useMemo(() => mainIngredients.ingredients.filter((item) =>
        ingredients.includes(item._id)),
        [mainIngredients]);

    const countsMap = useMemo(() => ingredients.reduce((mapItems, item) => {
        if (!mapItems[item]) {
            mapItems[item] = 0;
        }

        mapItems[item]++;
        return mapItems;
    }, {} as {[key: string]: number}), [listIngredients]);

    const total = useMemo(() => listIngredients.reduce((acc, item) =>
        acc + item.price * (item.type === SectionsType.bun ? 2 : countsMap[item._id]), 0), [listIngredients]);

    return { listIngredients, countsMap, total };
}