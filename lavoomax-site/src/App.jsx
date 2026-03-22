import { useState } from 'react'
import './index.css'

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

  return (
    <nav className="bg-[#1a2b5e] sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <div className="bg-[#8cc63f] rounded-full w-9 h-9 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs tracking-tight">LM</span>
          </div>
          <span className="text-white font-black text-xl tracking-wide">
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

      {open && (
        <div className="md:hidden bg-[#0f1a3a] px-4 pb-4 pt-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-white/80 hover:text-[#8cc63f] font-semibold text-sm border-b border-white/10 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="inicio"
      className="bg-[#1a2b5e] text-white py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#8cc63f]/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8cc63f]/10 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="inline-block bg-[#8cc63f] text-[#1a2b5e] font-bold text-xs px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Carwash · Autolavado
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            Tu vehículo,<br />
            <span className="text-[#8cc63f]">siempre limpio.</span>
          </h1>
          <p className="text-white/65 text-lg mb-8 max-w-md leading-relaxed">
            LavooMax es el autolavado automático más fácil y rápido. Solo inserta monedas y comienza a lavar.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#instrucciones"
              className="bg-[#8cc63f] hover:bg-[#a8d94a] text-[#1a2b5e] font-bold px-6 py-3 rounded-full transition-all shadow-lg text-sm"
            >
              Ver instrucciones
            </a>
            <a
              href="#contacto"
              className="border-2 border-white/30 hover:border-[#8cc63f] text-white font-bold px-6 py-3 rounded-full transition-all text-sm"
            >
              Contáctanos
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          {[
            { value: '24/7', label: 'Disponible' },
            { value: '$1.500', label: 'Por servicio' },
            { value: '100%', label: 'Automático' },
            { value: '⚡', label: 'Rápido y fácil' },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center"
            >
              <p className="text-[#8cc63f] text-2xl font-black">{s.value}</p>
              <p className="text-white/60 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Nosotros ─────────────────────────────────────────────────────────────────
function Nosotros() {
  return (
    <section id="nosotros" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Quiénes somos</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2b5e] mt-2">
            ¿Qué es LavooMax?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
            <div
              key={c.title}
              className="bg-[#f0f4ff] rounded-2xl p-6 border border-[#1a2b5e]/08 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="text-[#1a2b5e] font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Instrucciones ────────────────────────────────────────────────────────────
function Instrucciones() {
  return (
    <section id="instrucciones" className="py-16 px-4 bg-[#f0f4ff]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Paso a paso</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2b5e] mt-2">
            Instrucciones de lavado
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            Sigue estos sencillos pasos para un lavado perfecto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTRUCCIONES.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#1a2b5e]/08 relative overflow-hidden"
            >
              <div className="absolute top-2 right-3 text-[#1a2b5e]/05 text-7xl font-black select-none leading-none">
                {step.num}
              </div>
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="inline-block bg-[#8cc63f] text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                Paso {step.num}
              </div>
              <h3 className="text-[#1a2b5e] font-bold text-base mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#1a2b5e] text-white rounded-2xl p-5 flex gap-4 items-start">
          <span className="text-2xl shrink-0">ℹ️</span>
          <p className="text-sm leading-relaxed text-white/75">
            <strong className="text-[#8cc63f]">Nota:</strong> El agua siempre saldrá al insertar la moneda.
            Si necesitas espuma, recuerda presionar el botón correspondiente. El servicio básico no incluye espuma de manera automática.
          </p>
        </div>
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

        <div className="space-y-3">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="border border-[#1a2b5e]/15 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-[#f0f4ff] transition-colors"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-semibold text-[#1a2b5e] text-sm pr-4">{item.q}</span>
                <span
                  className="text-[#8cc63f] text-xl transition-transform shrink-0"
                  style={{ transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block' }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div className="bg-[#f0f4ff] px-5 py-4 text-sm text-gray-600 leading-relaxed border-t border-[#1a2b5e]/10">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
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
    <section id="contacto" className="py-16 px-4 bg-[#1a2b5e]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#8cc63f] font-bold uppercase text-xs tracking-widest">Escríbenos</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
            Quejas, reclamos y sugerencias
          </h2>
          <p className="text-white/55 mt-2 text-sm">
            Tu opinión nos ayuda a mejorar. Respondemos lo antes posible.
          </p>
        </div>

        {sent ? (
          <div className="bg-[#8cc63f]/15 border border-[#8cc63f]/50 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white font-bold text-xl mb-2">¡Mensaje enviado!</h3>
            <p className="text-white/65 text-sm">Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <button
              onClick={() => { setSent(false); setForm(emptyForm) }}
              className="mt-5 bg-[#8cc63f] hover:bg-[#a8d94a] text-[#1a2b5e] font-bold px-5 py-2 rounded-full text-sm transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white/08 border border-white/10 rounded-2xl p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Nombre
                </label>
                <input
                  required
                  name="nombre"
                  value={form.nombre}
                  onChange={handle}
                  placeholder="Tu nombre"
                  className="w-full bg-white/08 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8cc63f] transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Correo electrónico
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  placeholder="correo@ejemplo.com"
                  className="w-full bg-white/08 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8cc63f] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Tipo de mensaje
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handle}
                className="w-full bg-[#1a2b5e] border border-white/15 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8cc63f] transition-colors"
              >
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
                <option value="sugerencia">Sugerencia</option>
                <option value="felicitacion">Felicitación</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                Mensaje
              </label>
              <textarea
                required
                name="mensaje"
                value={form.mensaje}
                onChange={handle}
                rows={4}
                placeholder="Describe tu situación con el mayor detalle posible..."
                className="w-full bg-white/08 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8cc63f] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8cc63f] hover:bg-[#a8d94a] text-[#1a2b5e] font-black py-3 rounded-xl transition-all shadow-lg text-sm tracking-widest uppercase"
            >
              Enviar mensaje
            </button>
          </form>
        )}
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
