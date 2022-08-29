import React, {useState, useEffect, useRef, createRef, useMemo, RefObject} from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from "../burger-ingredients/ingredients";
import BurgerConstructor from "../burger-constructor/constructor";
import Tabs from "../elements/tabs";
import FetchError from "../elements/fetch-error";
import Loader from "../elements/loader";
import Total from "./total";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {sections} from "../../utils/data";
import {getIngredients} from "../../services/actions/ingredients";
import {TConstructorIngredient, TConstructorIngredientItem, TIngredient, SectionsType} from "../../utils/types";
import {useAppDispatch, useAppSelector} from "../../hooks";

const thresholdStep = 10;
const threshold = Array(thresholdStep).fill(0).map((value, index) => 1 / thresholdStep * index);

type TabsRef = { [key in SectionsType]: RefObject<HTMLDivElement>; };

const Main = () => {
    const {loading, fetchError, ingredients} = useAppSelector(store => store.ingredients);
    const constructorItemsIds: TConstructorIngredient[] = useAppSelector(store => store.constructorIngredients.ingredients);
    const lockId = useAppSelector(store => store.constructorIngredients.lock);

    const [current, setCurrent] = useState('bun');

    const tabRefs: TabsRef= sections.reduce<TabsRef>((acc, value) => {
        acc[value.typeId] = createRef<HTMLDivElement>();
        return acc;
    }, {} as TabsRef);

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                if (!sectionRef.current) return;

                const maxTop = sectionRef.current.getBoundingClientRect().y;

                let items = new Map<SectionsType, any>();

                Object.entries(tabRefs).forEach(
                    ([key, value]) => {
                        if (value.current) {
                            items.set(key as SectionsType, Math.abs(value.current.getBoundingClientRect().y - maxTop));
                        }
                    }
                );

                items = new Map(Array.from(items).sort((a, b) => a[1] - b[1]));

                const [firstKey] = Array.from(items.keys());
                if (firstKey) {
                    setCurrent(firstKey);
                }

            }, {
                root: sectionRef.current,
                threshold
            });

            Object.entries(tabRefs).forEach(
                ([key, value]) => {
                    if (value.current) {
                        observer.observe(value.current);
                    }
                }
            );
        }
    }, [tabRefs]);

    const handleClick = (typeId: SectionsType) => {
        tabRefs[typeId].current!.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    const constructorItems = useMemo(() =>
        constructorItemsIds.reduce<Array<TConstructorIngredientItem>>((acc, item: TConstructorIngredient) => {
            const ingredientItem = ingredients.find(ingredient => ingredient._id === item.id);
            if (ingredientItem) {
                acc.push({
                    ...ingredientItem,
                    uuid: item.uuid,
                });
            }
            return acc;
        }, []), [ingredients, constructorItemsIds]);


    const lockItem = useMemo(() => ingredients.find(ingredient => ingredient._id === lockId), [lockId]);

    const countsMap: {[props: string]: number} = {};
    constructorItems.forEach((ingredientItem) => {
        countsMap[ingredientItem._id] = countsMap[ingredientItem._id] ? ++countsMap[ingredientItem._id] : 1;
    });

    if (lockId) {
        countsMap[lockId] = 1;
    }

    const initialLock = { price: 0 };
    const total = useMemo(() =>
        [...constructorItems, lockItem || initialLock, lockItem || initialLock]
            .reduce((acc, item) => (item.price || 0) + acc, 0),
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
                                                ingredients={ingredients.reduce<Array<TIngredient>>((acc, item) => {
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