import React from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import totalStyles from './total.module.css';
import Modal from "../elements/modal/modal";
import OrderDetails from "./order-details";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/actions/order";
import {closeModalOrder} from "../../services/actions/modal";
import Loader from "../elements/loader";
import FetchError from "../elements/fetch-error";
import {useHistory} from "react-router-dom";

const Total = ({total = 0}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const isOpenModal = useSelector(store => store.modal.isOpenModalOrder);
    const order = useSelector(store => store.order.order);
    const isLoading = useSelector(store => store.order.loading);
    const fetchError = useSelector(store => store.order.fetchError);
    const isAuthenticated = useSelector(store => store.user.isAuthenticated);

    const handlerClick = () => {
        if (isAuthenticated) {
            dispatch(createOrder());
        } else {
            history.replace("/login");
        }
    }

    const handleClose = () => {
        if (!isLoading) {
            dispatch(closeModalOrder());
        }
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
            {isOpenModal &&
                <Modal
                    isOpen={isOpenModal}
                    onClose={handleClose}
                    title={isLoading && !fetchError && "Обработка заказа"}
                >
                    {isLoading && !fetchError && <Loader />}
                    {!isLoading && !fetchError && <OrderDetails {...order}/>}
                    {fetchError && <FetchError />}
            </Modal>}
        </>
    )
};

Total.propTypes = {
    total: PropTypes.number
};

export default Total;