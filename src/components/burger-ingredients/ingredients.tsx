import React, {FC} from 'react';
import ingredientsStyles from './ingredients.module.css';
import IngredientsItem from "./item";
import {TIngredient} from "../../utils/types";

type IProps = {
    ingredients: Array<TIngredient>;
}

const BurgerIngredients: FC<IProps> = ({ingredients}) => (
    <ul className={`${ingredientsStyles.list} pl-4 pr-4`}>
        {ingredients.map(item => (
            <IngredientsItem
                ingredient={item}
                key={item._id}
                className="mb-8"
            />
        ))}
    </ul>
);

export default BurgerIngredients;