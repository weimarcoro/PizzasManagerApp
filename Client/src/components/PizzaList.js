import React, {useEffect, useState} from 'react';
import PizzaApi from '../api/PizzaApi';
import {Link} from 'react-router-dom';

const Main = ({history}) => {
    const [pizzas, setPizzass] = useState([]);
    const [newPizza, setNewPizza] = useState("");

    useEffect(() => {
        let isLoaded = false;
        const api = new PizzaApi();
        api.getData('/GetAll').then((r) => {
            if (!isLoaded) {
                setPizzass(r.data)
            }
        }).catch((e) => {
            console.log(e);
        })

        return () => isLoaded = true
    }, [])

    const handleAddPizza = () => {
        if (newPizza) {
            const api = new PizzaApi();
            api.postData("/", {
                name: newPizza
            }).then((r) => {
                setNewPizza("");
                setPizzass([...pizzas, r.data])
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleOnChange = (e) => {
        const txt = e.target.value;
        setNewPizza(txt);
    }

    const handleDelete = (id) => (e) => {
        const api = new PizzaApi();
        api.deleteData(`/${id}`).then((r) => {
            setPizzass(pizzas.filter(p => p.id !== id))
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleEdit= (id) => (e) => {
        history.push(`/Edit/${id}`)
    }

    return (
        <>
            <h2>Pizza List</h2>
            <hr />
            <div>
                <input type="text" placeholder="Add New Pizza" value={newPizza} onChange={handleOnChange} />
                <input type="button" value="Add" onClick={handleAddPizza} />
            </div>
            <div className="pizza-list-container">
                {
                    pizzas && pizzas.length > 0 && (
                        pizzas.map(p => (
                            <div key={p.id} className="pizza-item">
                                <div className="pizza-item-header">
                                    <h3>{p.name}</h3>
                                    <div className="pizza-item-buttons">
                                        <input type="button" value="Edit" onClick={handleEdit(p.id)} />
                                        <input type="button" value="Delete" onClick={handleDelete(p.id)} />
                                    </div>
                                </div>
                                <ul>
                                    {p.ingredients && p.ingredients.length > 0 && p.ingredients.map(i => (
                                        <li key={i.id}>{i.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )
                }
            </div>
            <Link to="/Ingredients">To Ingredients</Link>
        </>
    )
}

export default Main;