import React, {useEffect, useState} from 'react';
import IngredientApi from '../api/IngredientApi';
import {Link} from 'react-router-dom';

const IngredientsList = ({history}) => {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState("");

    useEffect(() => {
        let isLoaded = false;
        const api = new IngredientApi();
        api.getData('/GetAll').then((r) => {
            if (!isLoaded) {
                setIngredients(r.data)
            }
        }).catch((e) => {
            console.log(e);
        })

        return () => isLoaded = true
    }, [])

    const handleAddIngredient = () => {
        if (newIngredient) {
            const api = new IngredientApi();
            api.postData("/", {
                name: newIngredient
            }).then((r) => {
                setNewIngredient("");
                setIngredients([...ingredients, r.data])
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleOnChange = (e) => {
        const txt = e.target.value;
        setNewIngredient(txt);
    }

    const handleDelete = (id) => (e) => {
        const api = new IngredientApi();
        api.deleteData(`/${id}`).then((r) => {
            setIngredients(ingredients.filter(p => p.id !== id))
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            <h2>Ingredients List</h2>
            <hr />
            <div>
                <input type="text" placeholder="Add New Ingredient" value={newIngredient} onChange={handleOnChange} />
                <input type="button" value="Add" onClick={handleAddIngredient} />
            </div>
            <ul>
                {
                    ingredients && ingredients.length > 0 && (
                        ingredients.map(p => (
                            <li key={p.id} className="ingredient">
                                <div>{p.name}</div>
                                <input type="button" value="Delete" onClick={handleDelete(p.id)} />
                            </li>
                        ))
                    )
                }
            </ul>
            <Link to="/">To Pizzas List</Link>
        </>
    )
}

export default IngredientsList;