import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getTodos } from "../services/todosApi";
import { getUserPosts } from "../services/postsApi";
import { getAlbums } from "../services/albumsApi";
import "../styles/Home.css";

// ===== עמוד הבית של המשתמש =====
// 1. תמונת נוף מונפשת (SVG) עם ברכה לפי שעה ביום
// 2. שלושה כרטיסי קיצור – עם מספרים אמיתיים מהשרת
// 3. השראה למסלול הבא (תוכן קבוע)

// ברכה לפי השעה הנוכחית
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "לילה טוב";
  if (hour < 12) return "בוקר טוב";
  if (hour < 17) return "צהריים טובים";
  if (hour < 21) return "ערב טוב";
  return "לילה טוב";
}

// מסלולים להשראה – תוכן קבוע, רק לתצוגה
const TRAILS = [
  { name: "נחל עמוד", region: "גליל עליון", level: "בינוני", art: "galilee", text: "מעיינות, טחנות קמח ישנות ושביל לאורך הנחל" },
  { name: "שביל הנחש", region: "מצדה · ים המלח", level: "מאתגר", art: "desert", text: "עלייה עם הזריחה ונוף פתוח על ים המלח" },
  { name: "מכתש רמון", region: "הר הנגב", level: "בינוני", art: "ramon", text: "צבעי סלע, שקט מדברי ושמיים זרועי כוכבים" },
];

