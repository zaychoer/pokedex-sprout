import Image from "next/image"
import Link from "next/link"
import { COLORS } from "@/constants/colors"
import { IMAGES_URL } from "@/constants/urls"

type Props = {
  name: string
  id: number
  types: string[]
}

const PokemonCard: any = async ({ name, id, types }: Props) => {
  return (
    <Link href={`/${id}`}>
      <div
        className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition ease-in-out hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: COLORS[types[1] ?? types[0]] }}
      >
        <div className="flex px-8 py-2">
          <div className="flex flex-col py-8">
            <h3 className="mb-4 text-center text-xl font-extrabold capitalize leading-none text-white">
              {name}
            </h3>
            {types.map((type, i) => (
              <div key={type + i} className="mb-2">
                <div className="inline-block w-auto rounded-full bg-white/25 px-4 py-2 text-xs font-bold capitalize leading-none text-white">
                  {type}
                </div>
              </div>
            ))}
          </div>
          <Image
            src={`${IMAGES_URL}${id}.png`}
            width="200"
            height="200"
            priority={true}
            alt={name}
          />
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
