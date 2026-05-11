"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(to bottom right, #f8faf8, #edf5ef, #dde8df)",
        fontFamily: "Inter, sans-serif"
      }}
    >
      {/* LEFT SIDE */}
      <section
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px"
        }}
      >
        <div
          style={{
            maxWidth: "520px"
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "#dff3e5",
              color: "#1f6b42",
              fontWeight: 700,
              marginBottom: "24px"
            }}
          >
            EduPlatform
          </div>

          <h1
            style={{
              fontSize: "58px",
              lineHeight: 1.1,
              color: "#123524",
              marginBottom: "24px",
              fontWeight: 900
            }}
          >
            Witaj ponownie 👋
          </h1>

          <p
            style={{
              color: "#5b6f63",
              fontSize: "18px",
              lineHeight: 1.7
            }}
          >
            Zaloguj się do platformy i kontynuuj naukę,
            zarządzaj modułami oraz twórz nowe formularze.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "18px"
            }}
          >
            <Feature text="Dostęp do wszystkich kursów" />
            <Feature text="Śledzenie postępów nauki" />
            <Feature text="Nowoczesny kreator drag & drop" />
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section
        style={{
          width: "520px",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.05)"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "380px"
          }}
        >
          <div
            style={{
              marginBottom: "36px"
            }}
          >
            <h2
              style={{
                fontSize: "36px",
                color: "#123524",
                marginBottom: "12px"
              }}
            >
              Logowanie
            </h2>

            <p
              style={{
                color: "#6b7b72"
              }}
            >
              Wprowadź dane aby kontynuować
            </p>
          </div>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >
            <div>
              <label style={label}>
                Email
              </label>

              <input
                type="email"
                placeholder="twoj@email.com"
                style={input}
              />
            </div>

            <div>
              <label style={label}>
                Hasło
              </label>

              <input
                type="password"
                placeholder="••••••••"
                style={input}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "14px"
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#5b6f63"
                }}
              >
                <input type="checkbox" />
                Zapamiętaj mnie
              </label>

              <Link
                href="/forgot-password"
                style={{
                  color: "#1f6b42",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                Zapomniałeś hasła?
              </Link>
            </div>

            <button
              type="submit"
              style={loginButton}
            >
              Zaloguj się
            </button>
          </form>

          <div
            style={{
              marginTop: "28px",
              textAlign: "center",
              color: "#5b6f63"
            }}
          >
            Nie masz konta?{" "}
            <Link
              href="/register"
              style={{
                color: "#1f6b42",
                fontWeight: 700,
                textDecoration: "none"
              }}
            >
              Załóż konto
            </Link>
          </div>

          {/* DEBUG */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid #e7ece8",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <Link href="/">
              <button style={debugBtn}>
                Home
              </button>
            </Link>

            <Link href="/register">
              <button style={debugBtn}>
                Register
              </button>
            </Link>

            <Link href="/dashboard">
              <button style={debugBtn}>
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* FEATURE */

function Feature({
  text
}: {
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px"
      }}
    >
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "999px",
          background: "#1f6b42"
        }}
      />

      <span
        style={{
          color: "#4f6157",
          fontSize: "16px"
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* STYLES */

const label = {
  display: "block",
  marginBottom: "10px",
  color: "#234434",
  fontWeight: 600
};

const input = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #d8e3db",
  background: "#f8fbf8",
  outline: "none",
  fontSize: "15px",
  color: "#123524",
  boxSizing: "border-box" as const
};

const loginButton = {
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  background: "#1f6b42",
  color: "white",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  boxShadow: "0 10px 25px rgba(31,107,66,0.25)"
};

const debugBtn = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #d7e2d9",
  background: "white",
  cursor: "pointer",
  color: "#123524",
  fontWeight: 600
};