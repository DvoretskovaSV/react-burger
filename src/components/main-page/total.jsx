import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import totalStyles from './total.module.css';
import Modal from "../elements/modal/modal";
import OrderDetails from "./order-details";

const Total = ({total = 0}) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className={`${totalStyles.wrap} pt-10 pb-10 pr-4`}>
                <div className="pr-10 text text_type_digits-medium">
                    {total} <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="medium">
                    Оформить заказ
                </Button>
            </div>
            {modalOpen &&
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <OrderDetails/>
                </Modal>
            }
        </>
    )
};

Total.propTypes = {
    total: PropTypes.number
};

export default Total;