import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './index.css'

const easeOut = [0.4, 0, 0.2, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

const cardSpring = { type: 'spring', stiffness: 420, damping: 30 }

const contactFieldClass =
  'w-full rounded-xl text-sm text-[#14254a] bg-white/95 ' +
  'border border-[#1a2b5e]/[0.09] shadow-[0_1px_2px_rgba(26,43,94,0.04)] ' +
  'focus:border-[#8cc63f]/80 focus:ring-2 focus:ring-[#8cc63f]/18 focus:outline-none ' +
  'transition-[border-color,box-shadow] duration-200'


const FOAM_HERO = [
  { left: '4%', top: '6%', s: 22, y: [0, -14, 6, -8, 0], x: [0, 8, -5, 4, 0], rot: [0, 5, -3, 4, 0], sc: [1, 1.08, 0.95, 1.05, 1], o: [0.12, 0.28, 0.18, 0.24, 0.12], dur: 15, d: 0 },
  { left: '14%', top: '14%', s: 38, y: [0, -20, 10, -12, 0], x: [0, -10, 12, -6, 0], rot: [0, -4, 6, -2, 0], sc: [1, 1.05, 0.97, 1.06, 1], o: [0.1, 0.24, 0.16, 0.22, 0.1], dur: 18, d: 0.3 },
  { left: '26%', top: '8%', s: 16, y: [0, -18, 4, -10, 0], x: [0, 6, -8, 5, 0], rot: [0, 3, -5, 2, 0], sc: [1, 1.1, 0.92, 1.04, 1], o: [0.14, 0.32, 0.2, 0.28, 0.14], dur: 12, d: 0.8 },
  { left: '38%', top: '18%', s: 48, y: [0, -26, 14, -16, 0], x: [0, 14, -10, 8, 0], rot: [0, -6, 4, -3, 0], sc: [1, 1.06, 0.96, 1.04, 1], o: [0.09, 0.22, 0.14, 0.2, 0.09], dur: 20, d: 0.1 },
  { left: '50%', top: '5%', s: 20, y: [0, -12, 8, -6, 0], x: [0, -7, 9, -4, 0], rot: [0, 4, -4, 3, 0], sc: [1, 1.07, 0.94, 1.05, 1], o: [0.11, 0.26, 0.17, 0.23, 0.11], dur: 14, d: 0.5 },
  { left: '62%', top: '12%', s: 34, y: [0, -22, 12, -14, 0], x: [0, 10, -12, 7, 0], rot: [0, -5, 5, -4, 0], sc: [1, 1.05, 0.97, 1.05, 1], o: [0.1, 0.25, 0.16, 0.21, 0.1], dur: 17, d: 0.2 },
  { left: '74%', top: '7%', s: 18, y: [0, -16, 6, -9, 0], x: [0, -8, 7, -5, 0], rot: [0, 6, -3, 4, 0], sc: [1, 1.09, 0.93, 1.04, 1], o: [0.13, 0.3, 0.19, 0.26, 0.13], dur: 13, d: 0.9 },
  { left: '86%', top: '16%', s: 42, y: [0, -24, 11, -13, 0], x: [0, 12, -9, 6, 0], rot: [0, -4, 5, -3, 0], sc: [1, 1.06, 0.95, 1.05, 1], o: [0.08, 0.2, 0.13, 0.18, 0.08], dur: 19, d: 0.4 },
  { left: '93%', top: '28%', s: 24, y: [0, -18, 9, -11, 0], x: [0, -9, 11, -5, 0], rot: [0, 5, -5, 3, 0], sc: [1, 1.08, 0.94, 1.06, 1], o: [0.12, 0.27, 0.18, 0.24, 0.12], dur: 16, d: 0.15 },
  { left: '8%', top: '32%', s: 30, y: [0, -20, 11, -14, 0], x: [0, 11, -8, 7, 0], rot: [0, -5, 4, -4, 0], sc: [1, 1.05, 0.96, 1.04, 1], o: [0.1, 0.23, 0.15, 0.2, 0.1], dur: 17.5, d: 0.6 },
  { left: '22%', top: '42%', s: 52, y: [0, -28, 16, -18, 0], x: [0, -14, 10, -8, 0], rot: [0, 6, -4, 5, 0], sc: [1, 1.04, 0.97, 1.05, 1], o: [0.09, 0.21, 0.14, 0.19, 0.09], dur: 21, d: 0 },
  { left: '40%', top: '38%', s: 18, y: [0, -15, 7, -9, 0], x: [0, 7, -9, 5, 0], rot: [0, -3, 5, -2, 0], sc: [1, 1.1, 0.92, 1.05, 1], o: [0.13, 0.29, 0.19, 0.25, 0.13], dur: 14, d: 1.1 },
  { left: '55%', top: '45%', s: 36, y: [0, -22, 13, -15, 0], x: [0, 13, -11, 8, 0], rot: [0, -5, 6, -3, 0], sc: [1, 1.06, 0.95, 1.05, 1], o: [0.1, 0.24, 0.16, 0.22, 0.1], dur: 18, d: 0.35 },
  { left: '70%', top: '36%', s: 20, y: [0, -17, 8, -10, 0], x: [0, -8, 10, -6, 0], rot: [0, 4, -5, 3, 0], sc: [1, 1.07, 0.94, 1.04, 1], o: [0.12, 0.26, 0.17, 0.23, 0.12], dur: 15, d: 0.75 },
  { left: '82%', top: '44%', s: 44, y: [0, -25, 14, -16, 0], x: [0, 11, -12, 7, 0], rot: [0, 5, -4, 4, 0], sc: [1, 1.05, 0.96, 1.04, 1], o: [0.08, 0.19, 0.12, 0.17, 0.08], dur: 20, d: 0.25 },
  { left: '12%', top: '58%', s: 26, y: [0, -19, 10, -12, 0], x: [0, 9, -7, 6, 0], rot: [0, -4, 5, -3, 0], sc: [1, 1.06, 0.95, 1.05, 1], o: [0.11, 0.25, 0.17, 0.22, 0.11], dur: 16, d: 0.5 },
  { left: '30%', top: '62%', s: 14, y: [0, -14, 6, -8, 0], x: [0, -6, 8, -4, 0], rot: [0, 5, -3, 3, 0], sc: [1, 1.09, 0.93, 1.04, 1], o: [0.14, 0.31, 0.2, 0.27, 0.14], dur: 11, d: 0.2 },
  { left: '48%', top: '68%', s: 40, y: [0, -24, 15, -17, 0], x: [0, -12, 11, -7, 0], rot: [0, 6, -5, 4, 0], sc: [1, 1.05, 0.97, 1.05, 1], o: [0.09, 0.22, 0.14, 0.2, 0.09], dur: 19, d: 0.85 },
  { left: '64%', top: '58%', s: 22, y: [0, -18, 9, -11, 0], x: [0, 8, -10, 6, 0], rot: [0, -5, 4, -3, 0], sc: [1, 1.08, 0.94, 1.05, 1], o: [0.12, 0.27, 0.18, 0.24, 0.12], dur: 15, d: 0.45 },
  { left: '78%', top: '66%', s: 32, y: [0, -21, 12, -14, 0], x: [0, 10, -9, 7, 0], rot: [0, 4, -6, 3, 0], sc: [1, 1.06, 0.95, 1.04, 1], o: [0.1, 0.23, 0.15, 0.21, 0.1], dur: 17, d: 0.65 },
  { left: '90%', top: '72%', s: 16, y: [0, -16, 7, -9, 0], x: [0, -7, 8, -5, 0], rot: [0, -4, 5, -2, 0], sc: [1, 1.1, 0.92, 1.05, 1], o: [0.13, 0.3, 0.19, 0.26, 0.13], dur: 13, d: 1 },
  { left: '5%', top: '78%', s: 36, y: [0, -22, 13, -15, 0], x: [0, 12, -9, 8, 0], rot: [0, 5, -4, 5, 0], sc: [1, 1.05, 0.96, 1.05, 1], o: [0.1, 0.24, 0.16, 0.21, 0.1], dur: 18, d: 0.55 },
  { left: '24%', top: '86%', s: 20, y: [0, -18, 9, -11, 0], x: [0, -8, 9, -6, 0], rot: [0, -5, 5, -3, 0], sc: [1, 1.07, 0.94, 1.04, 1], o: [0.12, 0.28, 0.18, 0.24, 0.12], dur: 14, d: 0.3 },
  { left: '42%', top: '82%', s: 46, y: [0, -26, 16, -18, 0], x: [0, 14, -11, 9, 0], rot: [0, -6, 5, -4, 0], sc: [1, 1.04, 0.97, 1.05, 1], o: [0.08, 0.2, 0.13, 0.18, 0.08], dur: 20, d: 0.1 },
  { left: '58%', top: '88%', s: 18, y: [0, -15, 8, -9, 0], x: [0, 7, -8, 5, 0], rot: [0, 4, -4, 3, 0], sc: [1, 1.08, 0.93, 1.05, 1], o: [0.14, 0.32, 0.21, 0.28, 0.14], dur: 12, d: 0.95 },
  { left: '72%', top: '80%', s: 28, y: [0, -20, 11, -13, 0], x: [0, -10, 11, -7, 0], rot: [0, 5, -5, 4, 0], sc: [1, 1.06, 0.95, 1.04, 1], o: [0.11, 0.25, 0.17, 0.22, 0.11], dur: 16, d: 0.4 },
  { left: '88%', top: '90%', s: 12, y: [0, -12, 5, -7, 0], x: [0, 5, -6, 4, 0], rot: [0, -3, 4, -2, 0], sc: [1, 1.1, 0.91, 1.04, 1], o: [0.15, 0.34, 0.22, 0.3, 0.15], dur: 10, d: 0.7 },
]

const FOAM_LIGHT = [
  { left: '6%', top: '18%', s: 22, y: -20, x: 5, dur: 14, d: 0, o: [0.28, 0.48, 0.36, 0.28] },
  { left: '88%', top: '22%', s: 18, y: -18, x: -4, dur: 12, d: 0.4, o: [0.3, 0.5, 0.38, 0.3] },
  { left: '42%', top: '12%', s: 14, y: -14, x: 3, dur: 11, d: 0.2, o: [0.26, 0.44, 0.34, 0.26] },
  { left: '4%', top: '72%', s: 40, y: -28, x: 6, dur: 13, d: 0, o: [0.35, 0.55, 0.45, 0.35] },
  { left: '18%', top: '85%', s: 18, y: -36, x: -5, dur: 10, d: 0.5, o: [0.3, 0.5, 0.4, 0.3] },
  { left: '35%', top: '68%', s: 28, y: -30, x: 8, dur: 12, d: 0.2, o: [0.32, 0.52, 0.42, 0.32] },
  { left: '52%', top: '80%', s: 22, y: -40, x: -7, dur: 11, d: 0.8, o: [0.28, 0.48, 0.38, 0.28] },
  { left: '70%', top: '75%', s: 34, y: -32, x: 5, dur: 14, d: 0.3, o: [0.3, 0.5, 0.4, 0.3] },
  { left: '86%', top: '88%', s: 16, y: -44, x: -4, dur: 9, d: 0.6, o: [0.34, 0.54, 0.44, 0.34] },
  { left: '10%', top: '58%', s: 14, y: -24, x: 4, dur: 15, d: 1, o: [0.25, 0.42, 0.34, 0.25] },
  { left: '92%', top: '62%', s: 20, y: -26, x: -6, dur: 12.5, d: 0.4, o: [0.3, 0.48, 0.38, 0.3] },
  { left: '24%', top: '38%', s: 16, y: -22, x: -5, dur: 13, d: 0.7, o: [0.27, 0.46, 0.35, 0.27] },
  { left: '74%', top: '44%', s: 20, y: -24, x: 6, dur: 12, d: 0.3, o: [0.29, 0.49, 0.37, 0.29] },
]

const FOAM_TIGHT = [
  { left: '8%', top: '78%', s: 20, y: -18, x: 4, dur: 8, d: 0, o: [0.15, 0.35, 0.25, 0.15] },
  { left: '78%', top: '72%', s: 16, y: -16, x: -3, dur: 7, d: 0.3, o: [0.12, 0.32, 0.22, 0.12] },
  { left: '45%', top: '88%', s: 14, y: -20, x: 5, dur: 9, d: 0.6, o: [0.14, 0.3, 0.22, 0.14] },
  { left: '22%', top: '65%', s: 12, y: -14, x: -2, dur: 6.5, d: 0.2, o: [0.1, 0.28, 0.18, 0.1] },
  { left: '88%', top: '40%', s: 10, y: -12, x: 3, dur: 7.5, d: 0.9, o: [0.12, 0.26, 0.2, 0.12] },
]

const foamEase = [0.37, 0, 0.25, 1]
const foamTimes = [0, 0.24, 0.48, 0.76, 1]

function FoamBubbles({ palette = 'dark' }) {
  const specs =
    palette === 'light' ? FOAM_LIGHT : palette === 'tight' ? FOAM_TIGHT : FOAM_HERO
  const shell =
    palette === 'light'
      ? 'border border-[#1a2b5e]/[0.12] bg-white/75 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.95),inset_-3px_-4px_10px_rgba(26,43,94,0.06)]'
      : palette === 'tight'
        ? 'border border-[#8cc63f]/25 bg-white/[0.07] shadow-[inset_1px_2px_5px_rgba(255,255,255,0.2)]'
        : 'border border-white/20 bg-white/[0.07] shadow-[inset_2px_3px_8px_rgba(255,255,255,0.22),inset_-2px_-6px_12px_rgba(15,26,58,0.25)]'

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden>
      {specs.map((b, i) => {
        const rich = Array.isArray(b.y)
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full will-change-transform ${shell}`}
            style={{ left: b.left, top: b.top, width: b.s, height: b.s }}
            animate={
              rich
                ? {
                  y: b.y,
                  x: b.x,
                  rotate: b.rot,
                  scale: b.sc,
                  opacity: b.o,
                }
                : {
                  y: [0, b.y, b.y * 0.45, 0],
                  x: [0, b.x, -b.x * 0.4, 0],
                  scale: [1, 1.07, 0.96, 1],
                  opacity: b.o,
                }
            }
            transition={
              rich
                ? {
                  duration: b.dur,
                  delay: b.d,
                  repeat: Infinity,
                  ease: foamEase,
                  times: foamTimes,
                }
                : {
                  duration: b.dur,
                  delay: b.d,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
            }
          />
        )
      })}
    </div>
  )
}

const contactLabelTransition = { duration: 0.22, ease: easeOut }

function ContactFloatInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false)
  const float = focused || String(value).length > 0

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${contactFieldClass} h-14 px-4 pt-5 pb-2`}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-4 right-8 pointer-events-none font-semibold uppercase tracking-wide truncate"
        initial={false}
        animate={{
          top: float ? 10 : 22,
          fontSize: float ? 10 : 12,
          color: focused ? '#6fb02a' : float ? '#1a2b5e' : 'rgba(100,116,139,0.82)',
        }}
        transition={contactLabelTransition}
      >
        {label}
      </motion.label>
    </div>
  )
}

function ContactFloatTextarea({ label, name, value, onChange, required, rows = 4 }) {
  const [focused, setFocused] = useState(false)
  const float = focused || String(value).length > 0

  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${contactFieldClass} min-h-[6.25rem] px-4 pt-6 pb-3 resize-y`}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-4 right-4 pointer-events-none font-semibold uppercase tracking-wide"
        initial={false}
        animate={{
          top: float ? 10 : 20,
          fontSize: float ? 10 : 12,
          color: focused ? '#6fb02a' : float ? '#1a2b5e' : 'rgba(100,116,139,0.82)',
        }}
        transition={contactLabelTransition}
      >
        {label}
      </motion.label>
    </div>
  )
}

function ContactFloatSelect({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${contactFieldClass} min-h-[3.5rem] w-full cursor-pointer appearance-none py-2 pl-4 pr-10 pt-7`}
      >
        <option value="queja">Queja</option>
        <option value="reclamo">Reclamo</option>
        <option value="sugerencia">Sugerencia</option>
        <option value="felicitacion">Felicitación</option>
        <option value="otro">Otro</option>
      </select>
      <motion.label
        htmlFor={name}
        className="absolute left-4 top-2.5 pointer-events-none origin-left font-semibold uppercase tracking-[0.12em]"
        initial={false}
        animate={{
          fontSize: focused ? 11 : 10,
          color: focused ? '#6fb02a' : 'rgba(71,85,105,0.88)',
          y: focused ? -1 : 0,
        }}
        transition={contactLabelTransition}
      >
        {label}
      </motion.label>
      <span
        className="pointer-events-none absolute right-3.5 bottom-3 text-[#1a2b5e]/35 text-lg leading-none"
        aria-hidden
      >
        ▾
      </span>
    </div>
  )
}

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Instrucciones', href: '#instrucciones' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

