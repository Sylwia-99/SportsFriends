import React from 'react';
import '../../styles/Filters.css';
import {useForm} from "react-hook-form";

const Filters = (props) =>{
    const {register, handleSubmit} = useForm();

    const onSubmit = formData => {
        props.filtersStateSetter(formData)
        console.log(
            formData.activity,
            formData.city,
            formData.name,
            formData.surname,
            formData.city,
            formData.street)
    }

    return (
        <form className="search-filters" onSubmit={handleSubmit(onSubmit)}>
            <div className="activity-filtr">
                <select
                    className="select-activity-filter"
                    name="activity"
                    {...register("activity")}
                >
                    <option value="">Aktywność</option>
                    <option value="Bieganie">Bieganie</option>
                    <option value="Rower">Rower</option>
                    <option value="Pływanie">Pływanie</option>
                    <option value="Piłka nożna">Piłka nożna</option>
                    <option value="Siłownia">Siłownia</option>
                </select>
            </div>
            <div className="name-filtr">
                <input
                    name="name"
                    className="name"
                    placeholder="Imię"
                    {...register("name")}
                />
            </div>
            <div className="surname-filtr">
                <input
                    name="surname"
                    className="surname"
                    placeholder="Nazwisko"
                    {...register("surname")}
                />
            </div>
            <div className="city-filtr">
                <input
                    name="city"
                    className="city"
                    placeholder="Miasto"
                    {...register("city")}
                />
            </div>
            <div className="street-filtr">
                <input
                    name="street"
                    className="street"
                    placeholder="Ulica"
                    {...register("street")}
                />
            </div>
            <div className="search-button-content">
                <button className="filters-search-button" type="submit">Szukaj</button>
            </div>
        </form>
    )
}

export default Filters;