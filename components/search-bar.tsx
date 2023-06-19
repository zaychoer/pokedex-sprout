"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const [search, setSearch] = useState<string>("")
  const [listPokemon, setListPokemon] = useState([])
  const [errorSearch, setErrorSearch] = useState<boolean>(false)
  const router = useRouter()

  async function fetchApi() {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    )
    const data = await res.json()
    const arrayName = data.results.map((item: any) => item.name)
    setListPokemon(arrayName)
  }

  useEffect(() => {
    fetchApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // @ts-ignore
    if (listPokemon.includes(search) || Number(search) > 0) {
      router.push(`/${search}`)
      setErrorSearch(false)
    } else {
      setErrorSearch(true)
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleSearch}>
      <div className="flex items-center">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by name or id pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <Button>Search</Button>
        </div>
      </div>
      {errorSearch ? (
        <p className="mt-1 flex items-center justify-start text-xs text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          Name or ID Pokémon not found
        </p>
      ) : (
        <></>
      )}
    </form>
  )
}

export default SearchBar
