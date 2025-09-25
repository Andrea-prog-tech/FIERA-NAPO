\"use client\";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LocandinaFiera() {
  const [showHome, setShowHome] = useState(true);
  const [imgError, setImgError] = useState(false);

  const targetMs = Date.parse("2025-11-14T00:00:00+01:00");
  const [diff, setDiff] = useState(() => Math.max(0, targetMs - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, targetMs - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);
  const toParts = (ms) => {
    const s = Math.floor(ms / 1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return { days, hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
  };
  const { days, hours, minutes, seconds } = toParts(diff);

  const eventi = [
    { data: "Venerdì 14 Novembre", titolo: "Mistral for AIL", icona: "🎶" },
    { data: "Sabato 15 Novembre", titolo: "Presentazione libro + inaugurazione mostra di pittura", icona: "📖" },
    { data: "Sabato 15 Novembre", titolo: "Verticale dei vini – Palazzo Balocco", icona: "🍷" },
    { data: "Domenica 16 Novembre", titolo: "Premiazione agricoltori – Giornata fedeltà alla terra", icona: "🌾" },
    { data: "Domenica 16 Novembre", titolo: "Giochi da tavola per ragazzi + gara a scala quaranta", icona: "🎲" },
    { data: "Giovedì 20 Novembre", titolo: "Playadies con Luca Giachino – La nascita della nostra fiera", icona: "🎭" },
    { data: "Venerdì 21 Novembre", titolo: "Sonia De Castelli + Serata fritto misto", icona: "🎤" },
    { data: "Sabato 22 Novembre", titolo: "Napoleone d’oro + Serata bollito", icona: "🏅" },
    { data: "Domenica 23 Novembre", titolo: "Grande Fiera: Orto Slow Food, sbandieratori, gruppi storici, musica itinerante", icona: "🏛️" },
  ];

  const itemVariants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen">
      <div className="w-full bg-[#a54b1a] text-[#f7efdf]">
        <div className="max-w-5xl mx-auto px-4 py-2 text-center font-semibold tracking-wide">
          {diff > 0 ? (
            <span aria-live="polite" aria-label="Countdown alla fiera">
              Mancano <span className="tabular-nums">{days}</span> giorni ·
              <span className="tabular-nums"> {hours}</span>:
              <span className="tabular-nums">{minutes}</span>:
              <span className="tabular-nums">{seconds}</span> alla Fiera (14 novembre)
            </span>
          ) : (
            <span>È il giorno della Fiera! Benvenuti a Narzole</span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showHome && (
          <motion.section
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-[calc(100vh-48px)] overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7efdf] via-[#f3e7d0] to-[#e9dbc0]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            <div className="relative z-10 max-w-6xl w-full px-6 grid md:grid-cols-2 gap-6 items-center">
              <div className="order-2 md:order-1 text-center md:text-left">
                <div className="grid grid-cols-[auto,1fr] items-end gap-3 md:gap-4">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-[#a54b1a] font-bold leading-none text-6xl md:text-7xl"
                  >
                    214°
                  </motion.span>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-5xl md:text-6xl font-bold text-[#a54b1a] uppercase tracking-[0.02em]"
                  >
                    FIERA
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="col-span-2 mt-2 tracking-[0.35em] md:tracking-[0.4em] text-[#a54b1a] uppercase"
                  >
                    NAPOLEONICA
                  </motion.p>
                </div>

                <div className="mt-10">
                  <p className="text-3xl md:text-4xl font-semibold text-[#a54b1a]">NARZOLE</p>
                  <div className="mt-2 space-y-1 text-[#a54b1a]">
                    <p>14 – 15 – 16</p>
                    <p>20 – 21 – 22 – 23</p>
                    <p>Novembre 2025</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowHome(false)}
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#a54b1a] text-[#a54b1a] px-5 py-2.5 hover:bg-[#a54b1a] hover:text-white transition-colors"
                >
                  Scopri la fiera
                </button>
              </div>

              <div className="order-1 md:order-2 relative">
                {!imgError ? (
                  <motion.img
                    src="/napoleon-hero.png"
                    alt="Napoleone a cavallo – entra nelle date"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => setShowHome(false)}
                    onError={() => setImgError(true)}
                    className="w-full max-w-[520px] mx-auto cursor-pointer drop-shadow-[0_15px_40px_rgba(165,75,26,0.35)] hover:drop-shadow-[0_20px_60px_rgba(165,75,26,0.55)] transition-shadow"
                  />
                ) : (
                  <button
                    onClick={() => setShowHome(false)}
                    className="w-full max-w-[520px] aspect-[4/5] mx-auto grid place-items-center rounded-3xl bg-gradient-to-br from-[#f0e3cd] to-[#e4d2b0] text-[#a54b1a] border border-[#a54b1a]/40 shadow-xl"
                    aria-label="Scopri la fiera"
                  >
                    <span className="text-xl">Scopri la fiera</span>
                  </button>
                )}
                <p className="sr-only">Clicca sull'immagine per accedere alla schermata con tutte le date</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {!showHome && (
        <div className="px-6 py-8 bg-gradient-to-b from-[#f7efdf] via-[#f3e7d0] to-[#e9dbc0]">
          <header className="max-w-4xl mx-auto mb-8">
            <div className="relative flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-[#a54b1a]"
              >
                <span className="block text-4xl font-bold leading-tight">Fiera Napoleonica,</span>
                <span className="block text-3xl italic">Narzole</span>
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center text-[#7a4a2a] mt-2"
            >
              Tradizione, gusto e storia
            </motion.p>
          </header>

          <main className="max-w-3xl mx-auto grid gap-4">
            {eventi.map((e, i) => (
              <motion.div
                key={`${e.data}-${i}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group rounded-2xl border border-[#a54b1a]/70 bg-white/40 backdrop-blur p-4 flex items-start gap-4 shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(165,75,26,0.35)]"
              >
                <div className="text-2xl leading-none select-none transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(165,75,26,0.65)]" aria-hidden>
                  {e.icona}
                </div>
                <div className="transition-colors duration-300">
                  <p className="text-sm tracking-wide text-[#a54b1a] font-semibold group-hover:text-[#7a4a2a]">{e.data}</p>
                  <p className="text-[#111827] text-lg group-hover:text-[#7a4a2a]">{e.titolo}</p>
                </div>
              </motion.div>
            ))}
          </main>

          <motion.footer
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-10"
          >
            <p className="text-[#7a4a2a] italic">“Narzole vi aspetta per rivivere storia, gusto e tradizione”</p>
            <button
              onClick={() => setShowHome(true)}
              className="mt-4 inline-flex items-center rounded-full border border-[#a54b1a]/40 px-4 py-2 text-sm text-[#a54b1a] hover:bg-[#a54b1a] hover:text-white"
            >
              Torna alla schermata iniziale
            </button>
          </motion.footer>
        </div>
      )}
    </div>
  );
}
