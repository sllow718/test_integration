import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <h1>Pokémon Dictionary</h1>
      <p>Click a Pokémon to view details and like it.</p>
      <div className={styles.grid}>
        {pokemons.map(p => (
          <Link key={p.name} href={`/pokemon/${p.name}`} className={styles.card}>
            <div>
              <img src={p.image} alt={p.name} className={styles.sprite} />
              <h3>{p.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await res.json()
  const pokemons = data.results.map((p, idx) => {
    const id = idx + 1
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    return { name: p.name, url: p.url, image }
  })

  return { props: { pokemons } }
}
