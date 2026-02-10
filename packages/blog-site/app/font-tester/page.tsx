import {
  Instrument_Serif,
  Newsreader,
  IBM_Plex_Serif,
  Source_Serif_4,
  Literata,
  Lora,
} from "next/font/google";

const instrumentSerif = Instrument_Serif({ weight: "400", subsets: ["latin"] });
const newsreader = Newsreader({ weight: ["400", "600"], subsets: ["latin"] });
const ibmPlexSerif = IBM_Plex_Serif({ weight: ["400", "600"], subsets: ["latin"] });
const sourceSerif4 = Source_Serif_4({ weight: ["400", "600"], subsets: ["latin"] });
const literata = Literata({ weight: ["400", "600"], subsets: ["latin"] });
const lora = Lora({ weight: ["400", "600"], subsets: ["latin"] });

const fonts = [
  { name: "Instrument Serif (current)", font: instrumentSerif, isCurrent: true },
  { name: "Newsreader", font: newsreader },
  { name: "IBM Plex Serif", font: ibmPlexSerif },
  { name: "Source Serif 4", font: sourceSerif4 },
  { name: "Literata", font: literata },
  { name: "Lora", font: lora },
];

const h1Text = "Verial — Truth-seeking. Applied.";
const h2Text = "The Architecture of Understanding";
const h3Text = "Systems Thinking for the Modern Engineer";
const bodyText =
  "We build at the intersection of philosophy and engineering — where deep thinking meets precise execution. Every system we design, every framework we develop, reflects a commitment to understanding before acting.";

export default function FontTesterPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-neutral-400">Font Tester</h1>
      <p className="text-neutral-500 mb-12 text-sm">
        Comparing serif candidates for Verial. Each section uses a different font.
      </p>

      {fonts.map(({ name, font, isCurrent }, i) => (
        <section key={name} className={font.className}>
          {i > 0 && <hr className="border-neutral-800 my-12" />}

          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-6 font-sans">
            {name}
            {isCurrent && (
              <span className="ml-2 text-emerald-500">● current</span>
            )}
          </p>

          <h1
            className="mb-4"
            style={{ fontSize: "38px", lineHeight: 1.25, fontWeight: 400 }}
          >
            {h1Text}
          </h1>
          <h2
            className="mb-3 text-neutral-300"
            style={{ fontSize: "30px", lineHeight: 1.3, fontWeight: 400 }}
          >
            {h2Text}
          </h2>
          <h3
            className="mb-4 text-neutral-400"
            style={{ fontSize: "24px", lineHeight: 1.35, fontWeight: 400 }}
          >
            {h3Text}
          </h3>
          <p
            className="text-neutral-400 max-w-2xl"
            style={{ fontSize: "19px", lineHeight: 1.7 }}
          >
            {bodyText}
          </p>

          {/* Show semibold variant if available */}
          {!isCurrent && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-neutral-600 mb-3 font-sans">
                weight 600
              </p>
              <h2
                className="mb-3"
                style={{ fontSize: "30px", lineHeight: 1.3, fontWeight: 600 }}
              >
                {h2Text}
              </h2>
              <p
                className="text-neutral-400 max-w-2xl"
                style={{ fontSize: "19px", lineHeight: 1.7, fontWeight: 600 }}
              >
                {bodyText}
              </p>
            </div>
          )}
        </section>
      ))}

      <hr className="border-neutral-800 my-12" />
      <p className="text-neutral-600 text-xs text-center">
        /font-tester — internal comparison page
      </p>
    </div>
  );
}
