import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import { Card, Stack } from '@mui/material';
import  PokemonList from './PokemonList';
import { PokemonSearchBar, PokeStatus } from './PokemonList';
import PokemonCard, { PokemonInfo } from './PokemonCard';


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
                front_default: './assets/pokemon-who.webp',
            }
        }
    }
  })
  const [status, setStatus] = useState(PokeStatus.Loading);
  const [infoUrl, setInfoUrl] = useState<string>('');


  const fetchPokemonData = async (apiUrl : string) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPokemonData(data);
      console.log(pokemonData)
      setStatus(PokeStatus.Success);
    } catch (error) {
      console.log('Error connecting with PokeAPI');
      //setStatus(PokeStatus.Error);
    }
  };

/*   //Fetch Pokemon data when the url is updated
  useEffect(() => {
    fetchPokemonData();
  }, []); */

  const handlePokemonClick = (apiUrl : string) => {
    fetchPokemonData(apiUrl);
  }

  const setPokemonInfoUrl = (str: string) => {
    setInfoUrl(str);
  }

  const getCurrentUrl = () => {
    return infoUrl;
  }


  return (
    <div className='app-container'>
      <Grid container spacing={10}>
        <Grid className='pokemon-list-container' item xs={12} md={7}>
          <Stack spacing={2}>
            <PokemonSearchBar></PokemonSearchBar>
            <PokemonList onPokemonClick={handlePokemonClick}></PokemonList>
          </Stack>
        </Grid>
        <Grid className='pokemon-info-container'item xs={12} md={5}>
          <PokemonCard pokemonData={pokemonData} pokemonStatus={status}/>
        </Grid>
      </Grid>
    </div>

  );
}

export default App;
