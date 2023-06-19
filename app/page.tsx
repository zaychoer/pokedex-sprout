import { Icons } from "@/components/icons"
import Pokemons from "@/components/pokemons"
import SearchBar from "@/components/search-bar"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mt-10 flex max-w-[980px] flex-col items-start gap-2">
        <div className="flex items-center space-x-2">
          <Icons.logo className="h-8 w-8" />
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Pokédex
          </h1>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          What Pokémon are you looking for?
        </p>
      </div>
      <SearchBar />
      <Pokemons />
    </section>
  )
}
