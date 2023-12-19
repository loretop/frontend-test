import { TextField, Box, CircularProgress, FormControl, FormHelperText, Autocomplete, Stack} from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import { PokeStatus } from "./App";


export function formatPokemonString(str : string) {
    const words = str.replace(/-/g, ' ').split(' ');

     // Capitalize each word
     const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

     // Join the words back into a string
     const finalWord = capitalizedWords.join(' ');

  return finalWord;
}


//Create list of all Pokemon names from fetched BasicPokemon
export function setPokemonList(pokeList : BasicPokemon[]) {
    const pokeNames : string[] = [];
    for (let pokemon of pokeList) {

        pokeNames.push(pokemon.name);
    }
    return pokeNames;
}

//Personalized hook to get Pokemon list
export function useFetchPokemon(url : string) {
    const [nextPage, setNextPage] = useState('');
    const [hasEnded, setHasEnded] = useState(false);
    const [results, setResults] = useState<BasicPokemon[]>([]);
    const [status, setStatus] = useState(PokeStatus.Loading);

    useEffect(() => {
        const fetchData = async (next: string) => {
            try {
                if (next != '') {
                    const response = await fetch(next, {cache: "no-store"});
                    const data = await response.json();
                    setNextPage(data.next);
                    setResults((prevResults) => [...prevResults, ...data.results]);
                    if (data.next === null) {
                        setHasEnded(true);
                        setStatus(PokeStatus.Success);
                    }
                }
                else {
                    setNextPage(url);
                }

            } catch (error) {
                setStatus(PokeStatus.Error);
                console.error('Error fetching data:', error);
            }
        };

        if (!hasEnded) {
            fetchData(nextPage);
        }
    }, [nextPage, hasEnded]);

    return [results, status] as const;
  }


export function PokemonSearchBar(fetchedPokemon : BasicPokemon[]) {
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [pokeNamesList, setPokeNamesList] = useState<string[]>([]);
    const loading = open && pokeNamesList.length === 0;

    useEffect(() => {
        let active = true;

        if(!loading) {
            return undefined;
        }

    })

    const pokeNames : string[] = [];
    if(fetchedPokemon.length > 0) {
        const pokeNames = setPokemonList(fetchedPokemon)
    }


    return (
        <Autocomplete
            disablePortal
            id="pokemon-search-bar"
            options={pokeNames}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Search a Pokemon" />}
        />
    );
}


export default function PokemonList({onPokemonClick, onPokemonFetch}: PokemonListProps) {
    const [result, status] = useFetchPokemon("https://pokeapi.co/api/v2/pokemon");
    if (status == PokeStatus.Success) {
        onPokemonFetch(result);
    }
    const namesList : string[] = [];
    result.forEach(function (pokemon) {
        namesList.push(formatPokemonString(pokemon.name));
    })
    console.log(namesList);
    const rows: ListPokemon[] = result.map((pokemon, index) => ({
        id: index + 1,
        name: formatPokemonString(pokemon.name),
        url: pokemon.url,
      }));
    const columns : GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'name', headerName: 'Pokemon', width: 900, hideable: false},
        {field: 'url', headerName: 'More info', width: 0}
    ]

    const handleClick: GridEventListener<'rowClick'> = (
        params, // GridRowParams
      ) => {
        const newApiUrl = params.row.url;
    // Use a callback function to avoid potential infinite re-renders
        onPokemonClick(newApiUrl);
      };
    return (
        <div>
            <Box sx={{ height: 'fit-content', width: '100%' }}>
                <Stack spacing={2}>
                    {status === PokeStatus.Success && (
                        <Fragment>
                            <Autocomplete
                                disablePortal
                                freeSolo
                                id="pokemon-search-bar"
                                options={namesList}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Search a Pokemon" />}
                            />
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                        pageSize: 10,
                                        },
                                    },
                                }}
                                columnVisibilityModel={{
                                    url: false,
                                }}
                                pageSizeOptions={[10,20]}
                                onRowClick={handleClick}
                            />
                        </Fragment>
                    )}
                    {status === PokeStatus.Loading && (
                        <Fragment>
                            <Autocomplete
                                disablePortal
                                freeSolo
                                disabled
                                id="disabled-pokemon-search-bar"
                                options={[]}
                                renderInput={(params) => <TextField {...params} label="Search a Pokemon" />}
                                sx={{ width: '100%' }}
                            />
                            <CircularProgress/>
                        </Fragment>

                    )}
                    {status === PokeStatus.Error && (
                        <p>Connection with PokeAPI failed!</p>
                    )}
                </Stack>
            </Box>
        </div>
    );
}

interface PokemonListProps {
    onPokemonClick: (url : string) => void
    onPokemonFetch: (pokemonList : BasicPokemon[]) => void
}


export interface BasicPokemon {
    name: string
    url: string
}

interface ListPokemon {
    name:string
    id: number
}