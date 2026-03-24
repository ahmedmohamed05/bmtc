import { Link } from 'react-router-dom'
import { FaEye, FaBook } from 'react-icons/fa'
import type { BookSafe } from '../api/library'

export default function BookCard({ item }: { item: BookSafe }) {
  const departmentName = item.department?.name_ar || item.department?.name
  const metadata = [
    item.print_date ? `سنة الطباعة ${item.print_date}` : null,
    item.book_rank ? `الترتيب ${item.book_rank}` : null,
    item.row_number ? `الرف ${item.row_number}` : null,
  ].filter(Boolean) as string[]

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
          paddingTop: '135%',
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
        {departmentName && (
          <div
            style={{
              alignSelf: 'flex-start',
              marginBottom: '0.75rem',
              padding: '0.2rem 0.65rem',
              borderRadius: 999,
              background: 'rgba(116, 195, 226, 0.16)',
              color: 'var(--blue-dark)',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}
          >
            {departmentName}
          </div>
        )}

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

        {item.major && (
          <p
            style={{
              margin: '0 0 0.75rem',
              fontSize: '0.76rem',
              color: 'var(--gold-dark)',
              fontWeight: 700,
            }}
          >
            {item.major}
          </p>
        )}

        {metadata.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              marginBottom: '0.85rem',
            }}
          >
            {metadata.map((value) => (
              <span
                key={value}
                style={{
                  padding: '0.22rem 0.55rem',
                  borderRadius: 999,
                  background: '#f8fafc',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                }}
              >
                {value}
              </span>
            ))}
          </div>
        )}

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
