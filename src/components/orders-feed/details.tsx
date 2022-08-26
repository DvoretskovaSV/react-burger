import React, {FC} from "react";
import {OrderStatusText, SectionsType, TFeedOrder} from "../../utils/types";
import detailsStyles from "./details.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {formatDate} from "../../utils/util";
import {useIngredientsWithCount} from "../../hooks/useIngredientsWithCount";

type TProps = TFeedOrder & {
    isPage?: boolean;
}

const Details: FC<TProps> = ({name, number, createdAt, ingredients, status, isPage = false}) => {
    const { listIngredients, countsMap, total } = useIngredientsWithCount(ingredients);

    return <div className={`${detailsStyles.wrap} ${isPage ? (detailsStyles.page) : ''}`}>
        {isPage ? <div className={`${detailsStyles.listItemNumber} text text_type_digits-default p-8`}>#{number}</div> : null}
        <div className={`${detailsStyles.header} mb-15`}>
            <div className="text text_type_main-medium mb-2">{name}</div>
            <span className={`${detailsStyles[status]}`}>{OrderStatusText[status]}</span>
        </div>
        <div className={detailsStyles.center}>
            <h3>Состав:</h3>
            <ul className={`${detailsStyles.centerList} custom-scroll`}>
                {listIngredients.map(item =>
                    <li key={item._id} className={`${detailsStyles.centerListItem} p-1`}>
                        <div className={`${detailsStyles.centerItemImage} mr-4`}><img src={item.image} alt={item.name}/></div>
                        <span>{item.name}</span>
                        <span className={`${detailsStyles.centerListItemPrice} text text_type_digits-default pr-2`}>
                            {item.type === SectionsType.bun ? 2 : countsMap[item._id]}
                            <span> x </span>
                            {item.price}
                            <CurrencyIcon type="primary"/>
                        </span>
                    </li>
                )}
            </ul>
        </div>
        <div className={`${detailsStyles.footer} mt-5`}>
            <span className="text text_type_main-default sub_text">
                {formatDate(createdAt)}
            </span>
            <span className={`${detailsStyles.price} text text_type_digits-default`}>
                    {total}
                <CurrencyIcon type="primary"/>
            </span>
        </div>
    </div>;
};

export default Details;