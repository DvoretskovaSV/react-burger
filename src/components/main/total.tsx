import React, {FC} from 'react';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import totalStyles from './total.module.css';
import Modal from "../elements/modal/modal";
import OrderDetails from "./order-details";
import {createOrder} from "../../services/actions/order";
import {closeModalOrder} from "../../services/actions/modal";
import Loader from "../elements/loader";
import FetchError from "../elements/fetch-error";
import {useHistory} from "react-router-dom";
import {TOrder} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

type IProps = {
    total?: number;
}

const Total: FC<IProps> = ({total = 0}) => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const {isOpenModalOrder} = useAppSelector(store => store.modal);
    const {order, loading, fetchError} = useAppSelector(store => store.order)
    const {isAuthenticated} = useAppSelector(store => store.user)

    const handlerClick = () => {
        if (isAuthenticated) {
            dispatch(createOrder() as any);
        } else {
            history.replace("/login");
        }
    }

    const handleClose = () => {
        dispatch(closeModalOrder());
    }

    return (
        <>
            <div className={`${totalStyles.wrap} pt-10 pb-10 pr-4`}>
                <div className="pr-10 text text_type_digits-medium">
                    {total} <CurrencyIcon type="primary"/>
                </div>
                {/* @ts-ignore */}
                <Button type="primary" size="medium" onClick={handlerClick}>
                    Оформить заказ
                </Button>
            </div>
            {isOpenModalOrder &&
                <Modal
                    isOpen={isOpenModalOrder}
                    onClose={handleClose}
                    title={(loading && !fetchError && "Обработка заказа") || ''}
                >
                    {loading && !fetchError && <Loader />}
                    {order && !fetchError && <OrderDetails {...order as TOrder} />}
                    {fetchError && <FetchError error={fetchError}/>}
            </Modal>}
        </>
    )
};

export default Total;