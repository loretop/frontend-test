import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { PokeStatus, formatPokemonString } from "./PokemonList";

//PokemonCard Component
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
                    sx={{height: 400}}
                    image={pokemonData.sprites.other['official-artwork'].front_default}>
                    </CardMedia>

                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                        It's {formatPokemonString(pokemonData.name)}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                        <b>Name: {formatPokemonString(pokemonData.name)} </b> <br/>
                        <b>Type: </b>
                        {
                            pokemonData.types.map(type => `${formatPokemonString(type.type.name)} `)
                        }
                        <br/>
                        <b>Abilities: </b>
                        {
                            pokemonData.abilities.map(ability => `${formatPokemonString(ability.ability.name)} `)
                        }
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
                        <b>Abilities: </b>

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