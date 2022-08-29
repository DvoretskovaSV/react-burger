import React, {FC} from "react";
import detailsStyles from './order-details.module.css';
import {TOrder} from "../../utils/types";

const OrderDetails: FC<TOrder> = ({number = ''}) => (
    <>
        <p className={`${detailsStyles.identifier} text text_type_digits-large mp-4 mb-8`}>{number}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img src={require('../../images/done.svg').default} className="mb-15 mt-15"></img>
        <span className="mb-2">Ваш заказ начали готовить</span>
        <span className={`${detailsStyles.description} mb-15`}>Дождитесь готовности на орбитальной станции</span>
    </>
);

export default OrderDetails;