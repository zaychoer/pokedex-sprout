"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { COLORS } from "@/constants/colors"
import { BASE_URL, IMAGES_URL } from "@/constants/urls"

import { capitalize } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import StatsBar from "@/components/pokemons/StatsBar"

const LAST_POKEDEX_ID = 32

function getEvolutionChain(evolution: any): { name: string; id: string }[] {
  const species = {
    name: evolution.species.name,
    id: evolution.species.url.split("/")[6],
  }

  if (evolution.evolves_to.length === 0) return [species]
  return [species, ...getEvolutionChain(evolution.evolves_to[0])]
}

const Pokemon = async (param: { params?: { pokemon: string } } | {}) => {
  const { params } = param as { params?: { pokemon: string } }
  const res = await fetch(`${BASE_URL}/pokemon/${params?.pokemon}`)
  const data = await res.json()
  const name = capitalize(data.name)
  const id = data.id.toString()
  const image = data.sprites.other["official-artwork"].front_default
  const weight = data.weight / 10 // convert from hectogram to kg
  const height = data.height * 10 // convert from decimeter to cm
  const abilities = data.abilities
    .map(({ ability }: { ability: { name: string } }) =>
      capitalize(ability.name)
    )
    .join(", ")
  const stats = data.stats.map(
    ({ base_stat, stat }: { base_stat: number; stat: { name: string } }) => ({
      base_stat,
      name: stat.name,
    })
  )
  const nextPokemon = parseInt(id) + 1
  const previousPokemon = parseInt(id) - 1

  const speciesData = await fetch(data.species.url).then((res) => res.json())
  const color = speciesData.color.name
  const isDark = color === "white"

  const descriptions = speciesData.flavor_text_entries
    .filter(
      (flavorText: { language: { name: string }; flavor_text: string }) =>
        flavorText.language.name === "en"
    )
    .map(({ flavor_text }: { flavor_text: string }) => flavor_text)

  const { chain: evolutionData } = await fetch(
    speciesData.evolution_chain.url
  ).then((res) => res.json())
  const evolutionChain = getEvolutionChain(evolutionData)

  return (
    <div
      className={`flex flex-col gap-4 pb-10 ${
        isDark ? "text-black" : "text-white"
      }`}
      style={{ backgroundColor: COLORS[color] }}
    >
      <section className="container relative mx-auto my-4">
        <div className="mt-10 flex w-full flex-row items-center justify-between">
          <Link href={"/"}>
            <Icons.ArrowLeft className="h-6 w-6" />
          </Link>
          <h2 className="text-2xl font-bold capitalize text-white">
            {data.forms[0].name}
          </h2>
          <p className="ml-5 text-white">
            {id < 10 ? `#00${id}` : id < 100 ? `#0${id}` : `#${id}`}
          </p>
        </div>
      </section>
      <section className="container relative z-10 mx-auto mt-4">
        <div className="flex justify-center px-[15vw] drop-shadow-lg">
          {image && <Image src={image} alt={name} width="400" height="400" />}
        </div>
        {previousPokemon > 0 && (
          <Link href={`/${previousPokemon}`}>
            <Icons.ArrowLeft className="absolute left-2 top-[50%] h-6 w-6 cursor-pointer" />
          </Link>
        )}
        {nextPokemon < LAST_POKEDEX_ID && (
          <Link href={`/${nextPokemon}`}>
            <Icons.ArrowRight className="absolute right-2 top-[50%] h-6 w-6 cursor-pointer" />
          </Link>
        )}
      </section>
      <section className="container relative mx-auto -mt-16 rounded-3xl bg-white pb-10">
        <Tabs defaultValue="about" className="mt-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="base-stats">Base Stats</TabsTrigger>
            <TabsTrigger value="evolution">Evolution</TabsTrigger>
            <TabsTrigger value="moves">Moves</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>
                  <div>
                    <p className="font-light">{descriptions[0]}</p>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex flex-col justify-between">
                    <p>
                      <span className="mr-2 font-bold">Weight:</span>
                      <span className="font-light">{weight}kg</span>
                    </p>
                    <p>
                      <span className="mr-2 font-bold">Height:</span>
                      <span className="font-light">{height}cm</span>
                    </p>
                    <p>
                      <span className="mr-2 font-bold">Abilities:</span>
                      <span className="font-light">{abilities}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="base-stats">
            <Card>
              <CardHeader>
                <CardTitle>Base Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {stats.map((stat: { base_stat: number; name: string }) => (
                  <StatsBar key={stat.name} stat={stat} isDark={isDark} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="evolution">
            <Card>
              <CardHeader>
                <CardTitle>Evolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <section className="container mx-auto my-4">
                  <div className="flex justify-evenly">
                    {evolutionChain.map((pokemon) => (
                      <Link key={pokemon.id} href={`/${pokemon.id}`}>
                        <div className="flex cursor-pointer flex-col gap-2">
                          <Image
                            src={`${IMAGES_URL}${pokemon.id}.png`}
                            alt={pokemon.name}
                            width="150"
                            height="150"
                            className="opacity-20 brightness-0 transition hover:opacity-100 hover:brightness-100"
                          />

                          <p className="text-center capitalize">
                            {pokemon.name}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="moves">
            <Card>
              <CardHeader>
                <CardTitle>Moves</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

export default Pokemon