export default function Home() {
  const { user } = useOutletContext();
  const firstName = user.name.split(" ")[0];

  // הנתונים לכרטיסים – null עד שמגיעה תשובה מהשרת
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let ignore = false; // אם יצאנו מהעמוד לפני שהתשובה הגיעה – מתעלמים ממנה

    // שלוש בקשות במקביל – מחכים לכולן יחד
    Promise.all([getTodos(user.id), getUserPosts(user.id), getAlbums(user.id)])
      .then(([todos, posts, albums]) => {
        if (ignore) return;
        setStats({
          openTodos: todos.filter((t) => !t.completed).length,
          totalTodos: todos.length,
          posts: posts.length,
          albums: albums.length,
        });
      })
      .catch(() => {
        // אם השרת לא עונה – הכרטיסים פשוט יוצגו בלי מספרים
      });

    return () => {
      ignore = true;
    };
  }, [user.id]);

  // הכרטיסים – to יחסי לכתובת של המשתמש (/users/Bret → /users/Bret/todos)
  const cards = [
    {
      to: "todos",
      icon: "🎒",
      title: "ציוד ומשימות",
      value: stats?.openTodos,
      caption: stats ? `פתוחות מתוך ${stats.totalTodos}` : "משימות פתוחות",
    },
    {
      to: "posts",
      icon: "🥾",
      title: "המסלולים שלי",
      value: stats?.posts,
      caption: "מסלולים ששיתפת",
    },
    {
      to: "albums",
      icon: "📷",
      title: "אלבומים",
      value: stats?.albums,
      caption: "אלבומי טיולים",
    },
  ];

  return (
    <div className="page home">
      {/* ===== 1. תמונת הנוף ===== */}
      <section className="home-hero">
        <svg
          className="home-hero__art"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMax slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="home-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4c58e" />
              <stop offset="0.65" stopColor="#fbe6c4" />
              <stop offset="1" stopColor="#fdf3e0" />
            </linearGradient>
            <radialGradient id="home-sun-glow">
              <stop offset="0" stopColor="#fff6dd" stopOpacity="0.9" />
              <stop offset="1" stopColor="#fff6dd" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="1200" height="400" fill="url(#home-sky)" />

          {/* השמש – זורחת מאחורי ההרים */}
          <g className="home-hero__sun">
            <circle cx="300" cy="190" r="140" fill="url(#home-sun-glow)" />
            <circle cx="300" cy="190" r="52" fill="#fff1cf" />
          </g>

          {/* ציפורים */}
          <g className="home-hero__birds" fill="none" stroke="#7a5a3a" strokeWidth="2.5" strokeLinecap="round">
            <path d="M560 90 q10 -10 20 0 q10 -10 20 0" />
            <path d="M615 70 q7 -7 14 0 q7 -7 14 0" />
            <path d="M520 120 q6 -6 12 0 q6 -6 12 0" />
          </g>

          {/* שכבות ההרים – מהרחוקה לקרובה, כל אחת "עולה" בתורה */}
          <path
            className="home-hero__layer home-hero__layer--far"
            fill="#d9a77c"
            d="M0 255 L110 185 L210 225 L330 140 L450 215 L560 165 L690 230 L810 150 L930 210 L1050 170 L1200 220 L1200 400 L0 400 Z"
          />
          <path
            className="home-hero__layer home-hero__layer--mid"
            fill="#8fae7e"
            d="M0 300 C150 248 270 282 390 256 C530 226 650 292 790 266 C910 244 1050 282 1200 250 L1200 400 L0 400 Z"
          />
          <g className="home-hero__layer home-hero__layer--mid" fill="#5f8a5c">
            <path d="M160 285 l11 -32 l11 32 z" />
            <path d="M184 283 l8 -24 l8 24 z" />
            <path d="M700 282 l12 -36 l12 36 z" />
            <path d="M726 280 l9 -26 l9 26 z" />
            <path d="M1010 270 l11 -32 l11 32 z" />
          </g>
          <path
            className="home-hero__layer home-hero__layer--near"
            fill="#3f6f52"
            d="M0 345 C180 302 320 334 470 312 C640 288 770 342 930 318 C1050 300 1130 322 1200 306 L1200 400 L0 400 Z"
          />

          {/* השביל – קו מקווקו שנע, כאילו מישהו הולך בו */}
          <path
            className="home-hero__trail"
            fill="none"
            stroke="#f6dfb0"
            strokeWidth="5"
            strokeLinecap="round"
            d="M1180 400 C1080 372 990 358 890 352 C770 344 700 372 600 366 C500 360 430 340 330 346 C250 350 200 340 140 336"
          />
        </svg>

        <div className="home-hero__text">
          <p className="home-hero__eyebrow">שבילי ארץ · {getGreeting()}</p>
          <h2 className="home-hero__title">
            שלום {firstName},
            <br />
            לאן מטיילים השבוע?
          </h2>
          <Link to="posts?all=true" className="btn btn-primary home-hero__cta">
            לגלות מסלולים חדשים
          </Link>
        </div>
      </section>

      {/* ===== 2. כרטיסי קיצור ===== */}
      <section className="home-cards">
        {cards.map((card, index) => (
          <Link
            key={card.to}
            to={card.to}
            className="home-card card"
            style={{ "--delay": `${0.5 + index * 0.12}s` }} // כל כרטיס נכנס קצת אחרי הקודם
          >
            <span className="home-card__icon" aria-hidden="true">{card.icon}</span>
            <span className="home-card__title">{card.title}</span>
            <span className="home-card__value">{card.value ?? "–"}</span>
            <span className="home-card__caption">{card.caption}</span>
            <span className="home-card__arrow" aria-hidden="true">←</span>
          </Link>
        ))}
      </section>

      {/* ===== 3. השראה למסלול הבא ===== */}
      <section className="home-trails">
        <h3 className="home-section-title">השראה למסלול הבא</h3>
        <ul className="home-trails__list">
          {TRAILS.map((trail, index) => (
            <li
              key={trail.name}
              className="home-trail card"
              style={{ "--delay": `${0.85 + index * 0.12}s` }}
            >
              <div className={`home-trail__art home-trail__art--${trail.art}`}>
                <span className="home-trail__level">{trail.level}</span>
              </div>
              <div className="home-trail__body">
                <h4>{trail.name}</h4>
                <p className="home-trail__region">{trail.region}</p>
                <p className="muted">{trail.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
