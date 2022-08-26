import React, {FC} from "react";
import {OrderStatusText, TFeedOrder} from "../../utils/types";
import orderStyles from "./item.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useLocation} from "react-router-dom";
import {formatDate} from "../../utils/util";
import {useIngredientsWithCount} from "../../hooks/useIngredientsWithCount";

type TState = TFeedOrder & { visibleStatus?: boolean };

const OrderItem: FC<TState> = ({_id, name, number, createdAt, ingredients, visibleStatus, status}) => {
    const location = useLocation();
    const { listIngredients, total } = useIngredientsWithCount(ingredients);
    const visibleItems = listIngredients.slice(0, 6);
    const diff = listIngredients.length - visibleItems.length;

    return <div className={`${orderStyles.wrapItem} p-6 mb-4`}>

        <NavLink
            to={{
                pathname: `${location.pathname}/${_id}`,
                state: { background: location, number }
            }}
            className={orderStyles.link}>
        </NavLink>

        <div className={orderStyles.number}>
            <span className="text text_type_digits-default">#{number}</span>
            <span className="text text_type_main-default sub_text">{formatDate(new Date(createdAt))}</span>
        </div>
        <div className="text text_type_main-medium">{name}</div>
        {visibleStatus && <span className={`${orderStyles[status]}`}>{OrderStatusText[status]}</span>}
        <div className={orderStyles.itemsDetailsRight}>
            <ul className={orderStyles.list}>
                {visibleItems.map((item, index) =>
                    <li className={orderStyles.listItem} key={item._id} style={{zIndex: visibleItems.length - index}}>
                        <img src={item.image} alt={item.name}/>
                        {diff > 0 && index === (visibleItems.length - 1) &&
                            <div className={orderStyles.listItemLast}>+{diff}</div>
                        }
                    </li>
                )}
            </ul>
            <span className={`${orderStyles.price} text text_type_digits-default`}>
                {total}
                 <CurrencyIcon type="primary"/>
            </span>
        </div>
    </div>
};

export default OrderItem