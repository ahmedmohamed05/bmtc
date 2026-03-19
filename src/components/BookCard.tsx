import { Link } from 'react-router-dom'
import { FaEye, FaBook } from 'react-icons/fa'
import type { BookSafe } from '../api/library'

export default function BookCard({ item }: { item: BookSafe }) {
  return (
    <Link
      to={`/library/${item.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow:
          '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(-6px)'
        el.style.boxShadow =
          '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow =
          '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
      }}
    >
      <div
        style={{
          position: 'relative',
          paddingTop: '100%',
          background: 'var(--blue-faint)',
          overflow: 'hidden',
        }}
      >
        {item.cover_url ? (
          <img
            src={item.cover_url}
            alt={item.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'var(--blue)',
              fontSize: '3rem',
              opacity: 0.25,
            }}
          >
            <FaBook />
          </div>
        )}
      </div>

      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--text)',
            lineHeight: 1.3,
            marginBottom: '0.5rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            margin: 0,
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            marginBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.author}
        </p>

        <p
          style={{
            margin: 0,
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.4,
            marginBottom: '0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            flex: 1,
          }}
        >
          {item.description}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <FaEye style={{ fontSize: '0.7rem' }} />
          <span>{item.views_counter}</span>
        </div>
      </div>
    </Link>
  )
}
