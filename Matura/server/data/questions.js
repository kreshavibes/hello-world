// Baza pitanja za "Eksterna matura - Matematika" trenažer.
// Sadržaj je inspirisan Ispitnim katalogom pitanja za eksternu maturu
// (Ministarstvo za odgoj i obrazovanje Kantona Sarajevo), sa zadacima
// prilagođenim/provjerenim za samostalno digitalno rješavanje.

export const TOPICS = [
  { key: "brojevi", name: "Brojevni izrazi" },
  { key: "uglovi", name: "Geometrijski elementi i uglovi" },
  { key: "stepeni", name: "Stepeni sa prirodnim eksponentom" },
  { key: "funkcije", name: "Polinomi i linearna funkcija" },
  { key: "razlomci", name: "Algebarski razlomci" },
  { key: "jednacine", name: "Linearne jednačine" },
  { key: "nejednacine", name: "Linearne nejednačine" },
  { key: "problemi-algebra", name: 'Algebarski "problemi"' },
  { key: "problemi-geometrija", name: 'Geometrijski "problemi"' },
  { key: "tijela", name: "Geometrijska tijela" },
];

// level: 'basic' (4 boda po ispitu, MC) | 'medium' | 'hard'
// type: 'mc' | 'open'
// points: svako pitanje nosi 1 bod, ispit ukupno 10 bodova

