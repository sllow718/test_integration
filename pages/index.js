import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ pokemons }) {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalized) return pokemons
    return pokemons.filter(p => p.name.toLowerCase().includes(normalized))
  }, [pokemons, normalized])

  return (
    <div className={styles.container}>
      <h1>Pokémon Dictionary</h1>
      <p>Click a Pokémon to view details and like it.</p>

      <div className={styles.searchBar}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pokémon by name..."
          className={styles.searchInput}
          aria-label="Search pokemons"
        />
        {query && (
          <button className={styles.clearBtn} onClick={() => setQuery('')}>Clear</button>
        )}
      </div>

      <div className={styles.searchCount}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>

      <div className={styles.grid}>
        {filtered.map(p => (
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
