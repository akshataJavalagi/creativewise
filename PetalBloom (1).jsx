import { useState, useEffect, useRef, useCallback } from "react";

const T = {
  forest:"#1E2D1F", sage:"#7A9E6E", sageMid:"#A8C49C",
  blush:"#E8BCB7", blushDark:"#D49A94", cream:"#FAF7F2",
  warmWhite:"#FEFCF9", border:"#E3DCD2", muted:"#7A7268",
  text:"#1A1812", softGreen:"#EEF4EA",
};

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
    html{scroll-behavior:smooth;}
    body{font-family:'DM Sans',sans-serif;background:${T.cream};color:${T.text};line-height:1.6;overflow-x:hidden;}
    a{text-decoration:none;color:inherit;}
    button{font-family:'DM Sans',sans-serif;cursor:pointer;border:none;outline:none;}
    input{font-family:'DM Sans',sans-serif;outline:none;border:none;}
    ::selection{background:${T.blush};color:${T.forest};}
    ::-webkit-scrollbar{width:5px;}
    ::-webkit-scrollbar-track{background:${T.cream};}
    ::-webkit-scrollbar-thumb{background:${T.sageMid};border-radius:3px;}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    @keyframes float2{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes fadeSlide{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    .fu{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease;}
    .fu.vis{opacity:1;transform:translateY(0);}
    .d1{transition-delay:.08s}.d2{transition-delay:.18s}.d3{transition-delay:.28s}.d4{transition-delay:.38s}
    .occ-card{transition:transform .35s cubic-bezier(.22,.68,0,1.3);}
    .occ-card:hover{transform:translateY(-6px) scale(1.02);}
    .occ-arrow{opacity:0;transition:opacity .2s;}
    .occ-card:hover .occ-arrow{opacity:1;}
    .prod-card{transition:transform .3s,box-shadow .3s,border-color .3s;}
    .prod-card:hover{transform:translateY(-6px);box-shadow:0 22px 56px rgba(37,51,34,.09);}
    .why-card{transition:background .3s;}
    .testi-card{transition:transform .3s;}
    .testi-card:hover{transform:translateY(-5px);}
    .btn-primary{transition:transform .2s,box-shadow .2s;}
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(232,188,183,.38);}
    .btn-ghost:hover{border-color:rgba(255,255,255,.45)!important;color:rgba(255,255,255,.88)!important;}
    .btn-outline:hover{background:${T.forest}!important;color:#fff!important;}
    .icon-btn:hover{background:${T.softGreen};}
    .nav-link:hover{color:${T.forest}!important;}
    .fav-btn:hover{transform:scale(1.15);}
    .add-btn:hover{transform:scale(1.1);}
    .social-btn:hover{background:rgba(255,255,255,.15)!important;}
    .footer-link:hover{color:rgba(255,255,255,.72)!important;}
    @media(max-width:768px){
      .hide-mob{display:none!important;}
      .hero-grid{grid-template-columns:1fr!important;}
      .occ-grid{grid-template-columns:repeat(2,1fr)!important;}
      .prod-grid{grid-template-columns:1fr!important;}
      .why-grid{grid-template-columns:repeat(2,1fr)!important;}
      .testi-grid{grid-template-columns:1fr!important;}
      .footer-grid{grid-template-columns:1fr 1fr!important;}
      .trust-bar{gap:16px!important;justify-content:flex-start!important;overflow-x:auto;}
      .cta-form{flex-direction:column!important;align-items:stretch!important;}
      .hero-btns{flex-wrap:wrap;}
    }
    @media(max-width:480px){
      .occ-grid{grid-template-columns:1fr!important;}
      .why-grid{grid-template-columns:1fr!important;}
      .footer-grid{grid-template-columns:1fr!important;}
    }
  `}</style>
);

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useIsMobile() {
  const [mob, setMob] = useState(window.innerWidth < 769);
  useEffect(() => {
    const h = () => setMob(window.innerWidth < 769);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mob;
}

function FadeUp({ children, delay = 0, tag = "div", style = {} }) {
  const [ref, vis] = useInView();
  const Tag = tag;
  return (
    <Tag ref={ref} className={`fu${vis ? " vis" : ""}${delay ? ` d${delay}` : ""}`} style={style}>
      {children}
    </Tag>
  );
}

// ─── SVG ILLUSTRATIONS ───────────────────────────────────────────────────────

const HeroFloral = () => (
  <svg viewBox="0 0 560 680" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%", display:"block" }} preserveAspectRatio="xMidYMid slice">
    <rect width="560" height="680" fill="#E8E2D8"/>
    <circle cx="420" cy="110" r="170" fill="#D4C8B8" opacity="0.4"/>
    <circle cx="80" cy="520" r="130" fill="#C8D8C0" opacity="0.22"/>
    <circle cx="300" cy="620" r="100" fill="#D8C4BE" opacity="0.18"/>
    <path d="M222 506 Q204 460 198 420 L362 420 Q356 460 338 506 Q318 530 280 532 Q244 530 222 506Z" fill="#C4A882"/>
    <path d="M220 508 Q280 526 340 508" fill="none" stroke="#B89870" strokeWidth="1"/>
    <ellipse cx="280" cy="420" rx="82" ry="16" fill="#B8956F"/>
    <rect x="264" y="382" width="32" height="42" rx="5" fill="#C4A882"/>
    <ellipse cx="280" cy="382" rx="16" ry="6" fill="#B8956F"/>
    <line x1="280" y1="382" x2="272" y2="208" stroke="#4A6A3C" strokeWidth="3.5"/>
    <path d="M268 348 Q208 296 176 228" stroke="#4A6A3C" strokeWidth="3" fill="none"/>
    <path d="M288 332 Q342 280 368 210" stroke="#4A6A3C" strokeWidth="3" fill="none"/>
    <path d="M260 362 Q190 326 148 272" stroke="#4A6A3C" strokeWidth="2.5" fill="none"/>
    <path d="M296 352 Q358 314 400 258" stroke="#4A6A3C" strokeWidth="2.5" fill="none"/>
    <ellipse cx="230" cy="315" rx="27" ry="11" fill="#6A9060" transform="rotate(-38 230 315)"/>
    <ellipse cx="325" cy="305" rx="24" ry="10" fill="#7A9E6E" transform="rotate(38 325 305)"/>
    <ellipse cx="192" cy="345" rx="22" ry="9" fill="#7A9E6E" transform="rotate(-55 192 345)"/>
    <ellipse cx="370" cy="330" rx="20" ry="9" fill="#6A9060" transform="rotate(50 370 330)"/>
    <circle cx="272" cy="192" r="54" fill="#D0687A" opacity="0.12"/>
    <circle cx="272" cy="192" r="44" fill="#E07888"/>
    <circle cx="272" cy="192" r="33" fill="#EE9098"/>
    <circle cx="272" cy="192" r="22" fill="#F5AAAE"/>
    <circle cx="272" cy="192" r="13" fill="#FAC0C4"/>
    <circle cx="272" cy="192" r="7" fill="#FDD4D6"/>
    <circle cx="269" cy="189" r="3.5" fill="#FFE8EA"/>
    <circle cx="178" cy="223" r="6" fill="#DCA878"/>
    <ellipse cx="162" cy="223" rx="15" ry="10" fill="#F0CCA0"/>
    <ellipse cx="194" cy="223" rx="15" ry="10" fill="#F0CCA0"/>
    <ellipse cx="178" cy="208" rx="10" ry="15" fill="#F0CCA0"/>
    <ellipse cx="178" cy="238" rx="10" ry="15" fill="#E8C098"/>
    <ellipse cx="167" cy="212" rx="10" ry="13" fill="#F0CCA0" transform="rotate(-45 167 212)"/>
    <ellipse cx="189" cy="212" rx="10" ry="13" fill="#ECC898" transform="rotate(45 189 212)"/>
    <circle cx="178" cy="223" r="8" fill="#E0A068"/>
    <circle cx="370" cy="205" r="6" fill="#A890C8"/>
    <ellipse cx="355" cy="205" rx="14" ry="9" fill="#C8B0E4"/>
    <ellipse cx="385" cy="205" rx="14" ry="9" fill="#C8B0E4"/>
    <ellipse cx="370" cy="190" rx="9" ry="14" fill="#C8B0E4"/>
    <ellipse cx="370" cy="220" rx="9" ry="14" fill="#BCAAD8"/>
    <circle cx="370" cy="205" r="8" fill="#9880BC"/>
    <circle cx="148" cy="268" r="7" fill="#F0D060"/>
    {[0,60,120,180,240,300].map((a,i)=>(
      <ellipse key={i} cx={148+Math.cos((a-90)*Math.PI/180)*18} cy={268+Math.sin((a-90)*Math.PI/180)*18}
        rx="8" ry="13" fill="#FCFCF8"
        transform={`rotate(${a} ${148+Math.cos((a-90)*Math.PI/180)*18} ${268+Math.sin((a-90)*Math.PI/180)*18})`}/>
    ))}
    <circle cx="148" cy="268" r="9" fill="#F0D060"/>
    <circle cx="400" cy="255" r="22" fill="#E07888" opacity="0.6"/>
    <circle cx="400" cy="255" r="15" fill="#EE9098"/>
    <circle cx="400" cy="255" r="8" fill="#F5AAAE"/>
    {[[320,172],[332,163],[325,158],[228,168],[218,175],[212,165]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={i%3===0?7:i%3===1?6:5} fill={i<3?"#5C8050":"#6A9060"}/>
    ))}
    <ellipse cx="432" cy="160" rx="8" ry="5" fill="#EE9098" opacity="0.4" transform="rotate(25 432 160)"/>
    <ellipse cx="105" cy="195" rx="7" ry="4" fill="#F0CCA0" opacity="0.45" transform="rotate(-20 105 195)"/>
    <ellipse cx="452" cy="345" rx="6" ry="4" fill="#C8B0E4" opacity="0.38" transform="rotate(35 452 345)"/>
  </svg>
);

const FlowerSVGs = {
  pink: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="72" r="40" fill="#D0687A" opacity="0.15"/>
      <circle cx="85" cy="72" r="30" fill="#E07888"/><circle cx="85" cy="72" r="20" fill="#EE9098"/>
      <circle cx="85" cy="72" r="12" fill="#F5AAAE"/><circle cx="83" cy="70" r="6" fill="#FFD8DA"/>
      <circle cx="58" cy="88" r="22" fill="#D0687A" opacity="0.85"/>
      <circle cx="112" cy="82" r="18" fill="#E07888" opacity="0.8"/>
      <line x1="85" y1="110" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <path d="M78 148 Q60 135 68 120" stroke="#4A6A3C" strokeWidth="2" fill="none"/>
      <ellipse cx="65" cy="126" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 126)"/>
      <path d="M85 158 Q104 145 97 130" stroke="#4A6A3C" strokeWidth="2" fill="none"/>
      <ellipse cx="100" cy="136" rx="14" ry="6" fill="#6A9060" transform="rotate(28 100 136)"/>
    </svg>
  ),
  sun: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="70" r="36" fill="#F0D050" opacity="0.55"/>
      <circle cx="85" cy="70" r="24" fill="#F5E060"/><circle cx="85" cy="70" r="14" fill="#FAF080"/>
      <circle cx="58" cy="84" r="24" fill="#FAFAFA"/><circle cx="112" cy="80" r="20" fill="#F8F8F2"/>
      <circle cx="85" cy="46" r="18" fill="#FAFAFA"/><circle cx="96" cy="57" r="6" fill="#F5E060"/>
      <line x1="85" y1="108" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <path d="M78 148 Q60 135 68 120" stroke="#4A6A3C" strokeWidth="2" fill="none"/>
      <ellipse cx="65" cy="126" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 126)"/>
    </svg>
  ),
  lavender: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="72" r="38" fill="#C0A8E0" opacity="0.3"/>
      <circle cx="85" cy="72" r="26" fill="#C8B0E4"/><circle cx="85" cy="72" r="17" fill="#D8C4F0"/>
      <circle cx="85" cy="72" r="9" fill="#E8D8F8"/>
      <circle cx="57" cy="88" r="22" fill="#B8A0D4" opacity="0.9"/>
      <circle cx="113" cy="83" r="19" fill="#C0A8D8" opacity="0.85"/>
      <circle cx="74" cy="50" r="17" fill="#D0BCEC" opacity="0.8"/>
      <line x1="85" y1="110" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <path d="M78 150 Q60 137 68 122" stroke="#4A6A3C" strokeWidth="2" fill="none"/>
      <ellipse cx="65" cy="128" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 128)"/>
    </svg>
  ),
  white: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="72" r="40" fill="#F5F0E8" opacity="0.8"/>
      <circle cx="85" cy="72" r="30" fill="#FAFAF5"/><circle cx="85" cy="72" r="20" fill="#FFF"/>
      <circle cx="85" cy="72" r="12" fill="#FFF8F0"/><circle cx="83" cy="70" r="6" fill="#FFF0E8"/>
      <circle cx="58" cy="88" r="22" fill="#F0EDE5" opacity="0.9"/>
      <circle cx="112" cy="82" r="18" fill="#F8F5EE" opacity="0.9"/>
      <line x1="85" y1="110" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <ellipse cx="65" cy="126" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 126)"/>
    </svg>
  ),
  orange: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="70" r="36" fill="#E87830" opacity="0.3"/>
      <circle cx="85" cy="70" r="26" fill="#F08840"/><circle cx="85" cy="70" r="17" fill="#F89850"/>
      <circle cx="58" cy="84" r="22" fill="#E87030" opacity="0.85"/>
      <circle cx="112" cy="80" r="20" fill="#F08040" opacity="0.8"/>
      <circle cx="85" cy="46" r="18" fill="#F89048" opacity="0.75"/>
      <line x1="85" y1="108" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <ellipse cx="65" cy="126" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 126)"/>
    </svg>
  ),
  mixed: () => (
    <svg viewBox="0 0 170 185" style={{width:150,height:170}}>
      <circle cx="85" cy="68" r="26" fill="#E07888"/>
      <circle cx="60" cy="80" r="20" fill="#F5E060"/>
      <circle cx="110" cy="76" r="18" fill="#C8B0E4"/>
      <circle cx="78" cy="48" r="14" fill="#FAFAFA"/>
      <circle cx="100" cy="52" r="12" fill="#F0CCA0"/>
      <circle cx="83" cy="66" r="8" fill="#F5AAAE"/>
      <line x1="85" y1="100" x2="82" y2="178" stroke="#4A6A3C" strokeWidth="2.5"/>
      <ellipse cx="65" cy="126" rx="16" ry="7" fill="#7A9E6E" transform="rotate(-28 65 126)"/>
    </svg>
  ),
};

const OccasionFlowers = {
  Romance: { bg:"#9A6878", circles:[{cx:140,cy:95,r:75,fill:"#C08090",op:.4},{cx:140,cy:95,r:55,fill:"#C08090",op:.7},{cx:140,cy:95,r:36,fill:"#F0B0B8",op:1},{cx:90,cy:112,r:34,fill:"#C08090",op:.85},{cx:190,cy:106,r:30,fill:"#9A6878",op:.5}] },
  Birthday: { bg:"#5E8A5C", circles:[{cx:140,cy:90,r:68,fill:"#78A870",op:.35},{cx:140,cy:90,r:48,fill:"#F0D858",op:.8},{cx:140,cy:90,r:30,fill:"#F8E870",op:1},{cx:100,cy:106,r:34,fill:"#EED048",op:.9},{cx:180,cy:100,r:30,fill:"#F0D858",op:.85},{cx:140,cy:58,r:26,fill:"#FAFAFA",op:.82}] },
  Sympathy: { bg:"#7A7898", circles:[{cx:140,cy:92,r:72,fill:"#C0B8D8",op:.3},{cx:140,cy:92,r:50,fill:"#C0B8D8",op:1},{cx:140,cy:92,r:34,fill:"#E0D8F4",op:1},{cx:100,cy:108,r:32,fill:"#BEB0D0",op:.9},{cx:180,cy:102,r:28,fill:"#C8C0DC",op:.85}] },
  Wedding:  { bg:"#A89060", circles:[{cx:140,cy:92,r:75,fill:"#F0DEB8",op:.28},{cx:140,cy:92,r:52,fill:"#F0DEB8",op:.4},{cx:96,cy:108,r:37,fill:"#F0DEB8",op:.9},{cx:184,cy:102,r:33,fill:"#F8E8C8",op:.9},{cx:140,cy:60,r:28,fill:"#FAFAF0",op:.85}] },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const OCCASIONS = [
  { id:1, title:"Romance",  count:"32 arrangements", overlayColor:"rgba(40,12,22,.55)" },
  { id:2, title:"Birthday", count:"48 arrangements", overlayColor:"rgba(10,38,14,.55)" },
  { id:3, title:"Sympathy", count:"25 arrangements", overlayColor:"rgba(18,14,42,.55)" },
  { id:4, title:"Wedding",  count:"60 arrangements", overlayColor:"rgba(32,16,4,.55)"  },
];

const PRODUCTS = [
  { id:1, svg:"pink",    name:"Blushing Romance",   desc:"Pink roses, ranunculus & eucalyptus",  price:42, oldPrice:56, badge:"Bestseller", bBg:"#E8BCB7",   bTxt:T.forest,  bg:"#F4EEE6" },
  { id:2, svg:"sun",     name:"Sunshine Garden",    desc:"Sunflowers, daisies & white tulips",   price:36, oldPrice:null,badge:"New",         bBg:"#D4E8C4",   bTxt:"#1E4010", bg:"#F4EEE6" },
  { id:3, svg:"lavender",name:"Lavender Dreams",    desc:"Lavender, wisteria & sage sprigs",     price:54, oldPrice:null,badge:"Limited",     bBg:"#E4DCF0",   bTxt:"#3A2878", bg:"#F0EDF5" },
  { id:4, svg:"white",   name:"Ivory Elegance",     desc:"White roses, gypsophila & lily",       price:62, oldPrice:78,  badge:"Premium",    bBg:"#F5F0E0",   bTxt:"#5A4A20", bg:"#F8F5EE" },
  { id:5, svg:"orange",  name:"Autumn Harvest",     desc:"Orange tulips, marigold & berries",    price:44, oldPrice:null,badge:"Seasonal",   bBg:"#F8E4C0",   bTxt:"#7A3A10", bg:"#FBF2E8" },
  { id:6, svg:"mixed",   name:"Garden Medley",      desc:"Mixed seasonal blooms & greenery",     price:38, oldPrice:48,  badge:"Popular",    bBg:"#D4E8C4",   bTxt:"#1E4010", bg:"#EFF4EA" },
];

const WHY = [
  { icon:"🌱", title:"Sustainably Grown",   text:"All blooms are ethically sourced from certified sustainable farms across Europe and the UK." },
  { icon:"✂️", title:"Expert Florists",     text:"Every arrangement is hand-crafted by our award-winning team of experienced florists." },
  { icon:"🚚", title:"Same-Day Delivery",   text:"Order before 2 PM for same-day delivery, 7 days a week across the city and beyond." },
  { icon:"💚", title:"Freshness Promise",   text:"7-day freshness guaranteed. Not satisfied? We'll replace your bouquet, completely free." },
];

const TESTIMONIALS = [
  { initials:"JM", name:"James M.",   loc:"London, UK",     av:"#E8BCB7", avT:T.forest,  rating:5, quote:"The flowers arrived fresh and so beautifully arranged. My wife was completely speechless — best anniversary gift I've ever given." },
  { initials:"SL", name:"Sarah L.",   loc:"Manchester, UK", av:"#D4E8C4", avT:"#1E4010", rating:5, quote:"I've ordered three times now and every bouquet has been absolutely stunning. The Lavender Dreams is simply magical." },
  { initials:"PR", name:"Priya R.",   loc:"Birmingham, UK", av:"#E4DCF0", avT:"#3A2878", rating:5, quote:"Fast delivery, beautiful packaging. The flowers lasted two full weeks. This is my go-to for all gifting occasions now." },
];

const FOOTER_COLS = [
  { h:"Shop",      links:["All Bouquets","Subscriptions","Gift Cards","Corporate","Seasonal"] },
  { h:"Occasions", links:["Birthdays","Weddings","Romance","Sympathy","Thank You"] },
  { h:"Help",      links:["Track Order","Delivery Info","Freshness Policy","Returns","Contact Us"] },
];

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

const Eyebrow = ({ children, light }) => (
  <p style={{ fontSize:11, letterSpacing:"2px", textTransform:"uppercase", color: light ? "rgba(200,225,195,0.5)" : T.sage, fontWeight:500, marginBottom:10 }}>
    {children}
  </p>
);

const SectionTitle = ({ children, light }) => (
  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,44px)", fontWeight:400, color: light ? "#fff" : T.forest, lineHeight:1.15 }}>
    {children}
  </h2>
);

const Toast = ({ msg, vis }) => (
  <div style={{
    position:"fixed", bottom:24, right:24, zIndex:999,
    background:T.forest, color:"#fff", padding:"12px 22px",
    borderRadius:100, fontSize:13, fontWeight:500,
    boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
    transform: vis ? "translateY(0)" : "translateY(80px)",
    opacity: vis ? 1 : 0,
    transition:"all 0.3s cubic-bezier(.22,.68,0,1.2)",
    pointerEvents:"none",
  }}>{msg}</div>
);

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

function OccCard({ occ, delay }) {
  const [ref, vis] = useInView();
  const data = OccasionFlowers[occ.title];
  return (
    <div ref={ref} className={`fu occ-card${vis?" vis":""}${delay?` d${delay}`:""}`}
      style={{ borderRadius:20, overflow:"hidden", height:260, cursor:"pointer", position:"relative" }}>
      <svg viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
        <rect width="280" height="260" fill={data.bg}/>
        {data.circles.map((c,i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={c.fill} opacity={c.op}/>
        ))}
        <line x1="140" y1="150" x2="137" y2="252" stroke={data.bg} strokeWidth="3" opacity="0.6"/>
        <ellipse cx="115" cy="176" rx="18" ry="8" fill={data.bg} opacity="0.7" transform="rotate(-25 115 176)"/>
        <rect x="0" y="172" width="280" height="88" fill={occ.overlayColor}/>
        <text x="140" y="207" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="22" fill="white" fontStyle="italic" fontWeight="300">{occ.title}</text>
        <text x="140" y="228" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="11" fill="rgba(255,255,255,0.58)">{occ.count}</text>
      </svg>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 28%,rgba(12,22,12,.72) 100%)" }}/>
      <div className="occ-arrow" style={{ position:"absolute", top:14, right:14, width:30, height:30, borderRadius:"50%", background:"rgba(255,255,255,0.18)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13 }}>→</div>
    </div>
  );
}

function ProdCard({ p, onAddToCart, delay }) {
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);
  const [ref, vis] = useInView();
  const Svg = FlowerSVGs[p.svg];
  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 1500);
  }, [added, onAddToCart]);
  return (
    <div ref={ref} className={`fu prod-card${vis?" vis":""}${delay?` d${delay}`:""}`}
      style={{ background:T.cream, borderRadius:20, overflow:"hidden", cursor:"pointer", border:`1px solid transparent` }}>
      <div style={{ height:230, position:"relative", display:"flex", alignItems:"center", justifyContent:"center", background:p.bg }}>
        <Svg/>
        <span style={{ position:"absolute", top:14, left:14, padding:"4px 12px", borderRadius:100, fontSize:10, fontWeight:500, letterSpacing:"0.5px", background:p.bBg, color:p.bTxt }}>{p.badge}</span>
        <button className="fav-btn" style={{ position:"absolute", top:14, right:14, width:33, height:33, borderRadius:"50%", background:"#fff", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px rgba(0,0,0,.09)", transition:"transform .2s" }}
          onClick={(e) => { e.stopPropagation(); setFav(f=>!f); }}>{fav?"❤️":"🤍"}</button>
      </div>
      <div style={{ padding:"16px 18px 20px" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, color:T.forest, marginBottom:5 }}>{p.name}</div>
        <div style={{ fontSize:12, color:T.muted, marginBottom:14, lineHeight:1.6 }}>{p.desc}</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:7 }}>
            <span style={{ fontSize:17, fontWeight:500, color:T.forest }}>£{p.price}</span>
            {p.oldPrice && <span style={{ fontSize:12, color:T.muted, textDecoration:"line-through" }}>£{p.oldPrice}</span>}
          </div>
          <button className="add-btn" onClick={handleAdd}
            style={{ width:35, height:35, borderRadius:"50%", background: added?T.sage:T.forest, color:"#fff", fontSize: added?14:20, display:"flex", alignItems:"center", justifyContent:"center", transition:"background .25s, transform .15s" }}>
            {added?"✓":"+"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const scrollY = useScrollY();
  const isMob = useIsMobile();
  const [cart, setCart] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [toast, setToast] = useState({ msg:"", vis:false });

  const showToast = useCallback((msg) => {
    setToast({ msg, vis:true });
    setTimeout(() => setToast(t => ({...t,vis:false})), 2300);
  }, []);

  const prevCart = useRef(cart);
  useEffect(() => {
    if (cart > prevCart.current) showToast("Added to cart 🌸");
    prevCart.current = cart;
  }, [cart, showToast]);

  const handleSubscribe = () => {
    if (!email.includes("@")) { showToast("Please enter a valid email"); return; }
    setSubbed(true); setEmail("");
    showToast("Welcome to Petal & Bloom! 🌸");
  };

  const pad = "clamp(16px,4vw,48px)";

  return (
    <>
      <GlobalStyle/>

      {/* ── NAV ── */}
      <nav style={{
        position:"sticky", top:0, zIndex:200,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:`0 ${pad}`, height:68,
        background: scrollY>10 ? "rgba(254,252,249,0.97)" : "rgba(254,252,249,0.94)",
        backdropFilter:"blur(14px)",
        borderBottom:`1px solid ${T.border}`,
        boxShadow: scrollY>10 ? "0 2px 20px rgba(0,0,0,.06)" : "none",
        transition:"background .3s, box-shadow .3s",
      }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:400, letterSpacing:"1.5px", color:T.forest, cursor:"pointer" }}>
          Petal <span style={{color:T.sage}}>&</span> Bloom
        </div>

        {!isMob && (
          <ul style={{ display:"flex", gap:28, listStyle:"none" }}>
            {["Shop","Occasions","Subscriptions","About"].map(l=>(
              <li key={l}><span className="nav-link" style={{ fontSize:13, color:T.muted, cursor:"pointer", letterSpacing:"0.3px" }}>{l}</span></li>
            ))}
          </ul>
        )}

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {!isMob && (
            <>
              <button className="icon-btn" style={{ width:38,height:38,borderRadius:"50%",background:"none",color:T.muted,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }} aria-label="Search">🔍</button>
              <button className="icon-btn" style={{ width:38,height:38,borderRadius:"50%",background:"none",color:T.muted,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }} aria-label="Wishlist">🤍</button>
            </>
          )}
          <button style={{ width:38,height:38,borderRadius:"50%",background:"none",color:T.muted,fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }} aria-label="Cart">
            🛒
            {cart>0 && <span style={{ position:"absolute",top:4,right:4,width:17,height:17,borderRadius:"50%",background:T.blush,color:T.forest,fontSize:9,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center" }}>{cart}</span>}
          </button>
          {!isMob && (
            <button style={{ background:T.forest,color:"#fff",padding:"9px 22px",borderRadius:100,fontSize:12,fontWeight:500,letterSpacing:"0.4px",transition:"opacity .2s,transform .15s" }}
              onMouseEnter={e=>{ e.target.style.opacity=".85"; e.target.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.target.style.opacity="1"; e.target.style.transform="none"; }}>
              Order Now
            </button>
          )}
          {isMob && (
            <button onClick={()=>setMenuOpen(o=>!o)} style={{ width:38,height:38,display:"flex",flexDirection:"column",justifyContent:"center",gap:5,padding:8,background:"none" }} aria-label="Menu">
              <div style={{ width:"100%",height:1.5,background:T.forest,borderRadius:2,transition:"all .3s",transform:menuOpen?"rotate(45deg) translateY(7px)":"none" }}/>
              <div style={{ width:"100%",height:1.5,background:T.forest,borderRadius:2,transition:"all .3s",opacity:menuOpen?0:1 }}/>
              <div style={{ width:"100%",height:1.5,background:T.forest,borderRadius:2,transition:"all .3s",transform:menuOpen?"rotate(-45deg) translateY(-7px)":"none" }}/>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {isMob && (
        <div style={{ position:"fixed",top:68,left:0,right:0,bottom:0,zIndex:190,background:T.warmWhite,padding:"32px 24px",transform:menuOpen?"translateY(0)":"translateY(-110%)",transition:"transform .35s cubic-bezier(.22,.68,0,1.1)",borderTop:`1px solid ${T.border}`,overflowY:"auto" }}>
          {["Shop","Occasions","Subscriptions","About"].map(l=>(
            <div key={l} onClick={()=>setMenuOpen(false)}
              style={{ padding:"16px 0",borderBottom:`1px solid ${T.border}`,fontFamily:"'Cormorant Garamond',serif",fontSize:22,color:T.forest,cursor:"pointer" }}>
              {l}
            </div>
          ))}
          <button onClick={()=>setMenuOpen(false)} style={{ background:T.forest,color:"#fff",padding:14,borderRadius:100,fontSize:13,fontWeight:500,width:"100%",marginTop:24 }}>
            Order Now
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", minHeight:isMob?"auto":"min(660px,92vh)" }}>
        <div style={{ background:T.forest, padding:`clamp(40px,7vw,76px) ${pad}`, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 20% 85%,rgba(122,158,110,.16) 0%,transparent 60%)",pointerEvents:"none" }}/>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.09)",color:"rgba(255,255,255,.62)",fontSize:11,letterSpacing:"1.8px",textTransform:"uppercase",padding:"6px 14px",borderRadius:100,marginBottom:28,width:"fit-content",border:"1px solid rgba(255,255,255,.1)" }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#A0C890",display:"inline-block" }}/>
            New arrivals this week
          </div>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(38px,5vw,68px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:20 }}>
            Fresh Flowers,<br/>
            <em style={{ fontStyle:"italic", color:"#B8D4AE" }}>Thoughtfully</em><br/>
            Arranged
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,.52)", lineHeight:1.82, marginBottom:36, maxWidth:310 }}>
            Hand-picked seasonal blooms delivered same-day to your door. Every bouquet tells a story worth remembering.
          </p>
          <div className="hero-btns" style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button className="btn-primary" style={{ background:T.blush,color:T.forest,padding:"13px 28px",borderRadius:100,fontSize:13,fontWeight:500 }}>
              Shop Bouquets
            </button>
            <button className="btn-ghost" style={{ background:"transparent",color:"rgba(255,255,255,.65)",border:"1px solid rgba(255,255,255,.22)",padding:"13px 26px",borderRadius:100,fontSize:13,transition:"border-color .2s,color .2s" }}>
              View Occasions →
            </button>
          </div>
          {!isMob && (
            <div style={{ position:"absolute", bottom:32, left:`clamp(24px,5vw,56px)`, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex" }}>
                {["😊","😊","😊"].map((e,i)=>(
                  <div key={i} style={{ width:30,height:30,borderRadius:"50%",border:`2px solid ${T.forest}`,background:T.blush,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,marginLeft:i===0?0:-8 }}>{e}</div>
                ))}
              </div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.48)" }}>
                <strong style={{ display:"block", fontSize:13, color:"rgba(255,255,255,.82)", fontWeight:500 }}>2,400+ customers</strong>
                Loved our flowers this month
              </div>
            </div>
          )}
        </div>

        {!isMob && (
          <div style={{ position:"relative", overflow:"hidden", background:"#E8E2D8" }}>
            <HeroFloral/>
            <div style={{ position:"absolute",bottom:28,right:24,background:"rgba(254,252,249,.96)",borderRadius:16,padding:"14px 18px",boxShadow:"0 12px 40px rgba(0,0,0,.1)",border:"1px solid rgba(255,255,255,.8)",animation:"float 5s ease-in-out infinite" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:400,color:T.forest,lineHeight:1 }}>4.9 ★</div>
              <div style={{ fontSize:11,color:T.muted,marginTop:4 }}>2,400+ reviews</div>
            </div>
            <div style={{ position:"absolute",top:28,left:20,background:"rgba(254,252,249,.96)",borderRadius:12,padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,.07)",animation:"float2 6s ease-in-out infinite 1s" }}>
              <div style={{ fontSize:10,color:T.muted,letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:2 }}>Same-day delivery</div>
              <div style={{ fontSize:13,fontWeight:500,color:T.forest }}>Order by 2 PM ✓</div>
            </div>
          </div>
        )}
      </section>

      {/* ── TRUST BAR ── */}
      <div className="trust-bar" style={{ background:T.warmWhite,borderBottom:`1px solid ${T.border}`,padding:`13px ${pad}`,display:"flex",justifyContent:"center",gap:"clamp(16px,4vw,48px)",alignItems:"center",flexWrap:"wrap" }}>
        {[{icon:"🌿",l:"Sustainably sourced"},{icon:"🚚",l:"Same-day delivery"},{icon:"✂️",l:"Expert florists"},{icon:"🔄",l:"7-day freshness"},{icon:"💳",l:"Secure checkout"}].map(t=>(
          <div key={t.l} style={{ display:"flex",alignItems:"center",gap:7,fontSize:12,color:T.muted,whiteSpace:"nowrap" }}>
            <span>{t.icon}</span>{t.l}
          </div>
        ))}
      </div>

      {/* ── OCCASIONS ── */}
      <section style={{ background:T.cream, padding:`clamp(52px,8vw,88px) ${pad}` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(32px,5vw,52px)" }}>
            <Eyebrow>Shop by Occasion</Eyebrow>
            <SectionTitle>A Bloom for <em style={{fontStyle:"italic"}}>Every Moment</em></SectionTitle>
          </div>
        </FadeUp>
        <div className="occ-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {OCCASIONS.map((o,i)=><OccCard key={o.id} occ={o} delay={(i%4)+1}/>)}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ background:T.warmWhite, padding:`clamp(52px,8vw,88px) ${pad}` }}>
        <FadeUp>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"clamp(28px,4vw,44px)",flexWrap:"wrap",gap:16 }}>
            <div>
              <Eyebrow>This Week's Picks</Eyebrow>
              <SectionTitle><em style={{fontStyle:"italic"}}>Featured</em> Bouquets</SectionTitle>
            </div>
            <button className="btn-outline" style={{ background:"transparent",border:`1.5px solid ${T.forest}`,color:T.forest,padding:"10px 24px",borderRadius:100,fontSize:12,fontWeight:500,letterSpacing:"0.3px",transition:"background .2s,color .2s" }}>
              View All →
            </button>
          </div>
        </FadeUp>
        <div className="prod-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {PRODUCTS.map((p,i)=><ProdCard key={p.id} p={p} onAddToCart={()=>setCart(c=>c+1)} delay={(i%3)+1}/>)}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background:T.forest, padding:`clamp(52px,8vw,88px) ${pad}` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:0 }}>
            <Eyebrow light>Why Petal & Bloom</Eyebrow>
            <SectionTitle light>Crafted with <em style={{fontStyle:"italic"}}>Care</em></SectionTitle>
          </div>
        </FadeUp>
        <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:"clamp(32px,5vw,52px)" }}>
          {WHY.map((c,i)=>(
            <FadeUp key={c.title} delay={(i%4)+1}>
              <div className="why-card" style={{ padding:"clamp(24px,3vw,32px) clamp(18px,2.5vw,26px)", background:"rgba(255,255,255,.055)", borderRadius:20, border:"1px solid rgba(255,255,255,.09)" }}>
                <div style={{ width:48,height:48,background:"rgba(160,200,144,.15)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:18 }}>{c.icon}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"#fff",marginBottom:10 }}>{c.title}</div>
                <p style={{ fontSize:12.5,color:"rgba(255,255,255,.44)",lineHeight:1.78 }}>{c.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background:T.softGreen, padding:`clamp(52px,8vw,88px) ${pad}` }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:"clamp(32px,5vw,52px)" }}>
            <Eyebrow>Customer Stories</Eyebrow>
            <SectionTitle>Loved by <em style={{fontStyle:"italic"}}>Thousands</em></SectionTitle>
          </div>
        </FadeUp>
        <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
          {TESTIMONIALS.map((t,i)=>(
            <FadeUp key={t.name} delay={i+1}>
              <div className="testi-card" style={{ background:"#fff",borderRadius:20,padding:"clamp(20px,3vw,28px) clamp(18px,2.5vw,26px)",border:`1px solid ${T.border}` }}>
                <div style={{ color:"#C9A84C",fontSize:14,marginBottom:16,letterSpacing:2 }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:T.text,lineHeight:1.7,marginBottom:22,fontStyle:"italic" }}>"{t.quote}"</p>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:500,flexShrink:0,background:t.av,color:t.avT }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize:13,fontWeight:500,color:T.forest }}>{t.name}</div>
                    <div style={{ fontSize:11,color:T.muted }}>{t.loc}</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:T.blush, padding:`clamp(52px,8vw,88px) ${pad}`, position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute",width:400,height:400,borderRadius:"50%",background:"rgba(255,255,255,.22)",top:-180,right:-80,pointerEvents:"none" }}/>
        <div style={{ position:"absolute",width:280,height:280,borderRadius:"50%",background:"rgba(255,255,255,.18)",bottom:-140,left:-60,pointerEvents:"none" }}/>
        <FadeUp style={{ position:"relative", zIndex:1 }}>
          <Eyebrow>Stay in Bloom</Eyebrow>
          <SectionTitle>Get 15% Off Your <em style={{fontStyle:"italic"}}>First Order</em></SectionTitle>
          <p style={{ fontSize:14,color:"rgba(37,51,34,.62)",margin:"16px auto 34px",maxWidth:420,lineHeight:1.8 }}>
            Join our community of flower lovers. Seasonal inspiration, new arrivals, and exclusive offers — straight to your inbox every week.
          </p>
          <div className="cta-form" style={{ display:"flex",gap:10,justifyContent:"center",maxWidth:440,margin:"0 auto" }}>
            <input
              type="email"
              placeholder={subbed?"You're subscribed! 🌸":"Your email address"}
              value={email}
              onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleSubscribe()}
              disabled={subbed}
              style={{ flex:1,minWidth:180,padding:"13px 22px",border:`1.5px solid rgba(37,51,34,.18)`,borderRadius:100,background:"rgba(255,255,255,.78)",fontSize:13,color:T.text,transition:"border-color .2s,background .2s" }}
            />
            <button
              onClick={handleSubscribe}
              disabled={subbed}
              style={{ background:T.forest,color:"#fff",padding:"13px 28px",borderRadius:100,fontSize:13,fontWeight:500,whiteSpace:"nowrap",opacity:subbed?.7:1,transition:"opacity .2s,transform .15s" }}
              onMouseEnter={e=>{if(!subbed){e.target.style.opacity=".84";e.target.style.transform="translateY(-1px)";}}}
              onMouseLeave={e=>{e.target.style.opacity=subbed?".7":"1";e.target.style.transform="none";}}>
              {subbed?"✓ Subscribed":"Subscribe"}
            </button>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:T.text, padding:`clamp(40px,6vw,64px) ${pad} 28px` }}>
        <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr", gap:"clamp(24px,4vw,40px)", marginBottom:"clamp(32px,4vw,48px)" }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400,letterSpacing:"1.5px",color:"#fff" }}>
              Petal <span style={{color:T.sage}}>&</span> Bloom
            </div>
            <p style={{ fontSize:12,color:"rgba(255,255,255,.34)",lineHeight:1.85,marginTop:14,maxWidth:220 }}>
              Bringing the beauty of nature to your door since 2019. Every bouquet hand-crafted with love in London.
            </p>
          </div>
          {FOOTER_COLS.map(col=>(
            <div key={col.h}>
              <h4 style={{ fontSize:11,fontWeight:500,color:"rgba(255,255,255,.52)",letterSpacing:"1.2px",textTransform:"uppercase",marginBottom:16 }}>{col.h}</h4>
              <ul style={{ listStyle:"none" }}>
                {col.links.map(l=>(
                  <li key={l} style={{ marginBottom:10 }}>
                    <span className="footer-link" style={{ fontSize:12.5,color:"rgba(255,255,255,.34)",cursor:"pointer",transition:"color .2s" }}>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <p style={{ fontSize:11,color:"rgba(255,255,255,.24)" }}>© 2025 Petal & Bloom Ltd. All rights reserved.</p>
          <div style={{ display:"flex",gap:10 }}>
            {["ig","fb","pi","tt"].map(n=>(
              <button key={n} className="social-btn" style={{ width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.44)",fontSize:10,fontWeight:500,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s" }}>{n}</button>
            ))}
          </div>
        </div>
      </footer>

      <Toast msg={toast.msg} vis={toast.vis}/>
    </>
  );
}
