import React, {useState, useEffect} from 'react';
import PizzaApi from '../api/PizzaApi';
import IngredientApi from '../api/IngredientApi';
import PizzaIngredientApi from '../api/PizzaIngredientsApi';
import {Link} from 'react-router-dom';

const PizzaEdit = ({history, ...props}) => {
    const [pizza, setPizza] = useState({id: 0, name: "", ingredients: []});
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        let loaded = false;
        const api = new PizzaApi();
        api.getData(`/${props.match.params.id}`)
            .then((r) => {
                if (!loaded) {
                    setPizza(r.data);
                }
            })
            .catch((e) => {
                console.log(e)
            });
        
        return () => loaded = true;
    }, [])

    useEffect(() => {
        const ingredientsApi = new IngredientApi();
        ingredientsApi.getData('/GetAll')
            .then((r) => {
                const filteredList = r.data.filter(i => pizza.ingredients.find(pi => pi.id === i.id) === undefined);
                setIngredients(filteredList);
            })
            .catch((e) => {
                console.log(e)
            })
    }, [pizza])

    const handleChangeName = (e) => {
        const txt = e.target.value;
        setPizza({...pizza, name: txt});
    }

    const handleSaveName = () => {
        const api = new PizzaApi();
        api.putData(`/${pizza.id}`, {id: pizza.id, name: pizza.name})
            .then((r) => {
                setPizza({...pizza, id: r.data.id, name: r.data.name})
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const handleAddToPizza = (ingredient) => (e) => {
        const api = new PizzaIngredientApi();
        api.putData(`/${pizza.id}`, {...ingredient})
            .then((r) => {
                setIngredients(ingredients.filter(i => i.id !== ingredient.id));
                setPizza({...pizza, ingredients: [...pizza.ingredients, ingredient]});
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const handleRemoveFromPizza = (ingredient) => (e) => {
        const api = new PizzaIngredientApi();
        api.deleteData(`/${pizza.id}`, {...ingredient})
            .then((r) => {
                setIngredients([...ingredients, ingredient]);
                setPizza({...pizza, ingredients: pizza.ingredients.filter(i => i.id !== ingredient.id)});
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return(
        <>
            <h2>Edit Pizza</h2>
            <div>
                <input type="text" value={pizza.name} onChange={handleChangeName} />
                <input type="button" value="Save Name" onClick={handleSaveName} />
            </div>
            <hr/>
            <h4>Ingredients</h4>
            <ul>
            {
                pizza.ingredients && pizza.ingredients.map(i => (
                    <li key={i.id} className="ingredient"><div className="ingredient-name">{i.name}</div><input type="button" value="Remove from Pizza" onClick={handleRemoveFromPizza(i)} /></li>
                ))
            }
            </ul>
            <h4>Available Ingredients</h4>
            <ul>
            {
                ingredients.length > 0 && ingredients.map(i => (
                    <li key={i.id} className="ingredient" ><div className="ingredient-name">{i.name}</div><input type="button" value="Add to Pizza" onClick={handleAddToPizza(i)} /></li>
                ))
            }
            </ul>
            <Link to="/" >To Pizza List</Link>
        </>
    )
}

export default PizzaEdit;