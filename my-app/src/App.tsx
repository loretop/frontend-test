import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import  PokemonList from './PokemonList';
import { BasicPokemon } from './PokemonList';
import PokemonCard, { PokemonInfo } from './PokemonCard';

export enum PokeStatus {
  Loading,
  Success,
  Error,
}


function App() {
  const [pokemonData, setPokemonData] = useState<PokemonInfo>({
    abilities: [{
        ability: {
            name: '',
        },
        is_hidden: false,
    },],
    name: '',
    types: [{
        slot: -1,
        type: {
            name: '',
            url: '',
        }
    }],
    sprites: {
        other: {
            'official-artwork': {
                front_default: '',
            }
        }
    }
  })
  const [status, setStatus] = useState(PokeStatus.Loading);
  const [pokeAPIResponse, setPokeAPIResponse] = useState<BasicPokemon[]>([]);

  //Fetch data of a specific pokemon using an url to the API
  const fetchPokemonData = async (apiUrl : string) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPokemonData(data);
      setStatus(PokeStatus.Success);
    } catch (error) {
      console.log('Error connecting with PokeAPI');
    }
  };

  const handlePokemonClick = (apiUrl : string) => {
    fetchPokemonData(apiUrl);
  }

  const setPokemonAPIResults = (pokeResponse : BasicPokemon[]) => {
    setPokeAPIResponse(pokeResponse);
  }

  useEffect(() => {
    setPokemonAPIResults(pokeAPIResponse);
  }, [pokeAPIResponse])

  console.log(pokeAPIResponse);

  return (
    <div className='app-container'>
      <Grid container spacing={10}>
        <Grid className='pokemon-list-container' item xs={12} md={7}>
            <PokemonList onPokemonClick={handlePokemonClick} onPokemonFetch={setPokemonAPIResults}></PokemonList>
        </Grid>
        <Grid className='pokemon-info-container'item xs={12} md={5}>
          <PokemonCard pokemonData={pokemonData} pokemonStatus={status}/>
        </Grid>
      </Grid>
    </div>

  );
}

export default App;
