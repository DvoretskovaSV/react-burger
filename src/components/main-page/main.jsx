import React, {useState, useEffect} from 'react';
import mainStyles from './main.module.css';
import BurgerIngredients from "./burger-ingredients/ingredients";
import BurgerConstructor from "./burger-constructor/constructor";
import Tabs from "../elements/tabs";
import FetchError from "../elements/fetch-error";
import Loader from "../elements/loader";
import Total from "./total";

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


const Main = ({ingredients, loading, fetchError}) => {
    const [busy, setBusy] = useState([]);
    const [current, setCurrent] = useState('bun');
    const refs = sections.reduce((acc, value) => {
        acc[value.typeId] = React.createRef();
        return acc;
    }, {});

    const handleClick = (typeId) => {
        setCurrent(typeId);
        refs[typeId].current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    return (
        <>
            <main className={mainStyles.main}>
                {!fetchError && !loading &&
                    <>
                        <div className={mainStyles.left}>
                            <h1 className="mb-5"> Соберите бургер</h1>
                            <Tabs sections={sections} current={current} onClick={handleClick}/>
                            <div className={`${mainStyles.section} custom-scroll`}>
                                {sections.map((section, index) => (
                                    <div key={index} ref={refs[section.typeId]}>
                                        <h2 className="pt-8 mb-10">{section.text}</h2>
                                        <BurgerIngredients
                                            key={index}
                                            ingredients={ingredients.filter((item) =>  item.type === section.typeId)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-15 ml-4">
                            <BurgerConstructor items={[]} lockId={null}/>
                            <Total
                                total={busy.reduce(((acc, item) => item.price + acc), 0)}
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