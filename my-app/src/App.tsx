import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Grid';
import { Card, Stack } from '@mui/material';
import  PokemonList from './PokemonList';
import { PokemonSearchBar } from './PokemonList';
import PokemonCard from './PokemonCard';


const pokemon = [
  {"name":"spearow","url":"https://pokeapi.co/api/v2/pokemon/21/"},
  {"name":"fearow","url":"https://pokeapi.co/api/v2/pokemon/22/"},
  {"name":"ekans","url":"https://pokeapi.co/api/v2/pokemon/23/"},
  {"name":"arbok","url":"https://pokeapi.co/api/v2/pokemon/24/"},
  {"name":"pikachu","url":"https://pokeapi.co/api/v2/pokemon/25/"},
  {"name":"raichu","url":"https://pokeapi.co/api/v2/pokemon/26/"},
  {"name":"sandshrew","url":"https://pokeapi.co/api/v2/pokemon/27/"},
  {"name":"sandslash","url":"https://pokeapi.co/api/v2/pokemon/28/"},
  {"name":"nidoran-f","url":"https://pokeapi.co/api/v2/pokemon/29/"},
  {"name":"nidorina","url":"https://pokeapi.co/api/v2/pokemon/30/"},
  {"name":"nidoqueen","url":"https://pokeapi.co/api/v2/pokemon/31/"},
  {"name":"nidoran-m","url":"https://pokeapi.co/api/v2/pokemon/32/"},
  {"name":"nidorino","url":"https://pokeapi.co/api/v2/pokemon/33/"},
  {"name":"nidoking","url":"https://pokeapi.co/api/v2/pokemon/34/"},
  {"name":"clefairy","url":"https://pokeapi.co/api/v2/pokemon/35/"},
  {"name":"clefable","url":"https://pokeapi.co/api/v2/pokemon/36/"},
  {"name":"vulpix","url":"https://pokeapi.co/api/v2/pokemon/37/"},
  {"name":"ninetales","url":"https://pokeapi.co/api/v2/pokemon/38/"},
  {"name":"jigglypuff","url":"https://pokeapi.co/api/v2/pokemon/39/"},
  {"name":"wigglytuff","url":"https://pokeapi.co/api/v2/pokemon/40/"}]

function App() {
  return (
    <div className='app-container'>
      <Grid container spacing={10}>
        <Grid className='pokemon-list-container' item xs={12} md={7}>
          <Stack spacing={2}>
            <PokemonSearchBar></PokemonSearchBar>
            <PokemonList></PokemonList>
          </Stack>
        </Grid>
        <Grid className='pokemon-info-container'item xs={12} md={5}>
          <PokemonCard></PokemonCard>
        </Grid>
      </Grid>
    </div>

  );
}

export default App;
