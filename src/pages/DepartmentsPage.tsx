import { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────
interface Department {
  id: number
  icon: string
  nameAr: string
  nameEn: string
  descAr: string
  descEn: string
  stats: { ar: string[]; en: string[] }
  color: string
}

// ── Data ───────────────────────────────────────────────────────────────────
const departments: Department[] = [
  {
    id: 1,
    icon: '💻',
    nameAr: 'تقنيات الحاسوب',
    nameEn: 'Computer Technologies',
    descAr: 'يُعنى القسم بتأهيل كوادر متخصصة في مجال الحاسوب والبرمجة وتقنية المعلومات وفق أحدث المناهج العلمية والعملية.',
    descEn: 'The department prepares specialized cadres in computer science, programming, and information technology using the latest academic and practical curricula.',
    stats: { ar: ['٤ سنوات', '٢٠٠+ خريج', '١٢ مادة'], en: ['4 Years', '200+ Graduates', '12 Subjects'] },
    color: '#2589c4',
  },
  {
    id: 2,
    icon: '📊',
    nameAr: 'إدارة الأعمال',
    nameEn: 'Business Administration',
    descAr: 'يختص بإعداد كوادر إدارية قادرة على قيادة المؤسسات وتطوير استراتيجياتها وفق المعايير الإدارية الحديثة.',
    descEn: 'Specializes in preparing administrative cadres capable of leading institutions and developing strategies according to modern management standards.',
    stats: { ar: ['٤ سنوات', '٣٠٠+ خريج', '١٤ مادة'], en: ['4 Years', '300+ Graduates', '14 Subjects'] },
    color: '#1a6b9a',
  },
  {
    id: 3,
    icon: '📈',
    nameAr: 'المحاسبة',
    nameEn: 'Accounting',
    descAr: 'يُدرّب الطلاب على أسس المحاسبة المالية والإدارية والتدقيق وفق المعايير الدولية لإعداد محاسبين متميزين.',
    descEn: 'Trains students in financial and managerial accounting and auditing according to international standards to prepare distinguished accountants.',
    stats: { ar: ['٤ سنوات', '٢٥٠+ خريج', '١٣ مادة'], en: ['4 Years', '250+ Graduates', '13 Subjects'] },
    color: '#b8860b',
  },

]

// ── Component ──────────────────────────────────────────────────────────────
export default function DepartmentsPage() {
  const [lang]         = useState<'ar' | 'en'>('ar')
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<Department | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const isAr = lang === 'ar'
  const dir  = isAr ? 'rtl' : 'ltr'

  const filtered = departments.filter((d) => {
    const q = search.toLowerCase()
    return (
      d.nameAr.includes(q) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.descAr.includes(q) ||
      d.descEn.toLowerCase().includes(q)
    )
  })
//thelk sdfsf
  const statsBar = isAr
    ? [{ num: '٦', lbl: 'أقسام أكاديمية' }, { num: '+١٣٠٠', lbl: 'طالب وطالبة' }, { num: '+٨٠', lbl: 'عضو هيئة تدريس' }, { num: '+١٣٠٠', lbl: 'خريج' }]
    : [{ num: '6', lbl: 'Departments' }, { num: '1300+', lbl: 'Students' }, { num: '80+', lbl: 'Faculty Members' }, { num: '1300+', lbl: 'Graduates' }]

  return (
    <div dir={dir} style={{ fontFamily: "'Tajawal', 'Cairo', sans-serif", background: '#fff', color: '#1a2a3a', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(145deg, #e4f1fa 0%, #d0e8f5 60%, #c2e0f2 100%)',
        padding: '52px 36px 44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '64px',
        borderBottom: '3px solid #cde8f7',
      }}>
        <div style={{ maxWidth: 500 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 800, color: '#0056d4', lineHeight: 1.25, marginBottom: 6 }}>
            {isAr ? 'الكلية التقنية الإدارية' : 'Administrative Technical College'}
          </h1>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#b8860b', marginBottom: 12 }}>
            {isAr ? 'ترحب بكم' : 'Welcome'}
          </div>
          <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg, #0056d4, #b8860b)', borderRadius: 2, marginBottom: 14 }} />
          <p style={{ fontSize: '0.95rem', color: '#3d607a', lineHeight: 1.95 }}>
            {isAr
              ? 'نحو تعليم تقني متطور يُعدّ الكوادر الوطنية بأعلى المعايير الأكاديمية والعملية.'
              : 'Towards advanced technical education that prepares national cadres to the highest academic and practical standards.'}
          </p>
        </div>
        <div style={{
          width: 145, height: 145,
          borderRadius: '50%',
          background: '#fff',
          border: '3px solid #cde8f7',
          boxShadow: '0 8px 32px rgba(26,107,154,0.16)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '3.8rem', flexShrink: 0,
        }}>🎓</div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: '#1a6b9a', display: 'flex', justifyContent: 'center' }}>
        {statsBar.map((s, i) => (
          <div key={i} style={{
            flex: 1, maxWidth: 200,
            textAlign: 'center',
            padding: '20px 16px',
            borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#cde8f7', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)' }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* ── Section heading ── */}
      <div style={{ textAlign: 'center', padding: '48px 24px 32px' }}>
        <h2 style={{ fontSize: '1.65rem', fontWeight: 700, color: '#1a2a3a', marginBottom: 10 }}>
          {isAr ? 'الأقسام الأكاديمية' : 'Academic Departments'}
        </h2>
        <div style={{ width: 48, height: 3, background: '#b8860b', borderRadius: 2, margin: '0 auto 12px' }} />
        <p style={{ fontSize: '0.88rem', color: '#5a7a8a', fontWeight: 300 }}>
          {isAr
            ? 'نوفر بيئة تعليمية متطورة تجمع بين النظرية والتطبيق العملي'
            : 'We provide an advanced educational environment combining theory and practical application.'}
        </p>
      </div>

      {/* ── Search ── */}
      <div style={{ maxWidth: 480, margin: '0 auto 36px', padding: '0 24px', position: 'relative' }}>
        <input
          placeholder={isAr ? 'ابحث عن قسم...' : 'Search departments...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            border: '1.5px solid #c4ddf0',
            borderRadius: 30,
            padding: isAr ? '11px 20px 11px 48px' : '11px 48px 11px 20px',
            fontFamily: 'inherit',
            fontSize: '0.93rem',
            color: '#1a2a3a',
            background: '#f4f8fb',
            outline: 'none',
          }}
        />
        <span style={{
          position: 'absolute', top: '50%',
          [isAr ? 'left' : 'right']: 36,
          transform: 'translateY(-50%)',
          color: '#5a7a8a', fontSize: '1.1rem', pointerEvents: 'none',
        }}>🔍</span>
      </div>

      {/* ── Cards grid ── */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 24px 64px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 24px', color: '#5a7a8a', gridColumn: '1 / -1' }}>
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔎</div>
            <p>{isAr ? 'لا توجد نتائج مطابقة' : 'No matching departments found'}</p>
          </div>
        ) : (
          filtered.map((dept) => (
            <div
              key={dept.id}
              onClick={() => setSelected(dept)}
              onMouseEnter={() => setHoveredId(dept.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#fff',
                border: `1px solid ${hoveredId === dept.id ? '#4bafd6' : '#c4ddf0'}`,
                borderRadius: 10,
                boxShadow: hoveredId === dept.id
                  ? '0 8px 32px rgba(26,107,154,0.16)'
                  : '0 2px 12px rgba(26,107,154,0.10)',
                overflow: 'hidden',
                cursor: 'pointer',
                transform: hoveredId === dept.id ? 'translateY(-5px)' : 'translateY(0)',
                transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
              }}
            >
              {/* Color top bar */}
              <div style={{ height: 7, background: dept.color }} />

              <div style={{ padding: '24px 22px 18px' }}>
                {/* Icon + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: dept.color + '18',
                    border: `1.5px solid ${dept.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem', flexShrink: 0,
                  }}>
                    {dept.icon}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a6b9a', lineHeight: 1.3 }}>
                    {isAr ? dept.nameAr : dept.nameEn}
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.855rem', color: '#5a7a8a', lineHeight: 1.85, marginBottom: 18 }}>
                  {isAr ? dept.descAr : dept.descEn}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', borderTop: '1px solid #c4ddf0', margin: '0 -22px', padding: '0 22px' }}>
                  {(isAr ? dept.stats.ar : dept.stats.en).map((s, i) => (
                    <div key={i} style={{
                      flex: 1, textAlign: 'center', padding: '12px 6px',
                      borderLeft: i === 0 ? 'none' : '1px solid #c4ddf0',
                      fontSize: '0.78rem', color: '#5a7a8a',
                    }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#1a6b9a', marginBottom: 1 }}>
                        {s.split(' ')[0]}
                      </strong>
                      {s.split(' ').slice(1).join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Modal ── */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(10,30,50,0.55)',
            zIndex: 200,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 20px 60px rgba(10,30,50,0.3)',
              maxWidth: 540, width: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Modal header */}
            <div style={{
              padding: '22px 26px 18px',
              display: 'flex', alignItems: 'center', gap: 16,
              borderBottom: '1px solid #c4ddf0',
              borderTop: `4px solid ${selected.color}`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: selected.color + '18',
                border: `1.5px solid ${selected.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', flexShrink: 0,
              }}>
                {selected.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a6b9a', marginBottom: 2 }}>
                  {isAr ? selected.nameAr : selected.nameEn}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#5a7a8a' }}>
                  {isAr ? selected.nameEn : selected.nameAr}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  marginInlineStart: 'auto',
                  background: '#f4f8fb',
                  border: '1px solid #c4ddf0',
                  borderRadius: '50%',
                  width: 32, height: 32,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', cursor: 'pointer', color: '#5a7a8a',
                }}
              >✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '22px 26px 26px' }}>
              <p style={{ fontSize: '0.92rem', color: '#3a5a6a', lineHeight: 1.95, marginBottom: 20 }}>
                {isAr ? selected.descAr : selected.descEn}
              </p>

              {/* Modal stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                {(isAr ? selected.stats.ar : selected.stats.en).map((s, i) => (
                  <div key={i} style={{
                    background: '#eaf4fb', border: '1px solid #cde8f7',
                    borderRadius: 8, padding: '14px 10px', textAlign: 'center',
                  }}>
                    <strong style={{ display: 'block', fontSize: '1.05rem', fontWeight: 800, color: '#1a6b9a', marginBottom: 3 }}>
                      {s.split(' ')[0]}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: '#5a7a8a' }}>
                      {s.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                ))}
              </div>

              <button style={{
                width: '100%', padding: 12,
                background: 'linear-gradient(90deg, #1a6b9a, #2589c4)',
                color: '#fff', border: 'none', borderRadius: 6,
                fontFamily: 'inherit', fontSize: '0.97rem', fontWeight: 700,
                cursor: 'pointer',
              }}>
                {isAr ? 'التواصل مع القسم' : 'Contact Department'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
