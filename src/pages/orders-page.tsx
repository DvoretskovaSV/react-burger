import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "../hooks";
import {connectionCloseOrdersAll, connectionStartOrdersAll} from "../services/actions/ws";
import Feed from '../components/orders-feed/feed';
import Status from "../components/orders-feed/status";
import Total from "../components/orders-feed/total";
import pageStyles from './orders-page.module.css';

const OrdersPage: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(connectionStartOrdersAll());

        return () => {
            dispatch(connectionCloseOrdersAll());
        };
    }, []);

    return <>
        <h1 className='mb-5'>Лента заказов</h1>
        <div className={pageStyles.wrap}>
            <div className={`${pageStyles.left} custom-scroll`}>
                <Feed/>
            </div>
            <div>
                <div className="mb-15"><Status/></div>
                <Total/>
            </div>
        </div>
    </>;
}

export default OrdersPage;