export const QUESTIONS = [
  // ==================== 1. BROJEVNI IZRAZI ====================
  {
    id: "brojevi-b1",
    topic: "brojevi",
    level: "basic",
    type: "mc",
    prompt: "Koja je vrijednost brojevnog izraza $900 - 90 : 10$?",
    options: [
      { key: "a", text: "$0$" },
      { key: "b", text: "$81$" },
      { key: "c", text: "$890$" },
      { key: "d", text: "$891$" },
    ],
    correct: "d",
    hint: "Dijeljenje i množenje uvijek imaju prednost nad sabiranjem i oduzimanjem.",
    explanation:
      "Prvo rješavamo dijeljenje: $90:10=9$. Zatim oduzimamo: $900-9=891$. Redoslijed računskih operacija (množenje/dijeljenje prije sabiranja/oduzimanja) je ključan.",
    analogy:
      "Zamisli da prvo moraš 'raspakovati' dijeljenje kao paket, pa tek onda nastaviti sa glavnim računom — kao što prvo skineš jaknu, pa onda sjedneš za sto.",
  },
  {
    id: "brojevi-b2",
    topic: "brojevi",
    level: "basic",
    type: "mc",
    prompt: "Koji je decimalni zapis za $1\\%$?",
    options: [
      { key: "a", text: "$0{,}01$" },
      { key: "b", text: "$0{,}05$" },
      { key: "c", text: "$0{,}1$" },
      { key: "d", text: "$0{,}2$" },
    ],
    correct: "a",
    hint: "Procenat znači 'od stotinu', pa broj podijeli sa 100.",
    explanation:
      "$1\\% = \\dfrac{1}{100} = 0{,}01$. Svaki procenat se dobije dijeljenjem broja ispred znaka % sa 100 (pomjeranjem decimalnog zareza za dva mjesta lijevo).",
    analogy:
      "Procenat je kao rezanje pite na 100 komada — 1% je samo jedan mrvičak od te pite, zato je broj tako mali: 0,01.",
  },
  {
    id: "brojevi-b3",
    topic: "brojevi",
    level: "basic",
    type: "mc",
    prompt: "Koja je vrijednost izraza $4 + 2 : 2 - 4 : 4$?",
    options: [
      { key: "a", text: "$-\\dfrac{3}{4}$" },
      { key: "b", text: "$-\\dfrac{1}{4}$" },
      { key: "c", text: "$\\dfrac{1}{4}$" },
      { key: "d", text: "$4$" },
    ],
    correct: "d",
    hint: "Riješi oba dijeljenja prvo, pa onda sabiraj/oduzimaj s lijeva na desno.",
    explanation:
      "$2:2=1$ i $4:4=1$. Ostaje $4+1-1=4$. Zapamti: dijeljenja se rješavaju prije sabiranja, ali svako na svom mjestu u izrazu.",
    analogy:
      "To je kao da imaš tri posla za odraditi u nizu — prvo obaviš 'hitne' poslove (dijeljenja), a onda samo dodaš/oduzmeš rezultate.",
  },
  {
    id: "brojevi-m1",
    topic: "brojevi",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj vrijednost izraza $\\left(2{,}5 - 1\\dfrac12\\right) : \\dfrac14$.",
    answer: "4",
    accepted: ["4", "4.0", "4,0"],
    hint: "Prvo riješi zagradu (razlika), pa dijeljenje razlomkom pretvori u množenje njegovim recipročnim brojem.",
    explanation:
      "U zagradi: $2{,}5-1{,}5=1$. Dijeljenje sa $\\frac14$ je isto što i množenje sa $4$: $1:\\frac14 = 1\\cdot4 = 4$.",
    analogy:
      "Dijeliti nečim malim (poput $\\frac14$) uvijek 'uveća' broj — kao kad komad čokolade siječeš na četvrtine, dobiješ 4 puta više komada.",
  },
  {
    id: "brojevi-m2",
    topic: "brojevi",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj vrijednost izraza $(0{,}1+0{,}4)\\cdot\\left(\\dfrac{2}{10}-\\dfrac{3}{5}\\right)$.",
    answer: "-1/5",
    accepted: ["-1/5", "-0.2", "-0,2"],
    hint: "Prevedi sve u iste zapise (decimalne ili razlomke) prije računanja unutar zagrada.",
    explanation:
      "Prva zagrada: $0{,}1+0{,}4=0{,}5$. Druga zagrada: $\\frac{2}{10}-\\frac35 = 0{,}2-0{,}6=-0{,}4$. Proizvod: $0{,}5\\cdot(-0{,}4)=-0{,}2=-\\frac15$.",
    analogy:
      "Množenje pozitivnog i negativnog broja je kao rukovanje dobrim i lošim novčanim tokom — jedan minus u priči i cijeli rezultat postaje negativan.",
  },
  {
    id: "brojevi-m3",
    topic: "brojevi",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj vrijednost izraza $30\\cdot2{,}3-\\left(4\\dfrac35:0{,}46\\right)\\cdot17$.",
    answer: "-101",
    accepted: ["-101"],
    hint: "Pretvori $4\\frac35$ u decimalni broj (4,6) prije dijeljenja sa 0,46.",
    explanation:
      "$30\\cdot2{,}3=69$. $4{,}6:0{,}46=10$, pa $10\\cdot17=170$. Konačno: $69-170=-101$.",
    analogy:
      "Kad podijeliš broj brojem koji je tačno 10 puta manji od njega, rezultat je uvijek 10 — kao kad 4,6 metara užeta siječeš na komade od 0,46 metara, dobiješ 10 komada.",
  },
  {
    id: "brojevi-m4",
    topic: "brojevi",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj vrijednost izraza $\\sqrt{16\\cdot9} + \\sqrt{2\\dfrac14} - \\sqrt{144}$.",
    answer: "3/2",
    accepted: ["3/2", "1.5", "1,5"],
    hint: "Riješi svaki korijen posebno: $16\\cdot9=144$, a $2\\frac14=\\frac94$.",
    explanation:
      "$\\sqrt{16\\cdot9}=\\sqrt{144}=12$. $\\sqrt{2\\frac14}=\\sqrt{\\frac94}=\\frac32=1{,}5$. Zatim $\\sqrt{144}=12$. Rezultat: $12+1{,}5-12=1{,}5=\\frac32$.",
    analogy:
      "Korijen 'traži broj koji sam sebe pomnožen daje dati broj' — kao potraga za bratom blizancem koji se s tobom pomnoži i daje tačno taj broj ispod korijena.",
  },
  {
    id: "brojevi-h1",
    topic: "brojevi",
    level: "hard",
    type: "open",
    prompt: "Izračunaj vrijednost izraza $\\sqrt8 - 2\\sqrt{50} + 8\\sqrt2$.",
    answer: "0",
    accepted: ["0"],
    hint: "Svaki korijen rastavi tako da izvučeš najveći potpuni kvadrat: $8=4\\cdot2$, $50=25\\cdot2$.",
    explanation:
      "$\\sqrt8=2\\sqrt2$, $\\sqrt{50}=5\\sqrt2$ pa $2\\sqrt{50}=10\\sqrt2$. Izraz postaje $2\\sqrt2-10\\sqrt2+8\\sqrt2=(2-10+8)\\sqrt2=0\\cdot\\sqrt2=0$.",
    analogy:
      "Kad svi korijeni postanu 'iste vrste' (ovdje $\\sqrt2$), možeš ih sabirati/oduzimati kao jabuke — 2 jabuke minus 10 jabuka plus 8 jabuka je nula jabuka.",
  },
  {
    id: "brojevi-h2",
    topic: "brojevi",
    level: "hard",
    type: "open",
    prompt: "Izračunaj vrijednost izraza $3 - 2\\cdot\\left[5-(3-7)^2:8\\right]$.",
    answer: "-3",
    accepted: ["-3"],
    hint: "Rješavaj iznutra prema vani: prvo zagrada $(3-7)$, pa kvadrat, pa dijeljenje.",
    explanation:
      "$(3-7)=-4$, a $(-4)^2=16$. Zatim $16:8=2$. U srednjoj zagradi: $5-2=3$. Konačno: $3-2\\cdot3=3-6=-3$.",
    analogy:
      "Zagrade su kao ruske babuške — moraš otvoriti najmanju (unutrašnju) prije nego dođeš do vanjske.",
  },
  {
    id: "brojevi-h3",
    topic: "brojevi",
    level: "hard",
    type: "open",
    prompt: "Izračunaj vrijednost izraza $(-3)^3 + 2\\cdot\\sqrt{81} - (-2)^4$.",
    answer: "-25",
    accepted: ["-25"],
    hint: "Pazi na znak: neparni stepen negativnog broja je negativan, a parni je pozitivan.",
    explanation:
      "$(-3)^3=-27$ (neparan stepen čuva znak minus). $\\sqrt{81}=9$, pa $2\\cdot9=18$. $(-2)^4=16$ (paran stepen — znak minus 'nestaje'). Rezultat: $-27+18-16=-25$.",
    analogy:
      "Neparan broj minusa u stepenu je kao neparan broj okretaja u dizalu — vratiš se na 'suprotan' kat (negativan rezultat). Paran broj okretaja te vrati na isti (pozitivan) kat.",
  },

  // ==================== 2. UGLOVI ====================
  {
    id: "uglovi-b1",
    topic: "uglovi",
    level: "basic",
    type: "mc",
    prompt:
      "Dat je ugao $\\alpha = 100°$. Koliko stepeni iznosi njegov suplementni ugao?",
    options: [
      { key: "a", text: "$80°$" },
      { key: "b", text: "$120°$" },
      { key: "c", text: "$180°$" },
      { key: "d", text: "$260°$" },
    ],
    correct: "a",
    hint: "Suplementni uglovi se zbrajaju do 180°.",
    explanation: "Suplementni ugao: $180°-100°=80°$.",
    analogy:
      "Suplementni uglovi su kao dva komada koji zajedno prave pravu liniju (poluravan) — 180° je 'puna cijena', a ti tražiš koliko nedostaje do nje.",
  },
  {
    id: "uglovi-b2",
    topic: "uglovi",
    level: "basic",
    type: "mc",
    prompt: "Koliko iznosi vrijednost pravog ugla izraženog u stepenima?",
    options: [
      { key: "a", text: "$45°$" },
      { key: "b", text: "$60°$" },
      { key: "c", text: "$90°$" },
      { key: "d", text: "$180°$" },
    ],
    correct: "c",
    hint: "Pravi ugao je onaj koji vidiš u ćošku kvadrata ili sveske.",
    explanation:
      "Pravi ugao po definiciji iznosi $90°$ — to je tačno četvrtina punog ugla od $360°$.",
    analogy:
      "Ćošak ove stranice ili vrata je pravi ugao — uvijek 90°, kao 'kvadratni' presjek dva pravca.",
  },
  {
    id: "uglovi-b3",
    topic: "uglovi",
    level: "basic",
    type: "mc",
    prompt:
      "Dat je jednakokraki trougao $ABC$. Kolika je mjera ugla $\\gamma$ ako su uglovi $\\alpha=\\beta=70°$?",
    options: [
      { key: "a", text: "$\\gamma=40°$" },
      { key: "b", text: "$\\gamma=70°$" },
      { key: "c", text: "$\\gamma=100°$" },
      { key: "d", text: "$\\gamma=220°$" },
    ],
    correct: "a",
    hint: "Zbir svih unutrašnjih uglova trougla je uvijek 180°.",
    explanation: "$\\gamma = 180° - \\alpha - \\beta = 180° - 70° - 70° = 40°$.",
    analogy:
      "Tri ugla trougla su kao tri komada torte koji zajedno moraju napraviti tačno 180° — kad znaš dva komada, treći se sam nameće.",
  },
  {
    id: "uglovi-m1",
    topic: "uglovi",
    level: "medium",
    type: "open",
    prompt:
      "U trouglu je $\\alpha=115°$, a ugao $\\beta$ je dva puta manji od ugla $\\gamma$ ($\\gamma = 2\\beta$). Izračunaj ugao $\\gamma$ (zaokruži na cijeli stepen).",
    answer: "43",
    accepted: ["43", "43°", "43.33", "43,33"],
    hint: "Prvo iskoristi $\\alpha+\\beta+\\gamma=180°$ da nađeš zbir $\\beta+\\gamma$, pa onda uvjet $\\gamma=2\\beta$.",
    explanation:
      "$\\beta+\\gamma=180°-115°=65°$. Kako je $\\gamma=2\\beta$, imamo $\\beta+2\\beta=65°\\Rightarrow3\\beta=65°\\Rightarrow\\beta\\approx21°40'$, pa $\\gamma\\approx43°20'$ (≈43°).",
    analogy:
      "Kad znaš da je jedan komad dvostruko veći od drugog, cijeli zbir podijeliš na 3 'jednaka' dijela — dvije trećine ide većem, jedna manjem.",
  },
  {
    id: "uglovi-m2",
    topic: "uglovi",
    level: "medium",
    type: "open",
    prompt:
      "Zbir dva vanjska ugla trougla, $\\alpha_1$ i $\\beta_1$, iznosi $254°$. Izračunaj unutrašnji ugao $\\gamma$.",
    answer: "74",
    accepted: ["74", "74°"],
    hint: "Vanjski ugao i njemu susjedni unutrašnji ugao su suplementni (zbir 180°).",
    explanation:
      "$\\alpha_1=180°-\\alpha$ i $\\beta_1=180°-\\beta$, pa $\\alpha_1+\\beta_1=360°-(\\alpha+\\beta)=254°\\Rightarrow\\alpha+\\beta=106°$. Onda $\\gamma=180°-(\\alpha+\\beta)=180°-106°=74°$.",
    analogy:
      "Vanjski ugao je 'sjena' unutrašnjeg — zajedno čine pravu liniju od 180°. Ako znaš koliko iznosi sjena, lako izvučeš original.",
  },
  {
    id: "uglovi-m3",
    topic: "uglovi",
    level: "medium",
    type: "open",
    prompt:
      "U paralelogramu je dat ugao $\\alpha=52°$. Izračunaj ugao $\\beta$ (susjedni ugao).",
    answer: "128",
    accepted: ["128", "128°"],
    hint: "Susjedni uglovi paralelograma su suplementni (zbir 180°), a naspramni su jednaki.",
    explanation:
      "Susjedni uglovi paralelograma zbrajaju se do $180°$: $\\beta=180°-52°=128°$. (Naspramni uglovi bi bili $\\gamma=\\alpha=52°$ i $\\delta=\\beta=128°$.)",
    analogy:
      "Paralelogram je kao 'nakošeni' pravougaonik — susjedni uglovi se uvijek nadopunjuju do 180°, baš kao vrata koja se otvaraju do prave linije.",
  },
  {
    id: "uglovi-m4",
    topic: "uglovi",
    level: "medium",
    type: "open",
    prompt:
      "Centralni ugao pravilnog mnogougla je $36°$. Koliko stranica ima taj mnogougao?",
    answer: "10",
    accepted: ["10"],
    hint: "Centralni ugao dobiješ formulom $\\varphi=\\dfrac{360°}{n}$.",
    explanation:
      "$\\dfrac{360°}{n}=36°\\Rightarrow n=\\dfrac{360°}{36°}=10$. To je pravilan deseterougao.",
    analogy:
      "Zamisli tortu isječenu na jednake komade oko centra — ako je svaki komad 'širok' 36°, moraš podijeliti punih 360° na komade te veličine da vidiš koliko ih ima: 10.",
  },
  {
    id: "uglovi-h1",
    topic: "uglovi",
    level: "hard",
    type: "open",
    prompt:
      "Mnogougao ima 10 puta veći broj dijagonala nego stranica. Koliko stranica ima taj mnogougao?",
    answer: "23",
    accepted: ["23"],
    hint: "Broj dijagonala je $D=\\dfrac{n(n-3)}{2}$. Postavi jednačinu $D=10n$.",
    explanation:
      "$\\dfrac{n(n-3)}{2}=10n$. Kako je $n\\neq0$, podijeli obje strane sa $n$: $\\dfrac{n-3}{2}=10\\Rightarrow n-3=20\\Rightarrow n=23$.",
    analogy:
      "Formula za dijagonale je kao brojanje svih 'rukovanja' među tjemenima minus stranice — kad znaš odnos, pretvoriš geometriju u jednostavnu jednačinu s jednom nepoznatom.",
  },
  {
    id: "uglovi-h2",
    topic: "uglovi",
    level: "hard",
    type: "open",
    prompt:
      "Broj dijagonala mnogougla je pet puta veći od broja stranica. Odredi broj stranica mnogougla.",
    answer: "13",
    accepted: ["13"],
    hint: "Koristi $D=\\dfrac{n(n-3)}{2}=5n$.",
    explanation:
      "$\\dfrac{n(n-3)}{2}=5n\\Rightarrow\\dfrac{n-3}{2}=5\\Rightarrow n-3=10\\Rightarrow n=13$.",
    analogy:
      "Isti trik kao i prije — kad se 'n' pojavljuje na obje strane jednačine, možeš ga (pažljivo) podijeliti i ostati sa jednostavnom linearnom jednačinom.",
  },
  {
    id: "uglovi-h3",
    topic: "uglovi",
    level: "hard",
    type: "open",
    prompt:
      "Broj stranica mnogougla je 4 puta manji od broja dijagonala. Koliko ukupno dijagonala ima taj mnogougao?",
    answer: "44",
    accepted: ["44"],
    hint: "Prvo postavi $n=\\dfrac{D}{4}$, odnosno $D=4n$, pa iskoristi formulu za $D$.",
    explanation:
      "$\\dfrac{n(n-3)}{2}=4n\\Rightarrow\\dfrac{n-3}{2}=4\\Rightarrow n-3=8\\Rightarrow n=11$. Broj dijagonala: $D=4n=4\\cdot11=44$.",
    analogy:
      "Prvo nađeš 'koliko tjemena' ima oblik, pa onda samo uvrstiš taj broj natrag da dobiješ traženi broj dijagonala — kao kad prvo nađeš cijenu jednog artikla, pa je pomnožiš količinom.",
  },

  // ==================== 3. STEPENI ====================
  {
    id: "stepeni-b1",
    topic: "stepeni",
    level: "basic",
    type: "mc",
    prompt: "Koja je vrijednost izraza $\\dfrac{8\\cdot3}{(-2)^3}$?",
    options: [
      { key: "a", text: "$-4$" },
      { key: "b", text: "$-3$" },
      { key: "c", text: "$3$" },
      { key: "d", text: "$4$" },
    ],
    correct: "b",
    hint: "Prvo izračunaj $(-2)^3$, pa tek onda podijeli.",
    explanation:
      "$(-2)^3=-8$. Brojnik: $8\\cdot3=24$. Rezultat: $\\dfrac{24}{-8}=-3$.",
    analogy:
      "Neparni stepen negativnog broja 'nosi' minus sa sobom kroz cijeli izraz — kao pečat koji se ne briše.",
  },
  {
    id: "stepeni-b2",
    topic: "stepeni",
    level: "basic",
    type: "mc",
    prompt: "Koja od sljedećih jednakosti je tačna?",
    options: [
      { key: "a", text: "$(-x^3)^2 = -x^6$" },
      { key: "b", text: "$(-x^3)^2 = -x^5$" },
      { key: "c", text: "$(-x^3)^2 = x^5$" },
      { key: "d", text: "$(-x^3)^2 = x^6$" },
    ],
    correct: "d",
    hint: "Kad je vanjski stepen paran, negativan predznak 'iščezava'.",
    explanation:
      "$(-x^3)^2 = (-1)^2\\cdot(x^3)^2 = 1\\cdot x^6 = x^6$. Paran stepen negativnog broja (ili izraza) je uvijek pozitivan.",
    analogy:
      "Podizanje na paran stepen je kao dva puta okrenuti sliku naopako — vratiš je u originalni (pozitivan) položaj.",
  },
  {
    id: "stepeni-b3",
    topic: "stepeni",
    level: "basic",
    type: "mc",
    prompt:
      "Zadani su brojevi $A=-1^2$, $B=(-1)^2$, $C=1^2$. Šta je od navedenog tačno?",
    options: [
      { key: "a", text: "$A=B$" },
      { key: "b", text: "$C>B$" },
      { key: "c", text: "$B=C$" },
      { key: "d", text: "$B<C$" },
    ],
    correct: "c",
    hint: "Pazi: $-1^2$ znači $-(1^2)$, a $(-1)^2$ znači da se cijeli $-1$ kvadrira.",
    explanation:
      "$A=-1^2=-(1^2)=-1$. $B=(-1)^2=1$. $C=1^2=1$. Dakle $B=C=1$, a $A$ je drugačiji.",
    analogy:
      "Zagrada je kao brava — $(-1)^2$ 'zatvara' minus unutar kvadriranja, dok $-1^2$ ostavlja minus napolju, van uticaja stepena.",
  },
  {
    id: "stepeni-m1",
    topic: "stepeni",
    level: "medium",
    type: "open",
    prompt: "Uprosti izraz $-x^6\\cdot(-x^3)^2 : x^6$, $(x\\neq0)$.",
    answer: "-x^6",
    accepted: ["-x^6", "-x6"],
    hint: "Prvo riješi $(-x^3)^2$ (paran stepen), pa tek onda množi i dijeli stepene sa istom osnovom.",
    explanation:
      "$(-x^3)^2=x^6$. Onda: $-x^6\\cdot x^6 = -x^{12}$. Dijeljenjem sa $x^6$: $-x^{12}:x^6=-x^6$.",
    analogy:
      "Kod množenja/dijeljenja istih osnova samo zbrajaš/oduzimaš eksponente — kao brojanje koraka napred i nazad na istoj traci.",
  },
  {
    id: "stepeni-m2",
    topic: "stepeni",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj $\\left[a^3b^2\\cdot(-a^2)^4\\cdot(-b^3)^2\\right]:a^6b^3$, $(a,b\\neq0)$.",
    answer: "a^5*b^5",
    accepted: ["a^5*b^5", "a^5b^5", "a5b5"],
    hint: "$(-a^2)^4$ i $(-b^3)^2$ imaju paran vanjski stepen, pa minus nestaje.",
    explanation:
      "$(-a^2)^4=a^8$, $(-b^3)^2=b^6$. Brojnik: $a^3b^2\\cdot a^8\\cdot b^6=a^{11}b^8$. Podijeli sa $a^6b^3$: $a^{11-6}b^{8-3}=a^5b^5$.",
    analogy:
      "Zamisli da svako slovo (a i b) 'putuje' svojim odvojenim putem — eksponenti od $a$ se računaju nezavisno od eksponenata od $b$, kao dvije paralelne trake za brojanje.",
  },
  {
    id: "stepeni-m3",
    topic: "stepeni",
    level: "medium",
    type: "open",
    prompt:
      "Izračunaj vrijednost izraza $\\dfrac{3^5\\cdot(3^6)^6}{81^8\\cdot(3^4)^2}$.",
    answer: "3",
    accepted: ["3"],
    hint: "Zapiši $81$ kao $3^4$ da sve svedeš na istu osnovu 3.",
    explanation:
      "Brojnik: $3^5\\cdot3^{36}=3^{41}$. Kako je $81=3^4$, imamo $81^8=3^{32}$, pa je nazivnik $3^{32}\\cdot3^8=3^{40}$. Rezultat: $3^{41-40}=3^1=3$.",
    analogy:
      "Kad različiti brojevi (3 i 81) zapravo pripadaju istoj 'porodici' (obje su stepeni broja 3), prevedi ih na zajednički jezik prije poređenja — kao pretvaranje evra i marki u istu valutu prije zbrajanja.",
  },
  {
    id: "stepeni-m4",
    topic: "stepeni",
    level: "medium",
    type: "open",
    prompt: "Izračunaj $(-1)^2-(-2)^3+\\left[-(-2)^3\\right]^2$.",
    answer: "73",
    accepted: ["73"],
    hint: "Riješi svaki stepen posebno, s lijeva na desno, pazeći na predznake i zagrade.",
    explanation:
      "$(-1)^2=1$. $(-2)^3=-8$. $-(-2)^3=-(-8)=8$, pa $[8]^2=64$. Sve zajedno: $1-(-8)+64=1+8+64=73$.",
    analogy:
      "Ovakav izraz je kao slagalica sa više malih koraka — riješi svaki komadić posebno pa ih na kraju spoji, umjesto da pokušaš sve odjednom.",
  },
  {
    id: "stepeni-h1",
    topic: "stepeni",
    level: "hard",
    type: "open",
    prompt:
      "Uporedi vrijednosti izraza $\\left(\\dfrac14\\right)^6$ i $\\left(\\dfrac18\\right)^4$. Upiši znak koji ih povezuje: $=$, $<$ ili $>$.",
    answer: "=",
    accepted: ["=", "jednaki", "jednako"],
    hint: "Svedi oba broja na osnovu 2: $\\frac14=2^{-2}$, a $\\frac18=2^{-3}$.",
    explanation:
      "$\\left(\\frac14\\right)^6=(2^{-2})^6=2^{-12}$. $\\left(\\frac18\\right)^4=(2^{-3})^4=2^{-12}$. Oba izraza su jednaka $2^{-12}$, dakle jednaki su.",
    analogy:
      "Iako izgledaju različito na prvi pogled, oba broja su samo 'drugo ruho' istog broja $2^{-12}$ — kao dvije osobe u različitim kostimima koje su u suštini isti glumac.",
  },
  {
    id: "stepeni-h2",
    topic: "stepeni",
    level: "hard",
    type: "open",
    prompt:
      "Dat je izraz $\\dfrac{25^{6n}\\cdot5^{2n+5}}{(5^{3n})^3\\cdot25^{2n+2}}$. Uprosti izraz (rezultat zapiši u obliku $5^{...}$).",
    answer: "5^(n+1)",
    accepted: ["5^(n+1)", "5^n+1", "5^{n+1}"],
    hint: "Zapiši $25$ kao $5^2$ svuda, pa sabiraj/oduzimaj eksponente iste osnove.",
    explanation:
      "$25^{6n}=5^{12n}$, pa je brojnik $5^{12n}\\cdot5^{2n+5}=5^{14n+5}$. $(5^{3n})^3=5^{9n}$, a $25^{2n+2}=5^{4n+4}$, pa je nazivnik $5^{9n+4n+4}=5^{13n+4}$. Rezultat: $5^{(14n+5)-(13n+4)}=5^{n+1}$.",
    analogy:
      "Kad sve pretvoriš u istu 'valutu' (osnovu 5), cijeli veliki izraz se sažme na jednostavno sabiranje i oduzimanje eksponenata — kao sređivanje računa kad su svi troškovi u istoj novčanoj jedinici.",
  },
  {
    id: "stepeni-h3",
    topic: "stepeni",
    level: "hard",
    type: "open",
    prompt:
      "Uprosti izraz $\\dfrac{(x^2y^3)^2\\cdot(-2xy^2)^3}{4x^3y^5}$, $(x\\neq0)$.",
    answer: "-2x^4*y^7",
    accepted: ["-2x^4y^7", "-2x^4*y^7", "-2x4y7"],
    hint: "Prvo riješi oba stepena u zagradama u brojniku, pa onda pomnoži i podijeli.",
    explanation:
      "$(x^2y^3)^2=x^4y^6$. $(-2xy^2)^3=-8x^3y^6$. Brojnik: $x^4y^6\\cdot(-8x^3y^6)=-8x^7y^{12}$. Podijeli sa $4x^3y^5$: $\\dfrac{-8}{4}x^{7-3}y^{12-5}=-2x^4y^7$.",
    analogy:
      "Ovo je kao sklapanje LEGO kocki po koracima — prvo sastaviš svaki 'blok' u zagradi, pa ih onda spojiš množenjem i dijeljenjem u finalni oblik.",
  },

  // ==================== 4. POLINOMI I LINEARNA FUNKCIJA ====================
  {
    id: "funkcije-b1",
    topic: "funkcije",
    level: "basic",
    type: "mc",
    prompt: "Ako je $P(x)=x^2+2x+1$, koliko je $P(-1)$?",
    options: [
      { key: "a", text: "$-2$" },
      { key: "b", text: "$0$" },
      { key: "c", text: "$2$" },
      { key: "d", text: "$4$" },
    ],
    correct: "b",
    hint: "Svuda gdje se pojavljuje $x$, uvrsti $-1$.",
    explanation: "$P(-1)=(-1)^2+2(-1)+1=1-2+1=0$.",
    analogy:
      "Uvrštavanje broja u funkciju je kao ubacivanje sastojka u recept — ista formula, samo drugi 'unos', pa čitaš drugačiji 'rezultat na tanjiru'.",
  },
  {
    id: "funkcije-b2",
    topic: "funkcije",
    level: "basic",
    type: "mc",
    prompt: "Koja od sljedećih funkcija je rastuća?",
    options: [
      { key: "a", text: "$y=-3x-2$" },
      { key: "b", text: "$y=1-x$" },
      { key: "c", text: "$y=0{,}5x-2$" },
      { key: "d", text: "$y=2$" },
    ],
    correct: "c",
    hint: "Funkcija $y=kx+n$ je rastuća ako je koeficijent $k$ pozitivan.",
    explanation:
      "Kod $y=0{,}5x-2$ koeficijent uz $x$ je $k=0{,}5>0$, pa je funkcija rastuća. Ostale imaju $k<0$ (opadajuće) ili $k=0$ (konstantna).",
    analogy:
      "Koeficijent $k$ je kao nagib brda — pozitivan $k$ znači da se penješ (rastuća funkcija), negativan da silaziš, a $k=0$ znači ravna, horizontalna staza.",
  },
  {
    id: "funkcije-b3",
    topic: "funkcije",
    level: "basic",
    type: "mc",
    prompt: "Koji broj je nula funkcije $y=2x+4$?",
    options: [
      { key: "a", text: "$-4$" },
      { key: "b", text: "$-2$" },
      { key: "c", text: "$0$" },
      { key: "d", text: "$2$" },
    ],
    correct: "b",
    hint: "Nula funkcije je vrijednost $x$ za koju je $y=0$.",
    explanation: "$2x+4=0\\Rightarrow2x=-4\\Rightarrow x=-2$.",
    analogy:
      "Nula funkcije je tačka gdje prava 'siječe' x-osu — kao mjesto gdje putanja lopte dodirne zemlju.",
  },
  {
    id: "funkcije-m1",
    topic: "funkcije",
    level: "medium",
    type: "open",
    prompt:
      "U funkciji $y=(2m-1)x+3$ odredi parametar $m$ tako da funkcija ima nulu za $x=3$.",
    answer: "0",
    accepted: ["0", "m=0"],
    hint: "Uvrsti $x=3$ i $y=0$ u datu funkciju, pa riješi jednačinu po $m$.",
    explanation:
      "$(2m-1)\\cdot3+3=0\\Rightarrow6m-3+3=0\\Rightarrow6m=0\\Rightarrow m=0$.",
    analogy:
      "Parametar $m$ je kao nepoznati sastojak u receptu — kad znaš tačan 'ukus' (nulu funkcije) koji želiš, možeš izračunati koliko tog sastojka treba dodati.",
  },
  {
    id: "funkcije-m2",
    topic: "funkcije",
    level: "medium",
    type: "open",
    prompt:
      "Odredi koordinate tačke $A$ u kojoj funkcija $y=\\dfrac34x-6$ siječe $x$-osu.",
    answer: "(8,0)",
    accepted: ["(8,0)", "8,0", "a(8,0)", "x=8"],
    hint: "Na $x$-osi je uvijek $y=0$.",
    explanation: "$0=\\dfrac34x-6\\Rightarrow\\dfrac34x=6\\Rightarrow x=8$. Tačka: $A(8,0)$.",
    analogy:
      "Presjek sa x-osom je momenat kad 'visina' (y) padne na nulu — kao trenutak kad lopta baš dotakne pod.",
  },
  {
    id: "funkcije-m3",
    topic: "funkcije",
    level: "medium",
    type: "open",
    prompt:
      "Napiši linearnu funkciju čiji je grafik prava paralelna sa grafikom $y=2x-3$, a ordinatnu osu presijeca u tački $(0,5)$.",
    answer: "y=2x+5",
    accepted: ["y=2x+5", "2x+5"],
    hint: "Paralelne prave imaju isti koeficijent $k$; presjek sa y-osom ti daje $n$.",
    explanation:
      "Paralelnost znači isti $k=2$. Presjek sa y-osom u $(0,5)$ znači $n=5$. Tražena funkcija: $y=2x+5$.",
    analogy:
      "Paralelne prave su kao dvije trake autoputa — isti 'pravac' (nagib), samo pomjerene gore ili dole.",
  },
  {
    id: "funkcije-m4",
    topic: "funkcije",
    level: "medium",
    type: "open",
    prompt:
      "Odredi vrijednost koeficijenta $k$ u linearnoj funkciji $y=(k+3)x+k-6$ ako grafik date funkcije sadrži tačku $A(4,6)$.",
    answer: "0",
    accepted: ["0", "k=0"],
    hint: "Uvrsti $x=4$ i $y=6$ u funkciju, pa riješi po $k$.",
    explanation:
      "$6=(k+3)\\cdot4+k-6\\Rightarrow6=4k+12+k-6\\Rightarrow6=5k+6\\Rightarrow5k=0\\Rightarrow k=0$.",
    analogy:
      "Kad znaš da tačka 'leži' na pravoj, to je kao da imaš potvrđenu adresu — uvrstiš koordinate u jednačinu i riješiš za nepoznati parametar.",
  },
  {
    id: "funkcije-h1",
    topic: "funkcije",
    level: "hard",
    type: "open",
    prompt:
      "Data je funkcija $y=(a-2)x-2a+3$. Odredi vrijednost realnog parametra $a$ ako grafik date funkcije na pozitivnom dijelu ose $Oy$ odsijeca odsječak dužine $5$.",
    answer: "-1",
    accepted: ["-1", "a=-1"],
    hint: "Presjek sa y-osom je tačka $(0,-2a+3)$. Postavi $-2a+3=5$.",
    explanation:
      "Odsječak dužine 5 na pozitivnom dijelu Oy znači da je y-presjek $=5$: $-2a+3=5\\Rightarrow-2a=2\\Rightarrow a=-1$. Funkcija tada glasi $y=-3x+5$.",
    analogy:
      "Odsječak na osi je kao mjesto gdje konopac (prava) 'kači' os — dužina tog komada ti direktno govori koliko iznosi y-presjek.",
  },
  {
    id: "funkcije-h2",
    topic: "funkcije",
    level: "hard",
    type: "open",
    prompt:
      "U jednoj mobilnoj tarifi cijena uspostave poziva je $0{,}20\\,KM$, a svaka započeta minuta razgovora se naplaćuje $0{,}25\\,KM$. Izračunaj cijenu razgovora koji traje $4$ minute.",
    answer: "1.20",
    accepted: ["1.20", "1,20", "1.2", "1,2 km", "1.20 km"],
    hint: "Ukupna cijena $=$ cijena uspostave $+$ (cijena po minuti $\\times$ broj minuta).",
    explanation:
      "Formula: $y=0{,}25x+0{,}20$. Za $x=4$: $y=0{,}25\\cdot4+0{,}20=1+0{,}20=1{,}20\\,KM$.",
    analogy:
      "Ovo je isti princip kao taksi taksimetar — plaćaš fiksni 'start' (uspostava poziva), a onda dodatno za svaku 'jedinicu puta' (minutu razgovora).",
  },
  {
    id: "funkcije-h3",
    topic: "funkcije",
    level: "hard",
    type: "open",
    prompt:
      "Data je funkcija $y=-\\dfrac{a}{4}x+3$. Odredi vrijednost parametra $a$ tako da funkcija prolazi kroz tačku $A(-4,6)$, a zatim izračunaj obim trougla koji grafik te funkcije (za nađeno $a$) gradi sa koordinatnim osama.",
    answer: "12",
    accepted: ["12", "o=12", "a=3, o=12"],
    hint: "Prvo nađi $a$ uvrštavanjem tačke, pa nađi presjeke sa obje ose — dobićeš pravougli trougao.",
    explanation:
      "Uvrštavanjem: $6=-\\frac{a}{4}\\cdot(-4)+3=a+3\\Rightarrow a=3$. Funkcija: $y=-\\frac34x+3$. Presjeci: sa y-osom $(0,3)$, sa x-osom $(4,0)$. Trougao sa temenima $(0,0),(4,0),(0,3)$ ima katete $3$ i $4$, pa je hipotenuza (po Pitagorinoj teoremi) $\\sqrt{3^2+4^2}=5$. Obim $=3+4+5=12$.",
    analogy:
      "Brojevi 3, 4 i 5 su najpoznatiji 'Pitagorin trio' u matematici — kad ih vidiš, odmah znaš da je treća stranica hipotenuza 5, bez dodatnog računanja korijena.",
  },

  // ==================== 5. ALGEBARSKI RAZLOMCI ====================
  {
    id: "razlomci-b1",
    topic: "razlomci",
    level: "basic",
    type: "mc",
    prompt:
      "Koja je vrijednost razlomljene racionalne funkcije $f(x)=\\dfrac{-2x-1}{x+2}$, $(x\\neq-2)$, za $x=1$?",
    options: [
      { key: "a", text: "$-1$" },
      { key: "b", text: "$0$" },
      { key: "c", text: "$\\dfrac13$" },
      { key: "d", text: "$1$" },
    ],
    correct: "a",
    hint: "Uvrsti $x=1$ direktno u brojnik i nazivnik.",
    explanation: "$f(1)=\\dfrac{-2\\cdot1-1}{1+2}=\\dfrac{-3}{3}=-1$.",
    analogy:
      "Razlomljena funkcija je kao mašina — ubaciš broj (x=1), ona ga obradi po svom 'receptu' (formuli) i izbaci rezultat.",
  },
  {
    id: "razlomci-b2",
    topic: "razlomci",
    level: "basic",
    type: "mc",
    prompt:
      "Koji algebarski razlomak je rezultat sabiranja algebarskih razlomaka $\\dfrac{2}{9m}$ i $\\dfrac{5}{9m}$, $(m\\neq0)$?",
    options: [
      { key: "a", text: "$\\dfrac{10}{18m^2}$" },
      { key: "b", text: "$\\dfrac{7}{18m}$" },
      { key: "c", text: "$\\dfrac{7}{9m}$" },
      { key: "d", text: "$\\dfrac{10}{81m^2}$" },
    ],
    correct: "c",
    hint: "Kad su nazivnici isti, samo sabereš brojnike.",
    explanation: "$\\dfrac{2}{9m}+\\dfrac{5}{9m}=\\dfrac{2+5}{9m}=\\dfrac{7}{9m}$.",
    analogy:
      "Isti nazivnik znači da su 'komadi iste veličine' — kao sabiranje 2 osmine pizze i 5 osmina pizze, dobiješ 7 osmina, bez potrebe za zajedničkim nazivnikom.",
  },
  {
    id: "razlomci-b3",
    topic: "razlomci",
    level: "basic",
    type: "mc",
    prompt:
      "Koji izraz je rezultat skraćivanja razlomljenog racionalnog izraza $\\dfrac{5x^4y^2}{45x^5y}$, $(x,y\\neq0)$?",
    options: [
      { key: "a", text: "$\\dfrac{9y}{x}$" },
      { key: "b", text: "$\\dfrac{x}{9y}$" },
      { key: "c", text: "$9xy$" },
      { key: "d", text: "$\\dfrac{y}{9x}$" },
    ],
    correct: "d",
    hint: "Skrati brojeve ($5$ i $45$) i slova ($x^4$ sa $x^5$, $y^2$ sa $y$) posebno.",
    explanation:
      "Brojevi: $\\dfrac{5}{45}=\\dfrac19$. Slovo $x$: $\\dfrac{x^4}{x^5}=\\dfrac1x$. Slovo $y$: $\\dfrac{y^2}{y}=y$. Sve zajedno: $\\dfrac{y}{9x}$.",
    analogy:
      "Skraćivanje razlomka je kao pojednostavljivanje recepta — podijeliš sve sastojke istim brojem da dobiješ manji, ali ekvivalentan recept.",
  },
  {
    id: "razlomci-m1",
    topic: "razlomci",
    level: "medium",
    type: "open",
    prompt:
      "Skrati algebarski razlomak $\\dfrac{(x-1)^2}{x^2-1}$ i odredi pod kojim uslovom je to moguće (rezultat zapiši kao razlomak).",
    answer: "(x-1)/(x+1)",
    accepted: ["(x-1)/(x+1)", "x-1/x+1"],
    hint: "Nazivnik $x^2-1$ rastavi kao razliku kvadrata: $(x-1)(x+1)$.",
    explanation:
      "$x^2-1=(x-1)(x+1)$. Razlomak postaje $\\dfrac{(x-1)^2}{(x-1)(x+1)}=\\dfrac{x-1}{x+1}$, uz uslov $x\\neq\\pm1$ (da nazivnik ne bude nula).",
    analogy:
      "Prepoznavanje 'razlike kvadrata' je kao prepoznavanje poznatog lica u gomili — čim vidiš oblik $a^2-b^2$, znaš da se odmah rastavlja na $(a-b)(a+b)$.",
  },
  {
    id: "razlomci-m2",
    topic: "razlomci",
    level: "medium",
    type: "open",
    prompt:
      "Skrati algebarski razlomak $\\dfrac{x^2-4x+4}{x^2-4}$.",
    answer: "(x-2)/(x+2)",
    accepted: ["(x-2)/(x+2)", "x-2/x+2"],
    hint: "Brojnik je kvadrat razlike $(x-2)^2$, a nazivnik razlika kvadrata.",
    explanation:
      "$x^2-4x+4=(x-2)^2$ i $x^2-4=(x-2)(x+2)$. Razlomak: $\\dfrac{(x-2)^2}{(x-2)(x+2)}=\\dfrac{x-2}{x+2}$, uz uslov $x\\neq\\pm2$.",
    analogy:
      "Prepoznaješ dva 'poznata obrasca' odjednom — kvadrat razlike gore i razliku kvadrata dole — kao da rješavaš slagalicu čiji su komadi standardnih, prepoznatljivih oblika.",
  },
  {
    id: "razlomci-m3",
    topic: "razlomci",
    level: "medium",
    type: "open",
    prompt:
      "Skrati algebarski razlomak $\\dfrac{-2xy-8y}{3x^2-48}$ i odredi pod kojim uslovima je moguće izvršiti skraćivanje.",
    answer: "-2y/(3(x-4))",
    accepted: ["-2y/(3(x-4))", "-2y/(3x-12)"],
    hint: "Izvuci zajednički faktor iz brojnika i nazivnika, pa u nazivniku prepoznaj razliku kvadrata.",
    explanation:
      "Brojnik: $-2y(x+4)$. Nazivnik: $3(x^2-16)=3(x-4)(x+4)$. Razlomak: $\\dfrac{-2y(x+4)}{3(x-4)(x+4)}=\\dfrac{-2y}{3(x-4)}$, uz uslov $x\\neq\\pm4$.",
    analogy:
      "Prvo 'izvučeš' zajednički faktor kao zajednički imenitelj u dogovoru dvije strane, a onda uklanjaš isti faktor iz brojnika i nazivnika — kao poništavanje istog broja na obje strane vage.",
  },
  {
    id: "razlomci-h1",
    topic: "razlomci",
    level: "hard",
    type: "open",
    prompt:
      "Izvrši naznačene operacije: $\\dfrac{5x-5y}{x^2y-9y} : \\dfrac{5x^2-5y^2}{yx-3y}$.",
    answer: "1/((x+3)(x+y))",
    accepted: ["1/((x+3)(x+y))", "1/(x+3)(x+y)"],
    hint: "Rastavi svaki brojnik i nazivnik na faktore, pa dijeljenje razlomcima pretvori u množenje recipročnom vrijednošću.",
    explanation:
      "Prvi razlomak: $\\dfrac{5(x-y)}{y(x^2-9)}=\\dfrac{5(x-y)}{y(x-3)(x+3)}$. Drugi (djelitelj): $\\dfrac{5(x-y)(x+y)}{y(x-3)}$. Dijeljenje = množenje recipročnim: $\\dfrac{5(x-y)}{y(x-3)(x+3)}\\cdot\\dfrac{y(x-3)}{5(x-y)(x+y)}=\\dfrac{1}{(x+3)(x+y)}$, uz uslov $y\\neq0,x\\neq\\pm3,x\\neq\\pm y$.",
    analogy:
      "Dijeljenje razlomcima je kao 'okretanje' drugog razlomka naglavačke i množenje — nakon toga se većina faktora poništi kao da su se međusobno 'pojeli'.",
  },
  {
    id: "razlomci-h2",
    topic: "razlomci",
    level: "hard",
    type: "open",
    prompt:
      "Dat je razlomljeni racionalni izraz $A=\\left(\\dfrac{x}{x-1}-\\dfrac{2}{x^2-1}\\right):\\dfrac{xy+2y}{yx^2-y}$. Odredi vrijednost izraza $A$ ako je $x=\\dfrac23$.",
    answer: "-1/3",
    accepted: ["-1/3", "-0.333", "-0,333"],
    hint: "Prvo pojednostavi cijeli izraz $A$ (dobićeš jednostavan izraz po $x$), pa onda uvrsti $x=\\frac23$.",
    explanation:
      "Sređivanjem izraza dobije se $A=x-1$ (nakon svođenja na zajednički nazivnik i skraćivanja). Za $x=\\dfrac23$: $A=\\dfrac23-1=-\\dfrac13$.",
    analogy:
      "Uvijek je lakše prvo 'počistiti sobu' (pojednostaviti izraz), a tek onda unijeti namještaj (uvrstiti konkretan broj) — mnogo manje šanse za grešku.",
  },
  {
    id: "razlomci-h3",
    topic: "razlomci",
    level: "hard",
    type: "open",
    prompt:
      "Dati su racionalni izrazi $f(x)=\\dfrac{x^2-1}{2x-2}$ i $g(x)=\\dfrac{2x^2-4x+2}{x^3-x}$. Odredi izraz $h(x)=f(x)\\cdot g(x)$ u najjednostavnijem obliku.",
    answer: "(x-1)/x",
    accepted: ["(x-1)/x", "x-1/x"],
    hint: "Rastavi svaki brojnik i nazivnik na faktore prije množenja — mnogo će se toga skratiti.",
    explanation:
      "$f(x)=\\dfrac{(x-1)(x+1)}{2(x-1)}=\\dfrac{x+1}{2}$. $g(x)=\\dfrac{2(x-1)^2}{x(x-1)(x+1)}=\\dfrac{2(x-1)}{x(x+1)}$. Proizvod: $\\dfrac{x+1}{2}\\cdot\\dfrac{2(x-1)}{x(x+1)}=\\dfrac{x-1}{x}$, uz uslov $x\\neq0,x\\neq\\pm1$.",
    analogy:
      "Množenje racionalnih izraza je kao slaganje dvije slagalice čiji se komadi (faktori) tačno uklapaju i poništavaju, ostavljajući samo jednostavan konačan oblik.",
  },

  // ==================== 6. LINEARNE JEDNAČINE ====================
  {
    id: "jednacine-b1",
    topic: "jednacine",
    level: "basic",
    type: "mc",
    prompt: "Koja od sljedećih jednačina ima rješenje $x=-5$?",
    options: [
      { key: "a", text: "$\\dfrac{2x}{5}=-2$" },
      { key: "b", text: "$x-5=0$" },
      { key: "c", text: "$(5-x)^2=x^2$" },
      { key: "d", text: "$5x=25$" },
    ],
    correct: "a",
    hint: "Uvrsti $x=-5$ u svaku jednačinu i provjeri koja 'radi'.",
    explanation:
      "Za a): $\\dfrac{2\\cdot(-5)}{5}=\\dfrac{-10}{5}=-2$ ✓. Ostale daju drugačija rješenja ($x=5$, itd.).",
    analogy:
      "Provjera rješenja uvrštavanjem je kao isprobavanje ključa u bravi — ako otključa (jednakost se poklapa), to je taj ključ.",
  },
  {
    id: "jednacine-b2",
    topic: "jednacine",
    level: "basic",
    type: "mc",
    prompt:
      "Koji od ponuđenih odgovora predstavlja rješenje jednačine $-1+3x=3x+2$?",
    options: [
      { key: "a", text: "$x=0$" },
      { key: "b", text: "$x=3$" },
      { key: "c", text: "jednačina nema rješenja" },
      { key: "d", text: "jednačina ima beskonačno mnogo rješenja" },
    ],
    correct: "c",
    hint: "Pokušaj prebaciti $3x$ na jednu stranu — šta ostaje?",
    explanation:
      "Oduzimanjem $3x$ sa obje strane: $-1=2$, što je netačna tvrdnja ni za jedan $x$. Jednačina nema rješenja.",
    analogy:
      "Kad $x$ nestane a ostane netačna tvrdnja (kao $-1=2$), to je kao tražiti broj koji je istovremeno veći i manji od samog sebe — takav broj ne postoji.",
  },
  {
    id: "jednacine-b3",
    topic: "jednacine",
    level: "basic",
    type: "mc",
    prompt:
      "Koja od sljedećih jednačina je ekvivalentna sa jednačinom $\\dfrac{x}{9}=-\\dfrac12$?",
    options: [
      { key: "a", text: "$-2x=\\dfrac19$" },
      { key: "b", text: "$x=-\\dfrac29$" },
      { key: "c", text: "$x=-\\dfrac92$" },
      { key: "d", text: "$x=-18$" },
    ],
    correct: "c",
    hint: "Pomnoži obje strane sa 9.",
    explanation: "$x=9\\cdot\\left(-\\dfrac12\\right)=-\\dfrac92$.",
    analogy:
      "Rješavanje jednačine je kao raspakivanje poklona — svaki korak (množenje, dijeljenje) 'skida' jedan sloj papira sa $x$, dok ne ostane samo on.",
  },
  {
    id: "jednacine-m1",
    topic: "jednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi jednačinu $3x-3\\{-2+4[-1-(x-3)]\\}=12$.",
    answer: "2",
    accepted: ["2", "x=2"],
    hint: "Rješavaj od najunutrašnje zagrade prema van, korak po korak.",
    explanation:
      "$-1-(x-3)=2-x$. Zatim $4(2-x)=8-4x$. Unutar velike zagrade: $-2+8-4x=6-4x$. Sa vanjskim minusom: $-3(6-4x)=-18+12x$. Jednačina: $3x-18+12x=12\\Rightarrow15x=30\\Rightarrow x=2$.",
    analogy:
      "Ugniježđene zagrade rješavaš kao ljuštenje luka — sloj po sloj, od centra prema vani, dok ne dođeš do čistog rezultata.",
  },
  {
    id: "jednacine-m2",
    topic: "jednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi jednačinu $-3[x-2(x-1)+(2x-1)]=-6-2x$.",
    answer: "3",
    accepted: ["3", "x=3"],
    hint: "Prvo sredi izraz unutar velike zagrade — mnogo članova sa $x$ će se poništiti.",
    explanation:
      "Unutar zagrade: $x-2x+2+2x-1=x+1$. Onda $-3(x+1)=-3x-3$. Jednačina: $-3x-3=-6-2x\\Rightarrow-3x+2x=-6+3\\Rightarrow-x=-3\\Rightarrow x=3$.",
    analogy:
      "Sređivanje izraza prije rješavanja je kao pospremanje stola prije rada — kad su svi 'slični članovi' pospremljeni zajedno, posao postaje jednostavan.",
  },
  {
    id: "jednacine-m3",
    topic: "jednacine",
    level: "medium",
    type: "open",
    prompt:
      "Riješi jednačinu $\\dfrac{2x-1}{6}-\\dfrac{x+1}{9}=1-\\dfrac{3x+4}{12}$.",
    answer: "2",
    accepted: ["2", "x=2"],
    hint: "Pomnoži cijelu jednačinu sa zajedničkim nazivnikom (NZS od 6, 9 i 12 je 36) da se riješiš razlomaka.",
    explanation:
      "Množenjem sa 36: $6(2x-1)-4(x+1)=36-3(3x+4)$. To je $12x-6-4x-4=36-9x-12\\Rightarrow8x-10=24-9x\\Rightarrow17x=34\\Rightarrow x=2$.",
    analogy:
      "Množenje cijele jednačine zajedničkim nazivnikom je kao promjena svih valuta u jednu prije zbrajanja računa — nakon toga nema više 'razlomljenih' brojeva koji kompliciraju posao.",
  },
  {
    id: "jednacine-m4",
    topic: "jednacine",
    level: "medium",
    type: "open",
    prompt:
      "Riješi jednačinu $\\dfrac{4(x+1)}{3}-\\dfrac{3x-1}{4}=\\dfrac{5x+1}{7}$.",
    answer: "11",
    accepted: ["11", "x=11"],
    hint: "NZS brojeva 3, 4 i 7 je 84 — pomnoži cijelu jednačinu sa 84.",
    explanation:
      "Množenjem sa 84: $28\\cdot4(x+1)-21(3x-1)=12(5x+1)$, tj. $112x+112-63x+21=60x+12$. Sredi: $49x+133=60x+12\\Rightarrow121=11x\\Rightarrow x=11$.",
    analogy:
      "Veći zajednički nazivnik ne znači teži zadatak — samo veći broj, isti postupak: pomnožiš, otvoriš zagrade, sredi slične članove.",
  },
  {
    id: "jednacine-h1",
    topic: "jednacine",
    level: "hard",
    type: "open",
    prompt:
      "Riješi jednačinu $\\dfrac12\\left\\{\\dfrac12\\left[\\dfrac14\\left(\\dfrac{3x}{2}-3\\right)-1\\right]-1\\right\\}=0$.",
    answer: "10",
    accepted: ["10", "x=10"],
    hint: "Kreni od vanjske jednakosti sa 0 — to znači da izraz u najvećoj zagradi mora biti jednak 0, pa 'razmotavaj' unatrag.",
    explanation:
      "Cijela lijeva strana $=0$ znači da je izraz u vitičastoj zagradi $=0$: $\\frac12[\\ldots]-1=0\\Rightarrow[\\ldots]=2$. Zatim $\\frac14(\\frac{3x}{2}-3)-1=2\\Rightarrow\\frac14(\\frac{3x}{2}-3)=3\\Rightarrow\\frac{3x}{2}-3=12\\Rightarrow\\frac{3x}{2}=15\\Rightarrow x=10$.",
    analogy:
      "Rješavanje 'unatrag' kroz ugniježđene zagrade je kao odmotavanje klupka vune od kraja prema početku — svaki čvor (zagradu) otpustiš jedan po jedan.",
  },
  {
    id: "jednacine-h2",
    topic: "jednacine",
    level: "hard",
    type: "open",
    prompt:
      "Riješi jednačinu $\\left(1-\\dfrac{x-1}{2}\\right)^2-\\left(1-\\dfrac{x-2}{2}\\right)^2=\\dfrac54$.",
    answer: "6",
    accepted: ["6", "x=6"],
    hint: "Prepoznaj oblik $A^2-B^2=(A-B)(A+B)$ — obje razlike (A-B i A+B) su jednostavnije od kvadrata.",
    explanation:
      "Neka je $A=1-\\frac{x-1}{2}$ i $B=1-\\frac{x-2}{2}$. Tada je $A-B=-\\frac12$ (konstanta), a $A+B=\\frac{7-2x}{2}$. Pa je $A^2-B^2=(A-B)(A+B)=-\\frac12\\cdot\\frac{7-2x}{2}=\\frac{2x-7}{4}$. Iz $\\frac{2x-7}{4}=\\frac54$ slijedi $2x-7=5\\Rightarrow x=6$.",
    analogy:
      "Razlika kvadrata je jedan od najmoćnijih 'prečaca' u algebri — umjesto teškog kvadriranja dva izraza, samo ih pomnožiš zbir i razliku i posao je gotov mnogo brže.",
  },
  {
    id: "jednacine-h3",
    topic: "jednacine",
    level: "hard",
    type: "open",
    prompt:
      "Riješi jednačinu $\\dfrac{(x-1)(x+1)}{3}-\\dfrac{(2x+1)^2}{12}=1\\dfrac14-x$.",
    answer: "5/2",
    accepted: ["5/2", "2.5", "2,5", "x=5/2"],
    hint: "Svedi obje strane na zajednički nazivnik 12, otvori zagrade $(x-1)(x+1)=x^2-1$ i $(2x+1)^2=4x^2+4x+1$.",
    explanation:
      "Lijeva strana na nazivnik 12: $\\dfrac{4(x^2-1)-(4x^2+4x+1)}{12}=\\dfrac{-4x-5}{12}$. Desna strana: $\\dfrac54-x=\\dfrac{5-4x}{4}=\\dfrac{15-12x}{12}$. Jednačina: $-4x-5=15-12x\\Rightarrow8x=20\\Rightarrow x=\\dfrac{5}{2}$.",
    analogy:
      "Kvadrat binoma i razlika kvadrata su tvoji 'alati za brzo otvaranje' — kad ih prepoznaš u zagradama, otvaranje ide mehanički, bez pogađanja.",
  },

  // ==================== 7. LINEARNE NEJEDNAČINE ====================
  {
    id: "nejednacine-b1",
    topic: "nejednacine",
    level: "basic",
    type: "mc",
    prompt: "Koji skup rješenja je rješenje nejednačine $3x-1<2x$?",
    options: [
      { key: "a", text: "$x<-1$" },
      { key: "b", text: "$x<1$" },
      { key: "c", text: "$x>1$" },
      { key: "d", text: "$x<\\dfrac15$" },
    ],
    correct: "b",
    hint: "Prebaci sve članove sa $x$ na jednu stranu.",
    explanation: "$3x-2x<1\\Rightarrow x<1$.",
    analogy:
      "Nejednačina se rješava skoro isto kao jednačina — samo pazi na znak nejednakosti kao na 'kazaljku' koja pokazuje s koje strane su rješenja.",
  },
  {
    id: "nejednacine-b2",
    topic: "nejednacine",
    level: "basic",
    type: "mc",
    prompt: "Koji brojevi $a$ su rješenje nejednačine $4a<-8$?",
    options: [
      { key: "a", text: "$a<-12$" },
      { key: "b", text: "$a<-2$" },
      { key: "c", text: "$a<2$" },
      { key: "d", text: "$a<4$" },
    ],
    correct: "b",
    hint: "Podijeli obje strane sa 4 (pozitivan broj — znak nejednakosti se ne mijenja).",
    explanation: "$a<\\dfrac{-8}{4}=-2$.",
    analogy:
      "Dijeljenje pozitivnim brojem je 'sigurno' — kazaljka nejednakosti gleda i dalje u istom smjeru, kao vaga koja ostaje nakrivljena na istu stranu.",
  },
  {
    id: "nejednacine-b3",
    topic: "nejednacine",
    level: "basic",
    type: "mc",
    prompt: "Za koje vrijednosti $p$ je $6-3p>0$?",
    options: [
      { key: "a", text: "$p<2$" },
      { key: "b", text: "$p>2$" },
      { key: "c", text: "$p<0$" },
      { key: "d", text: "$p<18$" },
    ],
    correct: "a",
    hint: "Pažljivo: kad podijeliš ili pomnožiš sa negativnim brojem, znak nejednakosti se okreće!",
    explanation:
      "$-3p>-6$. Dijeljenjem sa $-3$ (negativan broj!) znak se okreće: $p<2$.",
    analogy:
      "Dijeljenje negativnim brojem je kao gledanje u ogledalo — sve se 'okreće' na suprotnu stranu, uključujući i znak nejednakosti.",
  },
  {
    id: "nejednacine-m1",
    topic: "nejednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi nejednačinu $-x+2\\cdot(x+3)+2\\le-2x+11$.",
    answer: "x<=1",
    accepted: ["x<=1", "x≤1", "x<= 1"],
    hint: "Prvo otvori zagradu na lijevoj strani i sredi slične članove.",
    explanation:
      "Lijeva strana: $-x+2x+6+2=x+8$. Nejednačina: $x+8\\le-2x+11\\Rightarrow3x\\le3\\Rightarrow x\\le1$.",
    analogy:
      "Kao i kod jednačina, prvo 'pospremi' obje strane (otvori zagrade, sredi članove), a onda prebacuj — samo pazi da znak nejednakosti ostane dosljedan.",
  },
  {
    id: "nejednacine-m2",
    topic: "nejednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi nejednačinu $-1-3\\cdot(5x+1)<11$.",
    answer: "x>-1",
    accepted: ["x>-1"],
    hint: "Otvori zagradu, sredi, pa na kraju dijeli negativnim brojem — ne zaboravi okrenuti znak!",
    explanation:
      "$-1-15x-3<11\\Rightarrow-15x-4<11\\Rightarrow-15x<15$. Dijeljenjem sa $-15$: $x>-1$ (znak se okreće).",
    analogy:
      "Zamisli znak nejednakosti kao klackalicu — dijeljenje negativnim brojem je kao da nekome sjedneš na drugu stranu klackalice: ona se prevrne na suprotnu stranu.",
  },
  {
    id: "nejednacine-m3",
    topic: "nejednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi nejednačinu $7+\\dfrac12\\cdot(x-2)>8$.",
    answer: "x>4",
    accepted: ["x>4"],
    hint: "Prvo izoluj zagradu na jednu stranu, pa je pomnoži sa 2 da se riješiš razlomka.",
    explanation:
      "$\\dfrac12(x-2)>1$. Množenjem sa $2$ (pozitivan broj, znak se ne mijenja): $x-2>2\\Rightarrow x>4$.",
    analogy:
      "Množenje pozitivnim brojem je 'bezbjedno' za znak nejednakosti — kao guranje vage u istom smjeru u kojem je već nagnuta.",
  },
  {
    id: "nejednacine-m4",
    topic: "nejednacine",
    level: "medium",
    type: "open",
    prompt: "Riješi nejednačinu $\\dfrac{x}{2}-2>3-\\dfrac{x}{3}$.",
    answer: "x>6",
    accepted: ["x>6"],
    hint: "Pomnoži cijelu nejednačinu sa 6 (NZS brojeva 2 i 3) da ukloniš razlomke.",
    explanation:
      "Množenjem sa 6: $3x-12>18-2x\\Rightarrow5x>30\\Rightarrow x>6$.",
    analogy:
      "Isto kao kod jednačina — množenje zajedničkim nazivnikom 'čisti' razlomke, samo ovdje dodatno paziš da li množiš pozitivnim ili negativnim brojem.",
  },
  {
    id: "nejednacine-h1",
    topic: "nejednacine",
    level: "hard",
    type: "open",
    prompt: "Riješi nejednačinu $\\dfrac{x-7}{3-x}\\le-1$.",
    answer: "x<3",
    accepted: ["x<3"],
    hint: "Prebaci $-1$ na lijevu stranu i svedi na jedan razlomak prije zaključivanja o znaku — pazi, $x\\neq3$ je oblast definisanosti.",
    explanation:
      "$\\dfrac{x-7}{3-x}+1\\le0\\Rightarrow\\dfrac{(x-7)+(3-x)}{3-x}\\le0\\Rightarrow\\dfrac{-4}{3-x}\\le0$. Kako je brojnik $-4$ negativan, cijeli razlomak je $\\le0$ tačno kad je nazivnik pozitivan: $3-x>0\\Rightarrow x<3$ (uz $x\\neq3$, što je već zadovoljeno).",
    analogy:
      "Razlomak sa negativnim brojnikom je kao vaga s utegom stalno na jednoj strani — jedino nazivnik odlučuje na koju stranu će se cijeli razlomak nagnuti.",
  },
  {
    id: "nejednacine-h2",
    topic: "nejednacine",
    level: "hard",
    type: "open",
    prompt: "Riješi nejednačinu $-1+(2x+1)^2>2x(2x-5)$.",
    answer: "x>0",
    accepted: ["x>0"],
    hint: "Razvij kvadrat binoma $(2x+1)^2$ i pomnoži desnu stranu — mnogi članovi sa $x^2$ će se poništiti.",
    explanation:
      "Lijeva strana: $-1+4x^2+4x+1=4x^2+4x$. Desna strana: $4x^2-10x$. Nejednačina: $4x^2+4x>4x^2-10x\\Rightarrow14x>0\\Rightarrow x>0$.",
    analogy:
      "Kad se članovi s $x^2$ ponište s obje strane, naizgled 'teška' kvadratna nejednačina se pretvori u jednostavnu linearnu — kao kad se otkrije da je teška kutija u stvari poluprazna.",
  },
  {
    id: "nejednacine-h3",
    topic: "nejednacine",
    level: "hard",
    type: "open",
    prompt: "Riješi nejednačinu $\\dfrac{-77}{10-2x}>0$.",
    answer: "x>5",
    accepted: ["x>5"],
    hint: "Brojnik $-77$ je negativan — kad je cijeli razlomak pozitivan, nazivnik mora imati suprotan (negativan) znak.",
    explanation:
      "Da razlomak s negativnim brojnikom bude pozitivan, nazivnik mora biti negativan: $10-2x<0\\Rightarrow-2x<-10\\Rightarrow x>5$ (uz $x\\neq5$, već zadovoljeno).",
    analogy:
      "Negativno podijeljeno negativnim daje pozitivno — kao dva 'minusa' u rečenici koja se poništavaju i ostaje pozitivno značenje.",
  },

  // ==================== 8. ALGEBARSKI PROBLEMI ====================
  {
    id: "problemi-algebra-b1",
    topic: "problemi-algebra",
    level: "basic",
    type: "mc",
    prompt: "Koji odgovor je tačan zapis da je broj $a$ za $7$ veći od broja $b$?",
    options: [
      { key: "a", text: "$a=b+7$" },
      { key: "b", text: "$b=a+7$" },
      { key: "c", text: "$a+b=7$" },
      { key: "d", text: "$a+b+7=0$" },
    ],
    correct: "a",
    hint: "'Veći za 7' znači da mu dodaješ 7 da bi dobio taj drugi (veći) broj.",
    explanation: "Ako je $a$ veći od $b$ za 7, onda je $a=b+7$.",
    analogy:
      "'Za 7 veći' je kao razlika u godinama između brata i sestre — stariji brat je uvijek 'mlađi + razlika', nikad obrnuto.",
  },
  {
    id: "problemi-algebra-b2",
    topic: "problemi-algebra",
    level: "basic",
    type: "mc",
    prompt:
      "Kada prirodni broj $n$ pomnožimo sa $9$ i tom proizvodu dodamo $8$, dobijemo rezultat $26$. Koji odgovor predstavlja matematički zapis ovog problema?",
    options: [
      { key: "a", text: "$9n+8=26$" },
      { key: "b", text: "$9n-8=26$" },
      { key: "c", text: "$9n\\cdot8=26$" },
      { key: "d", text: "$9n=8\\cdot26$" },
    ],
    correct: "a",
    hint: "Prevedi rečenicu riječ po riječ u simbole: 'pomnožimo' → $\\cdot$, 'dodamo' → $+$.",
    explanation: "'$n$ pomnoženo sa 9' je $9n$; 'dodamo 8' je $9n+8$; 'dobijemo 26' je $=26$.",
    analogy:
      "Prevoditi tekst zadatka u jednačinu je kao prevoditi rečenicu s jednog jezika na drugi — riječ po riječ, u istom redoslijedu kojim su napisane.",
  },
  {
    id: "problemi-algebra-b3",
    topic: "problemi-algebra",
    level: "basic",
    type: "mc",
    prompt:
      "Zbir dva broja je $6$, a njihova razlika je $2$. Koji odgovor predstavlja matematički zapis ovog problema?",
    options: [
      { key: "a", text: "$a+b=6,\\ a-b=2$" },
      { key: "b", text: "$a-b=6,\\ a+b=2$" },
      { key: "c", text: "$-a+b=6,\\ -a-b=2$" },
      { key: "d", text: "$-a-b=6,\\ -a-b=2$" },
    ],
    correct: "a",
    hint: "'Zbir' znači sabiranje ($+$), a 'razlika' znači oduzimanje ($-$).",
    explanation: "Zbir dva broja: $a+b=6$. Razlika dva broja: $a-b=2$.",
    analogy:
      "Zbir i razlika su dva različita 'pogleda' na istu dvojku brojeva — jedan gleda koliko ih je zajedno, drugi koliko se razlikuju.",
  },
  {
    id: "problemi-algebra-m1",
    topic: "problemi-algebra",
    level: "medium",
    type: "open",
    prompt:
      "Zbir tri uzastopna prirodna broja je $105$. Koji su to brojevi (upiši samo najmanji od njih)?",
    answer: "34",
    accepted: ["34"],
    hint: "Uzastopne brojeve zapiši kao $n$, $n+1$, $n+2$.",
    explanation:
      "$n+(n+1)+(n+2)=105\\Rightarrow3n+3=105\\Rightarrow3n=102\\Rightarrow n=34$. Brojevi su $34,35,36$.",
    analogy:
      "Uzastopni brojevi su kao tri stepenika jedne za drugom — kad znaš da su 'ljepljivi' (svaki sljedeći za 1 veći), dovoljno je opisati samo prvog, a ostali se sami nadovezuju.",
  },
  {
    id: "problemi-algebra-m2",
    topic: "problemi-algebra",
    level: "medium",
    type: "open",
    prompt:
      "Za koji broj važi da su njegove $\\dfrac25$ za $9$ manje od tog broja?",
    answer: "15",
    accepted: ["15"],
    hint: "Zapiši jednačinu: $\\frac25 x = x - 9$.",
    explanation:
      "$\\dfrac25x=x-9$. Množenjem sa 5: $2x=5x-45\\Rightarrow-3x=-45\\Rightarrow x=15$.",
    analogy:
      "'Dio broja je manji od cijelog broja za nešto' je kao poređenje pola pizze s cijelom pizzom — razlika između njih je uvijek ta 'druga polovina', samo ovdje s razlomkom $\\frac25$.",
  },
  {
    id: "problemi-algebra-m3",
    topic: "problemi-algebra",
    level: "medium",
    type: "open",
    prompt: "Kojeg broja je sedmina njegove vrijednosti za $2$ veća od njegove osmine?",
    answer: "112",
    accepted: ["112"],
    hint: "Zapiši: $\\frac{x}{7}=\\frac{x}{8}+2$, pa pomnoži sa NZS(7,8)=56.",
    explanation:
      "$\\dfrac{x}{7}=\\dfrac{x}{8}+2$. Množenjem sa 56: $8x=7x+112\\Rightarrow x=112$.",
    analogy:
      "Sedmina i osmina istog broja su kao dvije različite podjele istog kolača na 7, odnosno 8 komada — veći komad (sedmina) je uvijek malo veći od manjeg (osmine), a razlika ti otkriva sam broj.",
  },
  {
    id: "problemi-algebra-m4",
    topic: "problemi-algebra",
    level: "medium",
    type: "open",
    prompt:
      "Ako se trostrukoj vrijednosti nekog broja doda njegova petina, dobije se broj $16$. Koji je to broj?",
    answer: "5",
    accepted: ["5"],
    hint: "Zapiši: $3x+\\frac{x}{5}=16$.",
    explanation: "$3x+\\dfrac{x}{5}=16$. Množenjem sa 5: $15x+x=80\\Rightarrow16x=80\\Rightarrow x=5$.",
    analogy:
      "Kombinacija cijelog umnoška i malog razlomka istog broja je kao mjerenje nečega u dvije različite jedinice odjednom — pretvoriš sve u istu 'jedinicu' (zajednički nazivnik) i onda samo sabereš.",
  },
  {
    id: "problemi-algebra-h1",
    topic: "problemi-algebra",
    level: "hard",
    type: "open",
    prompt:
      "Broj $-72$ rastavi na dva sabirka tako da se odnose kao $4:5$. Upiši manji (po apsolutnoj vrijednosti veći negativan) sabirak, npr. onaj koji odgovara omjeru 4.",
    answer: "-32",
    accepted: ["-32", "-32,-40", "-32 i -40"],
    hint: "Zapiši sabirke kao $4k$ i $5k$, pa iskoristi da je njihov zbir $-72$.",
    explanation:
      "$4k+5k=-72\\Rightarrow9k=-72\\Rightarrow k=-8$. Sabirci: $4k=-32$ i $5k=-40$.",
    analogy:
      "Kad brojevi 'stoje u omjeru', zamisli ih kao dionice u zajedničkom poslu — jedan dobije 4 dijela, drugi 5 dijelova od istog 'komada' $k$.",
  },
  {
    id: "problemi-algebra-h2",
    topic: "problemi-algebra",
    level: "hard",
    type: "open",
    prompt:
      "Cijena tri bloka za crtanje i sedam sveski je $17{,}3\\,KM$, a cijena četiri bloka za crtanje i dvije sveske je $7{,}3\\,KM$. Kolika je cijena jedne sveske?",
    answer: "2.15",
    accepted: ["2.15", "2,15", "2.15 km"],
    hint: "Postavi sistem od dvije jednačine sa dvije nepoznate ($b$ za blok, $s$ za svesku) i riješi ga metodom suprotnih koeficijenata ili zamjene.",
    explanation:
      "$3b+7s=17{,}3$ i $4b+2s=7{,}3$. Iz druge: $s=3{,}65-2b$. Uvrštavanjem u prvu: $3b+7(3{,}65-2b)=17{,}3\\Rightarrow3b+25{,}55-14b=17{,}3\\Rightarrow-11b=-8{,}25\\Rightarrow b=0{,}75$. Tada $s=3{,}65-1{,}5=2{,}15\\,KM$.",
    analogy:
      "Sistem dvije jednačine je kao dva svjedoka koji opisuju istu 'cijenu' iz različitih uglova — kombinovanjem njihovih izjava (jednačina) otkrivaš tačnu istinu o oba nepoznata broja.",
  },
  {
    id: "problemi-algebra-h3",
    topic: "problemi-algebra",
    level: "hard",
    type: "open",
    prompt:
      "Razlika kvadrata dva uzastopna neparna prirodna broja je $288$. Koji je veći od tih brojeva?",
    answer: "73",
    accepted: ["73"],
    hint: "Zapiši brojeve kao $2n-1$ i $2n+1$, pa iskoristi razliku kvadrata $(2n+1)^2-(2n-1)^2$.",
    explanation:
      "$(2n+1)^2-(2n-1)^2=288$. Razvijanjem: $(4n^2+4n+1)-(4n^2-4n+1)=8n=288\\Rightarrow n=36$. Brojevi: $2\\cdot36-1=71$ i $2\\cdot36+1=73$.",
    analogy:
      "Razlika kvadrata dva 'susjedna' neparna broja se uvijek lijepo svede na jednostavan izraz $8n$ — kao kratki put kroz naizgled komplikovan račun.",
  },

  // ==================== 9. GEOMETRIJSKI PROBLEMI ====================
  {
    id: "problemi-geometrija-b1",
    topic: "problemi-geometrija",
    level: "basic",
    type: "mc",
    prompt:
      "U trouglu $ABC$ ugao u vrhu $A$ jednak je uglu u vrhu $B$ i jednak je uglu u vrhu $C$. Koji je to trougao?",
    options: [
      { key: "a", text: "tupougli" },
      { key: "b", text: "pravougli" },
      { key: "c", text: "jednakokraki" },
      { key: "d", text: "jednakostraničan" },
    ],
    correct: "d",
    hint: "Kad su sva tri ugla jednaka, moraju iznositi po $60°$ — kakav je to trougao?",
    explanation:
      "Ako su sva tri ugla jednaka, svaki iznosi $180°:3=60°$. Trougao sa svim uglovima od $60°$ je jednakostraničan (a time i sve stranice jednake).",
    analogy:
      "Jednakostraničan trougao je 'najsimetričniji' trougao — kao pravilna zvijezda sa tri vrha, gdje je svaki ugao i svaka stranica u potpunom balansu.",
  },
  {
    id: "problemi-geometrija-b2",
    topic: "problemi-geometrija",
    level: "basic",
    type: "mc",
    prompt:
      "Dužine kateta pravouglog trougla $ABC$ su $\\overline{AC}=12\\,cm$ i $\\overline{BC}=5\\,cm$. Kolika je dužina hipotenuze $\\overline{AB}$?",
    options: [
      { key: "a", text: "$\\sqrt{17}$" },
      { key: "b", text: "$13$" },
      { key: "c", text: "$\\sqrt{119}$" },
      { key: "d", text: "$169$" },
    ],
    correct: "b",
    hint: "Koristi Pitagorinu teoremu: $c^2=a^2+b^2$.",
    explanation: "$c^2=12^2+5^2=144+25=169\\Rightarrow c=\\sqrt{169}=13\\,cm$.",
    analogy:
      "12-5-13 je jedan od 'poznatih' Pitagorinih trojki, poput 3-4-5 — vrijedi ih zapamtiti, jer se često pojavljuju u zadacima i štede vrijeme.",
  },
  {
    id: "problemi-geometrija-b3",
    topic: "problemi-geometrija",
    level: "basic",
    type: "mc",
    prompt: "Koja od sljedećih izjava o rombu je tačna?",
    options: [
      { key: "a", text: "Zbir unutrašnjih uglova romba je $180°$." },
      { key: "b", text: "Naspramni uglovi romba su jednaki." },
      { key: "c", text: "Romb ima četiri tupa unutrašnja ugla." },
      { key: "d", text: "Romb ima četiri oštra unutrašnja ugla." },
    ],
    correct: "b",
    hint: "Romb je poseban paralelogram — vrijede sva svojstva paralelograma.",
    explanation:
      "Kao i u svakom paralelogramu, naspramni uglovi romba su jednaki (susjedni su suplementni). Zbir svih unutrašnjih uglova četverougla je $360°$, ne $180°$.",
    analogy:
      "Romb je kao 'nakrivljeni' kvadrat — zadržava porodičnu osobinu paralelograma da su naspramni uglovi 'blizanci', jednaki jedan drugom.",
  },
  {
    id: "problemi-geometrija-m1",
    topic: "problemi-geometrija",
    level: "medium",
    type: "open",
    prompt: "Površina kvadrata je $64\\,m^2$. Izračunaj obim tog kvadrata.",
    answer: "32",
    accepted: ["32", "32m", "32 m"],
    hint: "Iz površine $P=a^2$ prvo nađi stranicu $a$, pa onda obim $O=4a$.",
    explanation: "$a=\\sqrt{64}=8\\,m$. Obim: $O=4a=4\\cdot8=32\\,m$.",
    analogy:
      "Kvadratni korijen površine kvadrata je kao 'otkrivanje' skrivenog gradivnog bloka — jedna stranica (blok) pomnožena sa samom sobom daje cijelu površinu.",
  },
  {
    id: "problemi-geometrija-m2",
    topic: "problemi-geometrija",
    level: "medium",
    type: "open",
    prompt:
      "Dužine stranica jednakokrakog trougla $ABC$ su $\\overline{AB}=16\\,cm$ (osnovica), $\\overline{BC}=\\overline{AC}=10\\,cm$ (kraci). Kolika je dužina visine na stranicu $\\overline{AB}$?",
    answer: "6",
    accepted: ["6", "6cm", "6 cm"],
    hint: "Visina na osnovicu jednakokrakog trougla je kateta pravouglog trougla čija je hipotenuza krak, a druga kateta polovina osnovice.",
    explanation:
      "Polovina osnovice: $16:2=8\\,cm$. Po Pitagorinoj teoremi: $h^2=10^2-8^2=100-64=36\\Rightarrow h=6\\,cm$.",
    analogy:
      "Visina jednakokrakog trougla 'siječe' ga na dva identična pravougla trougla — kao presjecanje sendviča po sredini na dvije jednake polovine.",
  },
  {
    id: "problemi-geometrija-m3",
    topic: "problemi-geometrija",
    level: "medium",
    type: "open",
    prompt:
      "Obim jednakostraničnog trougla je $24\\,cm$. Izračunaj površinu tog trougla (rezultat ostavi pod korijenom, u obliku $a\\sqrt3$).",
    answer: "16*sqrt(3)",
    accepted: ["16√3", "16sqrt3", "16*sqrt(3)", "16 sqrt 3", "27.7", "27,7"],
    hint: "Iz obima nađi stranicu $a$, pa primijeni formulu $P=\\dfrac{a^2\\sqrt3}{4}$.",
    explanation: "$a=24:3=8\\,cm$. $P=\\dfrac{8^2\\sqrt3}{4}=\\dfrac{64\\sqrt3}{4}=16\\sqrt3\\,cm^2$.",
    analogy:
      "Formula za površinu jednakostraničnog trougla je kao 'prečica' koju koristiš kad znaš da su sve tri stranice iste — ne treba ti crtež ni visina, samo jedna formula.",
  },
  {
    id: "problemi-geometrija-m4",
    topic: "problemi-geometrija",
    level: "medium",
    type: "open",
    prompt:
      "Zadan je jednakokraki trougao čija je dužina osnovice $16\\,cm$, a dužina visine na osnovicu $6\\,cm$. Kolika je dužina kraka tog trougla?",
    answer: "10",
    accepted: ["10", "10cm", "10 cm"],
    hint: "Visina, polovina osnovice i krak formiraju pravougli trougao — primijeni Pitagorinu teoremu.",
    explanation: "$b^2=h^2+(a/2)^2=6^2+8^2=36+64=100\\Rightarrow b=10\\,cm$.",
    analogy:
      "Ovo je 'obrnut' zadatak od prethodnog — sad znaš dvije katete (visinu i polovinu osnovice) i tražiš hipotenuzu, koja je ovdje sam krak trougla.",
  },
  {
    id: "problemi-geometrija-h1",
    topic: "problemi-geometrija",
    level: "hard",
    type: "open",
    prompt:
      "Dužina jedne stranice pravougaonika je $0{,}5\\,dm$, a dužina dijagonale je $13\\,cm$. Kolika je dužina druge stranice pravougaonika, izražena u centimetrima?",
    answer: "12",
    accepted: ["12", "12cm", "12 cm"],
    hint: "Pretvori sve u iste jedinice (cm), pa primijeni Pitagorinu teoremu: $d^2=a^2+b^2$.",
    explanation:
      "$0{,}5\\,dm=5\\,cm$. $13^2=5^2+b^2\\Rightarrow169-25=144\\Rightarrow b=\\sqrt{144}=12\\,cm$.",
    analogy:
      "Prije bilo kakvog računa u geometriji, prvo 'ujedini valute' (jedinice mjere) — kao što ne bi sabirao evre i marke direktno, bez konverzije.",
  },
  {
    id: "problemi-geometrija-h2",
    topic: "problemi-geometrija",
    level: "hard",
    type: "open",
    prompt:
      "Kvadrat stranice $8\\,cm$ i pravougaonik širine $0{,}4\\,dm$ imaju istu površinu. Kolika je dužina stranice pravougaonika?",
    answer: "16",
    accepted: ["16", "16cm", "16 cm"],
    hint: "Površina kvadrata je $8^2$. Pretvori širinu pravougaonika u cm, pa iz $P=a\\cdot b$ izračunaj dužinu.",
    explanation:
      "$P_{kvadrat}=8^2=64\\,cm^2$. Širina pravougaonika: $0{,}4\\,dm=4\\,cm$. Dužina: $64:4=16\\,cm$.",
    analogy:
      "'Ista površina, drugi oblik' je kao presipanje iste količine vode iz kvadratne u uzanu, duguljastu čašu — količina (površina) ostaje ista, samo se oblik mijenja.",
  },
  {
    id: "problemi-geometrija-h3",
    topic: "problemi-geometrija",
    level: "hard",
    type: "open",
    prompt:
      "Katete pravouglog trougla se odnose kao $3:4$, a hipotenuza je $25\\,cm$. Izračunaj obim trougla.",
    answer: "60",
    accepted: ["60", "60cm", "60 cm"],
    hint: "Zapiši katete kao $3k$ i $4k$, primijeni Pitagorinu teoremu da nađeš $k$.",
    explanation:
      "$(3k)^2+(4k)^2=25^2\\Rightarrow9k^2+16k^2=625\\Rightarrow25k^2=625\\Rightarrow k^2=25\\Rightarrow k=5$. Katete: $15\\,cm$ i $20\\,cm$. Obim: $15+20+25=60\\,cm$.",
    analogy:
      "Omjer $3:4$ uz hipotenuzu odmah 'miriše' na poznatu 3-4-5 trojku uvećanu $5$ puta — prepoznavanje ovog obrasca ubrzava rješavanje umjesto da rješavaš kvadratnu jednačinu ispočetka.",
  },

  // ==================== 10. GEOMETRIJSKA TIJELA ====================
  {
    id: "tijela-b1",
    topic: "tijela",
    level: "basic",
    type: "mc",
    prompt: "Zapremina kocke iznosi $64\\,cm^3$. Kolika je dužina stranice kocke?",
    options: [
      { key: "a", text: "$4\\,cm$" },
      { key: "b", text: "$8\\,cm$" },
      { key: "c", text: "$16\\,cm$" },
      { key: "d", text: "$32\\,cm$" },
    ],
    correct: "a",
    hint: "Zapremina kocke je $V=a^3$ — traži treći korijen.",
    explanation: "$a=\\sqrt[3]{64}=4\\,cm$, jer je $4^3=64$.",
    analogy:
      "Treći korijen zapremine kocke je kao pitanje 'koliko mala kockica, pomnožena sama sa sobom tri puta, daje veliku zapreminu' — odgovor je dužina jedne ivice.",
  },
  {
    id: "tijela-b2",
    topic: "tijela",
    level: "basic",
    type: "mc",
    prompt: "Površina kocke je $150\\,dm^2$. Kolika je dužina njene stranice?",
    options: [
      { key: "a", text: "$\\sqrt{150}\\,dm$" },
      { key: "b", text: "$\\sqrt{50}\\,dm$" },
      { key: "c", text: "$25\\,dm$" },
      { key: "d", text: "$5\\,dm$" },
    ],
    correct: "d",
    hint: "Kocka ima 6 jednakih kvadratnih strana: $P=6a^2$.",
    explanation: "$6a^2=150\\Rightarrow a^2=25\\Rightarrow a=5\\,dm$.",
    analogy:
      "Kocka je kao kutija sa 6 identičnih 'poklopaca' — ukupnu površinu podijeliš sa 6 da dobiješ površinu jednog poklopca (kvadrata), pa onda korijenuješ za stranicu.",
  },
  {
    id: "tijela-b3",
    topic: "tijela",
    level: "basic",
    type: "mc",
    prompt: "Koliko litara vode stane u kocku stranice $3\\,dm$?",
    options: [
      { key: "a", text: "$2{,}7$ litara" },
      { key: "b", text: "$27$ litara" },
      { key: "c", text: "$270$ litara" },
      { key: "d", text: "$2700$ litara" },
    ],
    correct: "b",
    hint: "Zapamti: $1\\,dm^3 = 1$ litar.",
    explanation: "$V=3^3=27\\,dm^3=27$ litara.",
    analogy:
      "$1\\,dm^3$ i $1$ litar su praktično 'sinonimi' u svakodnevnom životu — kutija mlijeka od litre je upravo kocka (ili blizu toga) ivice oko 1 dm.",
  },
  {
    id: "tijela-m1",
    topic: "tijela",
    level: "medium",
    type: "open",
    prompt: "Obim baze kocke je $16\\,cm$. Kolika je površina te kocke?",
    answer: "96",
    accepted: ["96", "96cm2", "96 cm2", "96 cm²"],
    hint: "Baza kocke je kvadrat — iz obima nađi stranicu $a$, pa primijeni $P=6a^2$.",
    explanation: "$a=16:4=4\\,cm$. $P=6\\cdot4^2=6\\cdot16=96\\,cm^2$.",
    analogy:
      "Obim ti otkriva 'jednu stranicu' kutije, a odatle lako izračunaš svih šest strana kocke — kao kad znaš opseg jedne strane kutije i lako proračunaš omot za cijelu kutiju.",
  },
  {
    id: "tijela-m2",
    topic: "tijela",
    level: "medium",
    type: "open",
    prompt:
      "Poluprečnik baze valjka je $6\\,cm$, a njegova površina je $144\\pi\\,cm^2$. Izračunaj dužinu visine tog valjka.",
    answer: "6",
    accepted: ["6", "6cm", "6 cm"],
    hint: "Površina valjka: $P=2r\\pi(r+H)$. Uvrsti $r=6$ i riješi po $H$.",
    explanation: "$2\\cdot6\\pi(6+H)=144\\pi\\Rightarrow12(6+H)=144\\Rightarrow6+H=12\\Rightarrow H=6\\,cm$.",
    analogy:
      "Formula za površinu valjka kombinuje dvije baze (krugovi) i omotač (pravougaonik namotan oko njih) — kao etiketa oko konzerve plus njen gornji i donji poklopac.",
  },
  {
    id: "tijela-m3",
    topic: "tijela",
    level: "medium",
    type: "open",
    prompt:
      "Površina baze prizme je $20\\,cm^2$, a njena visina je $4\\,dm$. Izračunaj zapreminu prizme u $dm^3$.",
    answer: "0.8",
    accepted: ["0.8", "0,8", "0.8dm3", "0,8 dm3"],
    hint: "Pretvori sve u iste jedinice (dm ili cm) prije primjene formule $V=B\\cdot H$.",
    explanation:
      "$20\\,cm^2=0{,}2\\,dm^2$. $V=B\\cdot H=0{,}2\\,dm^2\\cdot4\\,dm=0{,}8\\,dm^3$.",
    analogy:
      "Zapremina prizme je kao slaganje istih 'podnih pločica' (baze) jednu na drugu do određene visine — koliko ih 'stane' u visinu, to je zapremina.",
  },
  {
    id: "tijela-m4",
    topic: "tijela",
    level: "medium",
    type: "open",
    prompt:
      "Površina valjka je $48\\pi\\,cm^2$, a površina omotača valjka je $30\\pi\\,cm^2$. Izračunaj poluprečnik baze ovog valjka.",
    answer: "3",
    accepted: ["3", "3cm", "3 cm"],
    hint: "$P=2B+M$, gdje je $B=r^2\\pi$ površina jedne baze. Prvo nađi $B$, pa $r$.",
    explanation:
      "$48\\pi=2B+30\\pi\\Rightarrow2B=18\\pi\\Rightarrow B=9\\pi$. Kako je $B=r^2\\pi$: $r^2=9\\Rightarrow r=3\\,cm$.",
    analogy:
      "Ukupna površina valjka je zbir 'etikete' (omotača) i dva 'poklopca' (baze) — kad znaš ukupno i etiketu, ostatak (dva poklopca) te vodi direktno do poluprečnika.",
  },
  {
    id: "tijela-h1",
    topic: "tijela",
    level: "hard",
    type: "open",
    prompt:
      "U dvorištu se nalazi bazen čije su dimenzije $10\\,m\\times5\\,m\\times1{,}5\\,m$. Koliko litara vode treba da bi se bazen do vrha napunio?",
    answer: "75000",
    accepted: ["75000", "75 000", "75.000"],
    hint: "Zapremina kvadra $V=a\\cdot b\\cdot c$; zapamti da je $1\\,m^3=1000$ litara.",
    explanation: "$V=10\\cdot5\\cdot1{,}5=75\\,m^3$. U litrama: $75\\cdot1000=75\\,000$ litara.",
    analogy:
      "Pretvaranje kubnih metara u litre je kao pretvaranje kilograma u grame — samo pomnožiš sa 1000, jer je $1\\,m^3$ velika 'kutija' od 1000 litarskih kockica.",
  },
  {
    id: "tijela-h2",
    topic: "tijela",
    level: "hard",
    type: "open",
    prompt:
      "Površina kvadra je $282\\,cm^2$, dužina je $0{,}7\\,dm$, a visina $3\\,cm$. Kolika je širina ovog kvadra?",
    answer: "12",
    accepted: ["12", "12cm", "12 cm"],
    hint: "Pretvori dužinu u cm ($0{,}7\\,dm=7\\,cm$), pa primijeni $P=2(ab+bc+ac)$ i riješi po $b$ (širini).",
    explanation:
      "$a=7\\,cm$, $c=3\\,cm$. $282=2(7b+3b+7\\cdot3)=2(10b+21)\\Rightarrow141=10b+21\\Rightarrow10b=120\\Rightarrow b=12\\,cm$.",
    analogy:
      "Kvadar ima tri para jednakih strana — kad znaš dvije dimenzije i ukupnu površinu, treća (širina) je jedina 'nepoznata kockica' u slagalici koju treba popuniti.",
  },
  {
    id: "tijela-h3",
    topic: "tijela",
    level: "hard",
    type: "open",
    prompt:
      "Osnovna ivica pravilne četverostrane piramide je $a=6\\,cm$, a visina piramide je $H=10\\,cm$. Izračunaj zapreminu ove piramide.",
    answer: "120",
    accepted: ["120", "120cm3", "120 cm3", "120 cm³"],
    hint: "Zapremina piramide je $V=\\dfrac13 B\\cdot H$, a baza je kvadrat: $B=a^2$.",
    explanation: "$B=6^2=36\\,cm^2$. $V=\\dfrac13\\cdot36\\cdot10=\\dfrac{360}{3}=120\\,cm^3$.",
    analogy:
      "Piramida ima tačno trećinu zapremine prizme sa istom bazom i visinom — kao kad tri identične piramide 'staneš' zajedno u jednu prizmu istih dimenzija.",
  },
];

export function getQuestionsByTopic(topicKey) {
  return QUESTIONS.filter((q) => q.topic === topicKey);
}

export function getQuestionsByLevel(level) {
  return QUESTIONS.filter((q) => q.level === level);
}
