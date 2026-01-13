import { useEffect, useState } from 'react'
import styles from '../../styles/Pokemon.module.css'
import Link from 'next/link'

export default function Pokemon({ pokemon }) {
  const name = pokemon.name
  const image = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    try {
      const val = localStorage.getItem(`liked-${name}`)
      setLiked(val === '1')
    } catch (e) {}
  }, [name])

  function toggleLike() {
    try {
      const next = !liked
      setLiked(next)
      localStorage.setItem(`liked-${name}`, next ? '1' : '0')
    } catch (e) {}
  }

  return (
    <div className={styles.container}>
      <Link href="/">← Back</Link>
      <h1>{name}</h1>
      <div className={styles.top}>
        <img src={image} alt={name} className={styles.image} />
        <div className={styles.info}>
          <button className={`${styles.likeButton} ${liked ? styles.liked : ''}`} onClick={toggleLike}>
            {liked ? '♥ Liked' : '♡ Like'}
          </button>
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map(s => (
              <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
            ))}
          </ul>
          <h3>Types</h3>
          <ul>
            {pokemon.types.map(t => <li key={t.type.name}>{t.type.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { name } = context.params
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!res.ok) {
    return { notFound: true }
  }
  const pokemon = await res.json()
  return { props: { pokemon } }
}
