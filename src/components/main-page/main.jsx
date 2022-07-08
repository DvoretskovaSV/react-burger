import React, {useState, useEffect, useRef, useCallback, createRef} from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from "./burger-ingredients/ingredients";
import BurgerConstructor from "./burger-constructor/constructor";
import Tabs from "../elements/tabs";
import FetchError from "../elements/fetch-error";
import Loader from "../elements/loader";
import Total from "./total";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useDispatch, useSelector} from "react-redux";
import {sections} from "../../utils/data";
import {getIngredients} from "../../services/actions/ingredients";

const thresholdStep = 10;
const threshold = Array(thresholdStep).fill(0).map((value, index) => 1 / thresholdStep * index);


const Main = () => {
    const dispatch = useDispatch();

    const loading = useSelector(store => store.ingredients.loading);
    const fetchError = useSelector(store => store.ingredients.fetchError);
    const ingredients = useSelector(store => store.ingredients.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);

    const constructorItemsIds = useSelector(store => store.constructorIngredients.ingredients);
    const lockId = useSelector(store => store.constructorIngredients.lock);

    const [current, setCurrent] = useState('bun');

    const tabRefs = sections.reduce((acc, value) => {
        acc[value.typeId] = createRef();
        return acc;
    }, {});

    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                if (!sectionRef.current) return;

                const maxTop = sectionRef.current.getBoundingClientRect().y;

                let items = new Map();
                for (const key in tabRefs) {
                    if (tabRefs[key].current) {
                        items.set(key, Math.abs(tabRefs[key].current.getBoundingClientRect().y - maxTop));
                    }
                }

                items = new Map(Array.from(items).sort((a, b) => a[1] - b[1]));

                const [firstKey] = items.keys();
                if (firstKey) {
                    setCurrent(firstKey);
                }

            }, {
                root: sectionRef.current,
                threshold
            });

            for (const key in tabRefs) {
                observer.observe(tabRefs[key].current);
            }
        }
    }, [tabRefs]);

    const handleClick = (typeId) => {
        tabRefs[typeId].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    const countsMap = {};
    const constructorItems = useCallback(constructorItemsIds.reduce((acc, item) => {
        const ingredientItem = ingredients.find(ingredient => ingredient._id === item.id);
        if (ingredientItem) {
            acc.push({
                ...ingredientItem,
                uuid: item.uuid,
            });

            countsMap[ingredientItem._id] = countsMap[ingredientItem._id] ? ++countsMap[ingredientItem._id] : 1;
        }

        return acc;
    }, []) || [], [ingredients, constructorItemsIds]);

    const lockItem = useCallback(ingredients.find(ingredient => ingredient._id === lockId), [lockId]);

    if (lockId) {
        countsMap[lockId] = 1;
    }

    const total = useCallback(
        [...constructorItems, lockItem || {}, lockItem || {}].reduce((acc, item) => (item.price || 0) + acc, 0),
        [constructorItems, lockItem]
    );

    return (
        <>
            <main className={mainStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    {!fetchError && !loading &&
                        <>
                            <div className={mainStyles.left}>
                                <h1 className="mb-5"> Соберите бургер</h1>
                                <Tabs sections={sections} current={current} onClick={handleClick}/>
                                <div className={`${mainStyles.section} custom-scroll`} ref={sectionRef}>
                                    {sections.map((section, index) => (
                                        <div key={index} ref={tabRefs[section.typeId]}>
                                            <h2 className="pt-8 mb-10">{section.text}</h2>
                                            <BurgerIngredients
                                                key={index}
                                                ingredients={ingredients.reduce((acc, item) => {
                                                    if (item.type === section.typeId) {
                                                         acc.push({
                                                            ...item,
                                                            count: countsMap[item._id]
                                                        })
                                                    }
                                                    return acc;
                                                }, [])}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-15 ml-4">
                                <BurgerConstructor items={constructorItems} lockItem={lockItem}/>
                                <Total
                                    total={total}
                                />
                            </div>
                        </>
                    }
                </DndProvider>
            </main>
            {loading && <Loader/>}
            {fetchError && <FetchError error={fetchError}/>}
        </>
    );
};


export default Main;