import React, {FC} from 'react';
import detailsStyles from "./details.module.css";
import {TDetails} from "../../utils/types";

const IngredientDetails: FC<TDetails> = ({
                                            image_large,
                                            name,
                                            calories,
                                            fat,
                                            carbohydrates,
                                            proteins
                                        }) => {
    return <div className={detailsStyles.wrap}>
        <img src={image_large} alt={name} className="mb-4"/>
        <h2 className="mb-8">{name}</h2>
        <div className={detailsStyles.details}>
            <div className={detailsStyles.details_item}>
                <span className="mb-2 text text_type_main-default">Калории, ккал</span>
                <span className="text text_type_digits-default">{calories || '-'}</span>
            </div>
            <div className={detailsStyles.details_item}>
                <span className="mb-2">Белки, г</span>
                <span className="text text_type_digits-default">{proteins || '-'}</span>
            </div>
            <div className={detailsStyles.details_item}>
                <span className="mb-2">Жиры, г</span>
                <span className="text text_type_digits-default">{fat || '-'}</span>
            </div>
            <div className={detailsStyles.details_item}>
                <span className="mb-2">Углеводы, г</span>
                <span className="text text_type_digits-default">{carbohydrates || '-'}</span>
            </div>
        </div>
    </div>
};

export default IngredientDetails;