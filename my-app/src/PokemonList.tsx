import { TextField, Box, CircularProgress, Paper, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {FixedSizeGrid, FixedSizeList, FixedSizeList as List, ListChildComponentProps} from "react-window";



function formatPokemonString(str : string) {
    const words = str.replace(/-/g, ' ').split(' ');

     // Capitalize each word
     const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

     // Join the words back into a string
     const finalWord = capitalizedWords.join(' ');

  return finalWord;
}

export enum PokeStatus {
    Loading,
    Success,
    Error,
}

interface PokeAPIResponse {
    status: PokeStatus
    error: any
    data: any
}

export function PokemonSearchBar() {
    return (
        <TextField fullWidth label="Search your Pokemon" id="searchBar" />
    );
}

//Personalized hook to get Pokemon list
export function useLoadPokemon() {
    const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [hasEnded, setHasEnded] = useState(false);
    const [results, setResults] = useState<BasicPokemon[]>([]);
    const [status, setStatus] = useState(PokeStatus.Loading);

    useEffect(() => {
        const fetchData = async (next: string) => {
            try {
                const response = await fetch(next);
                const data = await response.json();
                setResults((prevResults) => [...prevResults, ...data.results]);
                setNextPage(data.next);
                if (data.next === null) {
                    setHasEnded(true);
                    setStatus(PokeStatus.Success);
                }
            } catch (error) {
                setStatus(PokeStatus.Error);
                console.error('Error fetching data:', error);
            }
        };

        if (nextPage && !hasEnded) {
            fetchData(nextPage);
        }
    }, [nextPage, hasEnded]);

    return [results, status] as const;
}



export default function PokemonList() {
    const [result, status] = useLoadPokemon();
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
    console.log(status);
    return (
        <div>
            {status === PokeStatus.Success && (
                <Box sx={{ height: 'fit-content', width: '100%' }}>
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
                //onRowClick={}
            />
            </Box>
            )}
            {status === PokeStatus.Loading && (
                <CircularProgress/>
            )}
            {status === PokeStatus.Error && (
                <p>Connection with PokeAPI failed :c</p>
            )}
        </div>
    );
}

interface BasicPokemon {
    name: string
    url: string
}

interface ListPokemon {
    name:string
    id: number
}

interface PokemonTypes {

}

interface PokemonDetails {
    name: string
    iconLink: string
}