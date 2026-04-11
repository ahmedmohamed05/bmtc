import { useEffect, useState } from 'react'
import { ErrorState, Loader } from '../components/Loader'

interface Student {
  id: number
  name: string
  age: number
  stage: number
  departmentId?: number
  departmentName?: string
  department?: { nameAr?: string; name?: string }
}

interface ApiResponse {
  data: Student[]
  total: number
  limit: number
  offset: number
}

const STAGE_OPTIONS = ['','1','2','3','4']

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const limit = 10
  const offset = (page - 1) * limit
  const pageCount = Math.max(1, Math.ceil(total / limit))

  useEffect(() => {
    const controller = new AbortController()
    const loadStudents = async () => {
      setLoading(true)
      setError(null)

      let url = '/api/students?limit=' + limit + '&offset=' + offset
      if (searchQuery.trim().length > 0) {
        url = '/api/students/search?name=' + encodeURIComponent(searchQuery.trim()) + '&limit=' + limit + '&offset=' + offset
      } else if (stageFilter) {
        url = '/api/students/stage?stage=' + stageFilter + '&limit=' + limit + '&offset=' + offset
      }

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('تعذّر تحميل البيانات')
        }
        const data: ApiResponse = await response.json()
        setStudents(data.data || [])
        setTotal(typeof data.total === 'number' ? data.total : data.data.length)
      } catch (err) {
        if ((err as any).name !== 'AbortError') {
          setError('تعذّر تحميل الطلاب. حاول مرة أخرى.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadStudents()

    return () => controller.abort()
  }, [offset, searchQuery, stageFilter, reloadKey])

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchQuery(searchValue)
    setPage(1)
  }

  const handleStageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStageFilter(event.target.value)
    setPage(1)
  }

  const departmentText = (student: Student) => {
    return (
      student.department?.nameAr ||
      student.department?.name ||
      student.departmentName ||
      (student.departmentId ? String(student.departmentId) : 'غير متوفر')
    )
  }

  return (
    <main style={{ flex: 1, background: 'var(--blue-faint)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fcff 0%, #e0f2fe 100%)',
            borderRadius: 18,
            padding: '2.5rem 2rem',
            marginBottom: '1.75rem',
            boxShadow: '0 18px 48px rgba(31, 107, 155, 0.08)',
          }}>
          <div style={{ textAlign: 'right' }}>
            <h1
              style={{
                fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--blue-dark)',
                margin: 0,
              }}>
              الطلاب
            </h1>
            <div
              style={{
                width: 80,
                height: 4,
                background: 'linear-gradient(90deg, var(--blue), var(--gold))',
                borderRadius: 2,
                marginTop: 12,
                marginBottom: 14,
              }}
            />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 700 }}>
              تصفح قائمة الطلاب، وابحث عن اسم الطالب، وفلتر القائمة حسب المرحلة التعليمية.
            </p>
          </div>
        </div>

        <section
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: '1.75rem',
            boxShadow: '0 12px 32px rgba(16, 79, 129, 0.08)',
          }}>
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'end',
              marginBottom: '1.5rem',
            }}>
            <div>
              <label
                htmlFor='student-search'
                style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                بحث بالاسم
              </label>
              <input
                id='student-search'
                type='search'
                dir='rtl'
                placeholder='اكتب اسم الطالب'
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                style={{
                  width: '100%',
                  border: '1.5px solid var(--border)',
                  borderRadius: 12,
                  padding: '0.95rem 1rem',
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#f8fbff',
                }}
              />
            </div>

            <button
              type='submit'
              style={{
                padding: '0.95rem 1.4rem',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, var(--blue), var(--blue-dark))',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.95rem',
              }}>
              بحث
            </button>
          </form>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
            <div style={{ minWidth: 220, flex: 1, maxWidth: 360 }}>
              <label
                htmlFor='stage-select'
                style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: 'var(--text)' }}>
                اختر المرحلة
              </label>
              <select
                id='stage-select'
                value={stageFilter}
                onChange={handleStageChange}
                style={{
                  width: '100%',
                  border: '1.5px solid var(--border)',
                  borderRadius: 12,
                  padding: '0.95rem 1rem',
                  fontSize: '0.95rem',
                  background: '#f8fbff',
                  cursor: 'pointer',
                }}>
                <option value=''>الكل</option>
                {STAGE_OPTIONS.filter(Boolean).map((stage) => (
                  <option key={stage} value={stage}>
                    المرحلة {stage}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'right', minWidth: 180 }}>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-muted)' }}>
                إجمالي الطلاب: {total}
              </p>
              <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {searchQuery && `بحث عن: ${searchQuery}`}
                {stageFilter && (!searchQuery ? `المرحلة: ${stageFilter}` : '')}
              </p>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 660 }}>
              <thead>
                <tr style={{ background: 'rgba(116, 195, 226, 0.18)' }}>
                  {['الاسم', 'العمر', 'المرحلة', 'القسم'].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'right',
                        padding: '0.95rem 1rem',
                        fontWeight: 700,
                        color: 'var(--blue-dark)',
                        fontSize: '0.95rem',
                        borderBottom: '1px solid var(--border)',
                      }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '2.5rem', textAlign: 'center' }}>
                      <Loader />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '2.5rem' }}>
                      <ErrorState
                        message={error}
                        onRetry={() => setReloadKey((prev) => prev + 1)}
                      />
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                      لا يوجد طلاب لعرضهم حالياً.
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr
                      key={student.id}
                      style={{
                        background: index % 2 === 0 ? '#ffffff' : '#f8fbff',
                        transition: 'background 0.2s',
                      }}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                        {student.name}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                        {student.age}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                        {student.stage}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>
                        {departmentText(student)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '1.75rem',
            }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              عرض {Math.min(total, limit)} من {total} طالب
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type='button'
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                style={{
                  padding: '0.85rem 1.2rem',
                  borderRadius: 10,
                  border: '1px solid var(--blue)',
                  background: page === 1 ? '#eef7fd' : '#fff',
                  color: 'var(--blue-dark)',
                  cursor: page === 1 || loading ? 'not-allowed' : 'pointer',
                }}>
                السابق
              </button>
              <button
                type='button'
                disabled={page >= pageCount || loading}
                onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                style={{
                  padding: '0.85rem 1.2rem',
                  borderRadius: 10,
                  border: '1px solid var(--blue)',
                  background: page >= pageCount ? '#eef7fd' : 'linear-gradient(135deg, var(--blue), var(--blue-dark))',
                  color: page >= pageCount ? 'var(--blue-dark)' : '#fff',
                  cursor: page >= pageCount || loading ? 'not-allowed' : 'pointer',
                }}>
                التالي
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
