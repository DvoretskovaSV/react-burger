import React, {useState, useEffect} from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from "./burger-ingredients/ingredients";
import IngredientsItem from "./burger-ingredients/item";
import BurgerConstructor from "./burger-constructor/constructor";
import Tabs from "../elements/tabs";
import FetchError from "../elements/fetch-error";
import Loader from "../elements/loader";
import Total from "./total";
import {INGREDIENTS_URL} from "../../utils/constants";

const getRandomElements = (arr) => {
    return Array.from({length: Math.random() * arr.length},
        () => arr[Math.floor(Math.random() * arr.length)]._id
    );
};

const getRandomLock = (arr) => {
    const filteredArr = arr.filter(item => item.type === 'bun');
    const random = filteredArr[Math.floor(Math.random() * filteredArr.length)];
    return random ? random._id : '';
};

const sections = [
    {
        text: 'Булки',
        typeId: 'bun',
    },
    {
        text: 'Соусы',
        typeId: 'sauce',
    },
    {
        text: 'Начинки',
        typeId: 'main',
    }
];


const Main = () => {
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(INGREDIENTS_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response);
                }

                return response.json()
            })
            .then(data => setIngredients(data.data))
            .catch(err => setFetchError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const [busy, setBusy] = useState([]);

    useEffect(() => {
        setBusy(getRandomElements(ingredients));
    }, [ingredients]);

    const busyElements = busy.reduce((acc, id) => {
        const busyItem = ingredients.find(item => item._id === id);

        if (busyItem) {
            acc.push(busyItem);
        }

        return acc;
    }, []);

    return (
        <>
            <main className={mainStyles.main}>
                {!fetchError && !loading &&
                    <>
                        <div className={mainStyles.left}>
                            <h1 className="mb-5"> Соберите бургер</h1>
                            <Tabs sections={sections}/>
                            <div className={`${mainStyles.section} custom-scroll`}>
                                {sections.map((section, index) => (
                                    <div key={index}>
                                        <h2 className="mt-8 mb-10">{section.text}</h2>
                                        <BurgerIngredients key={index}>
                                            {ingredients.map(item => (
                                                item.type === section.typeId &&
                                                <IngredientsItem
                                                    ingredient={item}
                                                    key={item._id}
                                                    onClick={() => undefined}
                                                    className="mb-8"
                                                />
                                            ))}
                                        </BurgerIngredients>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-15 ml-4">
                            <BurgerConstructor items={busyElements} lockId={getRandomLock(busyElements)}/>
                            <Total
                                total={busyElements.reduce(((acc, item) => item.price + acc), 0)}
                            />
                        </div>
                    </>
                }
            </main>
            {loading && <Loader/>}
            {fetchError && <FetchError error={fetchError}/>}
        </>
    );
};


export default Main;