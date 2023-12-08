import { Card, CardMedia } from "@mui/material";
import { useState } from "react";



function PokemonCard() {
    const [pokemonImgUrl, setPokemonImgUrl] = useState('https://external-preview.redd.it/e5zoQw-hgw-LCjdhC_4G8IAcHxex5pzda_BD_FPTcBY.png?width=960&crop=smart&auto=webp&s=23f9df250a8fe74763c3ba7cb8e46421e63cba2d');
    return(
        <Card sx={{ maxWidth: 400, alignSelf: 'center', justifySelf: 'center'}}>
            <CardMedia
            sx={{height: 300}}
            image={pokemonImgUrl}>
            </CardMedia>
        </Card>
    )
};

interface PokemonInfo {
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