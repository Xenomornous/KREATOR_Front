"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #f8faf8, #eef5ef, #dde8df)",
        fontFamily: "Inter, sans-serif",
        color: "#123524"
      }}
    >
      {/* HEADER */}
      <header
        style={{
          width: "100%",
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <div
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "#123524"
          }}
        >
          EduPlatform
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/login">
            <button style={btnGhost}>
              Logowanie
            </button>
          </Link>

          <Link href="/register">
            <button style={btnPrimary}>
              Załóż konto
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px 10%",
          gap: "60px",
          flexWrap: "wrap"
        }}
      >
        <div style={{ flex: 1, minWidth: "320px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "#dff3e5",
              color: "#1f6b42",
              fontWeight: 600,
              marginBottom: "24px"
            }}
          >
            Platforma edukacyjna nowej generacji
          </div>

          <h1
            style={{
              fontSize: "64px",
              lineHeight: 1.1,
              marginBottom: "24px",
              color: "#122535",
              fontWeight: 900
            }}
          >
            Ucz się szybciej.
            <br />
            Twórz lepiej.
            <br />
            Rozwijaj się online.
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#4b5c63",
              lineHeight: 1.7,
              maxWidth: "650px",
              marginBottom: "32px"
            }}
          >
            Interaktywne moduły, kreator formularzy i nowoczesne
            narzędzia edukacyjne w jednym miejscu.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap"
            }}
          >
            <button style={btnPrimaryLarge}>
              Rozpocznij naukę
            </button>

            <button style={btnSecondaryLarge}>
              Zobacz możliwości
            </button>
          </div>
        </div>

        {/* MOCKUP */}
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "white",
              borderRadius: "28px",
              padding: "24px",
              boxShadow: "0 20px 60px rgba(18,53,36,0.12)",
              border: "1px solid rgba(18,53,36,0.08)"
            }}
          >
            <div
              style={{
                height: "240px",
                borderRadius: "18px",
                background:
                  "linear-gradient(135deg, #123524, #1f6b42, #5ea47b)",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "28px",
                fontWeight: 700
              }}
            >
              Dashboard edukacyjny
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px"
              }}
            >
              <Card
                title="Kursy"
                desc="Nowoczesne materiały"
              />

              <Card
                title="Moduły"
                desc="Nauka krok po kroku"
              />

              <Card
                title="Quizy"
                desc="Sprawdzaj wiedzę"
              />

              <Card
                title="Postępy"
                desc="Śledź rozwój"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "40px 10% 80px"
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px"
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "16px",
              color: "#123524"
            }}
          >
            Wszystko czego potrzebujesz
          </h2>

          <p
            style={{
              color: "#5d6f64",
              fontSize: "18px"
            }}
          >
            Jedna platforma do nauki, tworzenia i organizacji wiedzy.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px"
          }}
        >
          <FeatureCard
            title="Interaktywne kursy"
            desc="Buduj angażujące ścieżki edukacyjne."
          />

          <FeatureCard
            title="Kreator formularzy"
            desc="Twórz formularze metodą drag & drop."
          />

          <FeatureCard
            title="System modułów"
            desc="Organizuj naukę w przejrzysty sposób."
          />

          <FeatureCard
            title="Analityka postępów"
            desc="Monitoruj rozwój użytkowników."
          />
        </div>
      </section>

      {/* DEBUG NAV */}
      <section
        style={{
          padding: "40px 10%",
          borderTop: "1px solid rgba(0,0,0,0.06)"
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: "#123524"
          }}
        >
          Debug / Nawigacja
        </h3>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap"
          }}
        >
          <Link href="/kreator">
            <button style={btnPrimary}>
              Otwórz kreator
            </button>
          </Link>

          <Link href="/modules">
            <button style={btnSecondary}>
              Moduły
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* COMPONENTS */

function Card({
  title,
  desc
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "#f8fbf8",
        borderRadius: "18px",
        padding: "20px",
        border: "1px solid rgba(18,53,36,0.08)"
      }}
    >
      <div
        style={{
          fontWeight: 700,
          marginBottom: "8px",
          color: "#123524"
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#5d6f64",
          fontSize: "14px"
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  desc
}: {
  title: string;
  desc: string;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "24px",
        padding: "28px",
        boxShadow: "0 10px 30px rgba(18,53,36,0.06)",
        border: "1px solid rgba(18,53,36,0.06)"
      }}
    >
      <div
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "14px",
          background: "#dff3e5",
          marginBottom: "20px"
        }}
      />

      <h3
        style={{
          marginBottom: "12px",
          color: "#123524"
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#607367",
          lineHeight: 1.6
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* BUTTONS */

const btnPrimary = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "none",
  background: "#1f6b42",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  transition: "0.2s"
};

const btnPrimaryLarge = {
  ...btnPrimary,
  padding: "16px 26px",
  fontSize: "16px"
};

const btnSecondary = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "1px solid #d6e2d9",
  background: "white",
  color: "#123524",
  fontWeight: 600,
  cursor: "pointer"
};

const btnSecondaryLarge = {
  ...btnSecondary,
  padding: "16px 26px",
  fontSize: "16px"
};

const btnGhost = {
  padding: "12px 18px",
  borderRadius: "12px",
  border: "1px solid rgba(18,53,36,0.1)",
  background: "transparent",
  color: "#123524",
  fontWeight: 600,
  cursor: "pointer"
};