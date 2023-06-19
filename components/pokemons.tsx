"use client"

import React from "react"
import { POKEMON_URL, TYPES_URL } from "@/constants/urls"

import PokemonCard from "@/components/pokemons/PokemonCard"

type Props = {
  name: string
  url: string
}

const Pokemons: any = async () => {
  const { results: typesData } = await fetch(TYPES_URL).then((res) =>
    res.json()
  )
  const { results: pokemonData } = await fetch(POKEMON_URL).then((res) =>
    res.json()
  )

  const allTypes = await Promise.all(
    typesData.map(async (type: Props) => {
      const { pokemon }: { pokemon: Array<{ pokemon: { name: string } }> } =
        await fetch(type.url).then((res) => res.json())
      return {
        type: type.name,
        pokemonList: pokemon.map(
          ({ pokemon }: { pokemon: { name: string } }) => pokemon.name
        ),
      }
    })
  )

  const allPokemon = pokemonData.map((pokemon: Props) => {
    return {
      name: pokemon.name,
      id: pokemon.url.split("/")[6],
      types: allTypes.reduce((types, { type, pokemonList }) => {
        return pokemonList.includes(pokemon.name) ? [...types, type] : types
      }, []),
    }
  })

  return (
    <section className="h-500 w-300 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allPokemon.map(
        (pokemon: { name: string; id: number; types: string[] }) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        )
      )}
    </section>
  )
}

export default Pokemons
