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
    <div className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.back}>← Back</Link>

        <div className={styles.topRow}>
          <div className={styles.imageWrap}>
            <img src={image} alt={name} className={styles.image} />
          </div>

          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{name}</h1>
              <button className={`${styles.likeButton} ${liked ? styles.liked : ''}`} onClick={toggleLike} aria-pressed={liked}>
                {liked ? '♥ Liked' : '♡ Like'}
              </button>
            </div>

            <div className={styles.types}>
              {pokemon.types.map(t => (
                <span key={t.type.name} className={styles.type}>{t.type.name}</span>
              ))}
            </div>

            <h3 className={styles.statsHeader}>Stats</h3>
            <div className={styles.stats}>
              {pokemon.stats.map(s => {
                const pct = Math.round((s.base_stat / 255) * 100)
                return (
                  <div key={s.stat.name} className={styles.statRow}>
                    <div className={styles.statName}>{s.stat.name}</div>
                    <div className={styles.statBar} aria-hidden>
                      <div className={styles.statFill} style={{ width: `${pct}%` }} />
                    </div>
                    <div className={styles.statValue}>{s.base_stat}</div>
                  </div>
                )
              })}
            </div>
          </div>
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