const INSTRUCCIONES = [
  {
    num: '01',
    title: 'Inserta las monedas',
    desc: 'Introduce las monedas en la ranura habilitada. Cada servicio cuesta $1.500 pesos.',
    icon: '🪙',
  },
  {
    num: '02',
    title: 'Ubica tu vehículo',
    desc: 'Posiciona correctamente tu vehículo frente a la salida de agua para un lavado uniforme.',
    icon: '🚗',
  },
  {
    num: '03',
    title: 'Aplica el agua',
    desc: 'El agua saldrá automáticamente. Enjuaga todo el vehículo de manera pareja.',
    icon: '💧',
  },
  {
    num: '04',
    title: 'Solicita espuma',
    desc: 'Si necesitas espuma, presiona el botón. ¡Dale el toque final a tu lavado!',
    icon: '🫧',
  },
]

const FAQ_DATA = [
  {
    q: '¿Cuánto cuesta el servicio?',
    a: 'Cada servicio de autolavado cuesta $1.500 pesos. Puedes insertar varias monedas para extender el tiempo de lavado.',
  },
  {
    q: '¿Qué tipo de monedas acepta la máquina?',
    a: 'La máquina acepta monedas de $500 y $1.000 pesos colombianos.',
  },
  {
    q: '¿La espuma está incluida en el servicio?',
    a: 'La espuma es opcional. Después de aplicar agua, presiona el botón dedicado si la necesitas.',
  },
  {
    q: '¿Qué hago si la máquina no funciona correctamente?',
    a: 'Usa nuestro formulario de contacto o escríbenos directamente. Atendemos tu caso de inmediato y te buscamos una solución.',
  },
  {
    q: '¿Cuál es el horario de atención?',
    a: 'Las máquinas LavooMax funcionan de forma autónoma todos los días. Para soporte humano, atendemos en horario de oficina.',
  },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById('inicio')
      if (!hero) return
      const { bottom } = hero.getBoundingClientRect()
      setPastHero(bottom <= 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-[#1a2b5e] transition-shadow duration-300 ease-out ${pastHero ? 'shadow-lg' : 'shadow-none'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="text-white font-black text-2xl tracking-wide">
            LAVOO<span className="text-[#8cc63f]">MAX</span>
          </span>
        </a>

        <ul className="hidden md:flex gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/75 hover:text-[#8cc63f] font-semibold text-sm transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-white text-2xl leading-none"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="md:hidden overflow-hidden bg-[#0f1a3a]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 pb-4 pt-1">
              {NAV_LINKS.map((l, idx) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.25, ease: easeOut }}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-white/80 hover:text-[#8cc63f] font-semibold text-sm border-b border-white/10 last:border-0"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="bg-[#1a2b5e] text-white py-20 px-4 relative overflow-hidden min-h-[480px]"
    >
      <FoamBubbles palette="dark" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="flex-1"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block bg-[#8cc63f] text-[#1a2b5e] font-bold text-xs px-3 py-1 rounded-full mb-4 uppercase tracking-widest"
          >
            Carwash · Autolavado
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black leading-tight mb-4">
            Tu vehículo,<br />
            <span className="text-[#8cc63f]">siempre limpio.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/70 text-lg mb-8 max-w-md leading-relaxed">
            LavooMax es el autolavado automático más fácil y rápido. Solo inserta monedas y comienza a lavar.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <motion.a
              href="#instrucciones"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#8cc63f] hover:bg-[#a8d94a] text-[#1a2b5e] font-bold px-6 py-3 rounded-full transition-colors shadow-lg text-sm"
            >
              Ver instrucciones
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-white/30 hover:border-[#8cc63f] text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
            >
              Contáctanos
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 w-full max-w-xs"
        >
          {[
            { value: '24/7', label: 'Disponible' },
            { value: '$1.500', label: 'Por servicio' },
            { value: '100%', label: 'Automático' },
            { value: '⚡', label: 'Rápido y fácil' },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: cardSpring }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl p-5 text-center bg-white/[0.14] backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.12)]"
            >
              <p className="text-[#8cc63f] text-2xl font-black">{s.value}</p>
              <p className="text-white/88 text-xs mt-1 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Nosotros ─────────────────────────────────────────────────────────────────
function Nosotros() {
  return (
    <section id="nosotros" className="py-16 px-4 bg-white relative overflow-hidden">
      <FoamBubbles palette="light" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Quiénes somos</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2b5e] mt-2">
            ¿Qué es LavooMax?
          </h2>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: '🚿',
              title: 'Autolavado automático',
              desc: 'Máquinas de alta presión que limpian tu vehículo en minutos, sin necesidad de personal.',
            },
            {
              icon: '💰',
              title: 'Precio justo',
              desc: 'Paga solo lo que usas. Cada servicio arranca desde $1.500, sin cobros ocultos ni sorpresas.',
            },
            {
              icon: '📍',
              title: 'Fácil de usar',
              desc: 'Diseñado para que cualquier persona pueda usarlo sin ayuda. Rápido, limpio y eficiente.',
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -6, transition: cardSpring }}
              className="rounded-2xl p-6 bg-white/55 backdrop-blur-2xl border border-white/90 shadow-[0_8px_40px_rgba(26,43,94,0.1),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-[#1a2b5e]/[0.08]"
            >
              <motion.div
                className="text-4xl mb-3 inline-block"
                whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
                transition={cardSpring}
              >
                {c.icon}
              </motion.div>
              <h3 className="text-[#1a2b5e] font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Instrucciones ────────────────────────────────────────────────────────────
function Instrucciones() {
  return (
    <section id="instrucciones" className="py-16 px-4 bg-[#f0f4ff] relative overflow-hidden">
      <FoamBubbles palette="light" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Paso a paso</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2b5e] mt-2">
            Instrucciones de lavado
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            Sigue estos sencillos pasos para un lavado perfecto.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {INSTRUCCIONES.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              whileHover={{ y: -5, transition: cardSpring }}
              className="rounded-2xl p-6 relative overflow-hidden bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_10px_40px_rgba(26,43,94,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#1a2b5e]/[0.06]"
            >
              <div className="absolute top-2 right-3 text-[#1a2b5e]/[0.07] text-7xl font-black select-none leading-none">
                {step.num}
              </div>
              <motion.div
                className="text-4xl mb-4 inline-block"
                whileHover={{ scale: 1.06 }}
                transition={cardSpring}
              >
                {step.icon}
              </motion.div>
              <div className="inline-block bg-[#8cc63f] text-white text-xs font-bold px-2 py-0.5 rounded mb-2 shadow-sm">
                Paso {step.num}
              </div>
              <h3 className="text-[#1a2b5e] font-bold text-base mb-2">{step.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="mt-8 rounded-2xl p-5 flex gap-4 items-start bg-[#1a2b5e] border border-white/15 shadow-lg shadow-[#1a2b5e]/30"
          role="note"
        >
          <span
            className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2d4a8f] text-white text-sm font-bold leading-none ring-1 ring-white/20"
            aria-hidden
          >
            i
          </span>
          <p className="text-sm leading-relaxed text-white">
            <strong className="text-[#8cc63f] font-bold">Nota:</strong>{' '}
            El agua siempre saldrá al insertar la moneda.
            Si necesitas espuma, recuerda presionar el botón correspondiente. El servicio básico no incluye espuma de manera automática.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="faq" className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Dudas frecuentes</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2b5e] mt-2">
            Preguntas frecuentes
          </h2>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20px' }}
          className="space-y-3"
        >
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/90 shadow-[0_6px_28px_rgba(26,43,94,0.08)] ring-1 ring-[#1a2b5e]/[0.07]"
              >
                <button
                  type="button"
                  className="w-full text-left px-5 py-4 flex justify-between items-center gap-3 bg-white/40 hover:bg-white/70 transition-colors"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-[#1a2b5e] text-sm pr-2">{item.q}</span>
                  <motion.span
                    className="text-[#8cc63f] text-xl shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8cc63f]/10"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: easeOut }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="overflow-hidden border-t border-[#1a2b5e]/10"
                    >
                      <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed bg-[#eef3ff]/80 backdrop-blur-md">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contacto ─────────────────────────────────────────────────────────────────
function Contacto() {
  const emptyForm = { nombre: '', email: '', tipo: 'queja', mensaje: '' }
  const [form, setForm] = useState(emptyForm)
  const [sent, setSent] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto" className="py-14 md:py-16 px-4 bg-[#f0f4ff] relative overflow-hidden">
      <FoamBubbles palette="light" />
      <div className="max-w-2xl mx-auto relative z-10">

        <div className="text-center mb-8 md:mb-9">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-[0.25em]">
            Escríbenos
          </span>

          <h2 className="text-2xl md:text-3xl font-black text-[#1a2b5e] mt-2">
            Quejas, reclamos y sugerencias
          </h2>

          <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto leading-relaxed">
            Tu opinión nos ayuda a mejorar. Nuestro equipo revisará tu mensaje
            y responderá lo antes posible.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative rounded-2xl overflow-hidden bg-white/75 backdrop-blur-2xl border border-white/90 ring-1 ring-[#1a2b5e]/[0.06] shadow-[0_12px_48px_rgba(26,43,94,0.1)]"
            >
              <div className="relative z-10 px-6 py-9 md:px-10 md:py-10 overflow-hidden">

                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="show"
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <motion.div
                    className="mb-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#8cc63f] shadow-md shadow-[#8cc63f]/25"
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.05 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-9 w-9 text-[#1a2b5e]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <motion.path
                        d="M6 12.5l4 4 8-9"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
                      />
                    </svg>
                  </motion.div>

                  <motion.h3
                    variants={fadeUp}
                    className="text-[#1a2b5e] font-black text-xl md:text-2xl tracking-tight"
                  >
                    ¡Listo, recibimos tu mensaje!
                  </motion.h3>

                  <motion.p
                    variants={fadeUp}
                    className="mt-2 text-gray-600 text-sm max-w-sm leading-relaxed"
                  >
                    Gracias por escribirnos. Nuestro equipo lo revisará y te contactará cuando corresponda.
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    className="mt-6 flex flex-wrap items-center justify-center gap-2"
                  >
                    {['Recibido', 'En revisión', 'Te respondemos'].map((chip, i) => (
                      <motion.span
                        key={chip}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 + i * 0.08, duration: 0.35, ease: easeOut }}
                        className="rounded-full border border-[#8cc63f]/35 bg-[#8cc63f]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#5a8f24]"
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.button
                    type="button"
                    variants={fadeUp}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSent(false)
                      setForm(emptyForm)
                    }}
                    className="mt-8 rounded-full bg-[#8cc63f] px-7 py-2.5 text-sm font-bold text-[#1a2b5e] shadow-md shadow-[#8cc63f]/20 transition-colors hover:bg-[#a8d94a]"
                  >
                    Enviar otro mensaje
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: easeOut }}
              onSubmit={submit}
              className="rounded-2xl p-5 md:p-7 space-y-5 bg-white/70 backdrop-blur-2xl border border-white/90 ring-1 ring-[#1a2b5e]/[0.06] shadow-[0_10px_44px_rgba(26,43,94,0.08)]"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <ContactFloatInput
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handle}
                  required
                  autoComplete="name"
                />
                <ContactFloatInput
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  required
                  autoComplete="email"
                />
              </div>

              <ContactFloatSelect label="Tipo de mensaje" name="tipo" value={form.tipo} onChange={handle} />

              <ContactFloatTextarea
                label="Mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handle}
                required
                rows={4}
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.008 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#8cc63f] hover:bg-[#a8d94a] text-[#1a2b5e] font-black py-3.5 rounded-xl text-sm tracking-widest uppercase transition-colors duration-200 shadow-md shadow-[#8cc63f]/20"
              >
                Enviar mensaje
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#0f1a3a] text-white/40 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
        <p className="font-black text-white/75 text-sm">
          LAVOO<span className="text-[#8cc63f]">MAX</span>
          <span className="font-normal text-white/35 ml-2">Carwash · Autolavado</span>
        </p>
        <p>© {new Date().getFullYear()} LavooMax. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Nosotros />
        <Instrucciones />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </div>
  )
}
