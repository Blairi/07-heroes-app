import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [ formValues, handleInputChange] = useForm({
    searchText: q
  });

  const { searchText } = formValues;

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = ( e ) => {
    e.preventDefault();
    navigate(`?q=${ searchText }`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className='row'>
        <div className='col-5'>

          <h4>Search a Hero!</h4>
          <hr />

          <form onSubmit={ handleSearch }>

            <div className='form-group'>
              <input 
                type='text'
                placeholder='Search Hero'
                className='form-control'
                name='searchText'
                autoComplete='off'
                value={ searchText }
                onChange={ handleInputChange }
              />
            </div>

            <button 
              type='submit' 
              className='btn btn-primary mt-2'
            >
              Search!
            </button>

          </form>
        </div>

        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          {
            (q === '')
              ? <div className='alert alert-info'>Searh Hero</div>
              : ( heroesFiltered.length === 0 ) && <div className='alert alert-danger'>No hay resultados: { q }</div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard
                key={ hero.id }
                { ...hero }
              />
            ))
          }

        </div>

      </div>

    </>
  )
}
