import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { PokeStatus } from "./PokemonList";


//Custom hook to fetch a Pokemon's info
/* export function useGetPokemon(url : string)  {
    //set empty Pokemon initially
    const [pokemon, setPokemon] = useState<PokemonInfo | null>({
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
    });
    const [status, setStatus] = useState(PokeStatus.Loading);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const data = await response.json();
            setPokemon(data);
            setStatus(PokeStatus.Success);
          } catch (error) {
            console.log('Error connecting with PokeAPI');
            setStatus(PokeStatus.Error);
          }
        };

        fetchData();
      }, [url]);
    return [pokemon, status] as const;
} */

function PokemonCard( { pokemonData, pokemonStatus} : PokemonCardProps) {
    return(
        <Card sx={
            { maxWidth: 400,
            alignSelf: 'center',
            justifySelf: 'center',
            }}>

            {pokemonStatus === PokeStatus.Success && (
                <div>
                    <CardMedia
                    sx={{height: 300}}
                    image={pokemonData.sprites.other['official-artwork'].front_default}>
                    </CardMedia>

                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                        It's {pokemonData.name}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        <b>Name: </b> <br/>
                        <b>Type: </b>

                        </Typography>
                    </CardContent>
                </div>
            )}
            {pokemonStatus === PokeStatus.Loading && (
                <div>
                    <CardMedia
                    sx={{height: 300}}
                    image={"./assets/pokemon-who.webp"}>
                    </CardMedia>

                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                        Who's that Pokemon?
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        <b>Name: </b> <br/>
                        <b>Type: </b>

                        </Typography>
                    </CardContent>
                </div>
            )}
        </Card>
    )
};

interface PokemonUrl {
    url: string
}

interface PokemonCardProps {
    pokemonData: PokemonInfo
    pokemonStatus: PokeStatus
}

export interface PokemonInfo {
    abilities: {
        ability: {
            name: string
        }
        is_hidden: boolean
    }[]
    name: string
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
}

export default PokemonCard;