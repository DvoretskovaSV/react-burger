import React from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import totalStyles from './total.module.css';
import Modal from "../elements/modal/modal";
import OrderDetails from "./order-details";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/order";
import {CLOSE_MODAL_ORDER} from "../../services/actions/modal";

const Total = ({total = 0}) => {
    const dispatch = useDispatch();

    const isOpenModal = useSelector(store => store.modal.isOpenModalOrder);
    const order = useSelector(store => store.order.order);

    const handlerClick = () => {
        dispatch(createOrder());
    }

    const handleClose = () => {
        dispatch({
            type: CLOSE_MODAL_ORDER
        });
    }

    return (
        <>
            <div className={`${totalStyles.wrap} pt-10 pb-10 pr-4`}>
                <div className="pr-10 text text_type_digits-medium">
                    {total} <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="medium" onClick={handlerClick}>
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && <Modal
                isOpen={isOpenModal}
                onClose={handleClose}
            >
                <OrderDetails {...order}/>
            </Modal>}
        </>
    )
};

Total.propTypes = {
    total: PropTypes.number
};

export default Total;