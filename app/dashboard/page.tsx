"use client";

import Link from "next/link";
import { useAuth } from "../../src/context/AuthContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  console.log(user);
  
  return (
    
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        background:
          "linear-gradient(to bottom right, #f4f7fb, #eef4ff)",
        fontFamily: "Inter, sans-serif",
        color: "#0f172a"
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",
          background: "#0f172a",
          borderRight: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px",
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: "0 0 40px rgba(0,0,0,0.15)"
        }}
      >
        <div>
          {/* LOGO */}
          <div
            style={{
              marginBottom: "40px"
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: 900,
                color: "white"
              }}
            >
              EduPlatform
            </div>

            <div
              style={{
                color: "#94a3b8",
                marginTop: "6px",
                fontSize: "14px"
              }}
            >
              Learning Dashboard
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "36px"
            }}
          >
            <SidebarItem
              active
              label="Dashboard"
              href="/dashboard"
            />

            <SidebarItem
              label="Modules"
              href="/modules"
            />

            <SidebarItem
              label="Progress"
              href="/progress"
            />

            <SidebarItem
              label="Settings"
              href="/settings"
            />
          </div>

          {/* MODULES */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#64748b",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              Your Modules
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <ModuleItem
                title="English"
                lessons="12 lessons"
                href="/modules/english"
              />

              <ModuleItem
                title="Mathematics"
                lessons="8 lessons"
                href="/modules/math"
              />

              <ModuleItem
                title="Physics"
                lessons="5 lessons"
                href="/modules/physics"
              />
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div
          style={{
            paddingTop: "20px",
            borderTop: "1px solid #1e293b"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "999px",
                background:
                  "linear-gradient(135deg,#2563eb,#60a5fa)"
              }}
            />

            <div>
              <div
                style={{
                  fontWeight: 700,
                  color: "white"
                }}
              >
                {user?.username}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#94a3b8"
                }}
              >
                {user?.role}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: "90px",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid #dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            position: "sticky",
            top: 0,
            zIndex: 50
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "4px"
              }}
            >
              Dashboard / Home
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "30px",
                fontWeight: 800
              }}
            >
              Welcome back, {user?.username} 👋
            </h1>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}
          >
            <input
              placeholder="Search..."
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                border: "1px solid #dbeafe",
                background: "white",
                outline: "none",
                width: "240px",
                boxShadow:
                  "0 4px 20px rgba(37,99,235,0.05)"
              }}
            />

            <button style={headerButton}>
              Notifications
            </button>

            <button style={headerButton}>
              Profile
            </button>
            <button style={headerButton}
            onClick={logout}
          >
            Logout
          </button>
          </div>
        </header>

        {/* MAIN */}
        <div
          style={{
            padding: "40px"
          }}
        >
          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "40px"
            }}
          >
            <StatCard
              title="Completed Lessons"
              value="24"
            />

            <StatCard
              title="Current Modules"
              value="3"
            />

            <StatCard
              title="Tasks Completed"
              value="87%"
            />

            <StatCard
              title="Certificates"
              value="2"
            />
          </div>

          {/* CONTINUE LEARNING */}
          <div
            style={{
              marginBottom: "50px"
            }}
          >
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "28px"
              }}
            >
              Continue Learning
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px"
              }}
            >
              <CourseCard
                title="English"
                lesson="Lesson 1"
                lecture="Introduction"
                progress="72%"
                href="/modules/english/lesson1"
              />

              <CourseCard
                title="Mathematics"
                lesson="Algebra"
                lecture="Equations"
                progress="45%"
                href="/modules/math/algebra"
              />

              <CourseCard
                title="Physics"
                lesson="Motion"
                lecture="Velocity"
                progress="21%"
                href="/modules/physics/motion"
              />
            </div>
          </div>

          {/* RECENT */}
          <div>
            <h2
              style={{
                marginBottom: "24px",
                fontSize: "28px"
              }}
            >
              Recent Activity
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <ActivityItem text="Completed lecture: English / Introduction" />
              <ActivityItem text="Started module: Physics" />
              <ActivityItem text="Updated profile settings" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* COMPONENTS */

function SidebarItem({
  label,
  href,
  active = false
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none"
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderRadius: "14px",
          background: active
            ? "linear-gradient(135deg,#2563eb,#3b82f6)"
            : "transparent",
          color: "white",
          fontWeight: 600,
          transition: "0.25s ease",
          cursor: "pointer"
        }}
      >
        {label}
      </div>
    </Link>
  );
}

function ModuleItem({
  title,
  lessons,
  href
}: {
  title: string;
  lessons: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none"
      }}
    >
      <div
        style={{
          padding: "16px",
          borderRadius: "18px",
          background: "#111c31",
          border: "1px solid #1e293b",
          cursor: "pointer",
          transition: "0.25s ease"
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: "6px",
            color: "white"
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "14px"
          }}
        >
          {lessons}
        </div>
      </div>
    </Link>
  );
}

function StatCard({
  title,
  value
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.8)",
        padding: "24px",
        borderRadius: "24px",
        border: "1px solid #dbeafe",
        boxShadow:
          "0 10px 40px rgba(37,99,235,0.08)",
        backdropFilter: "blur(12px)",
        transition: "0.25s ease"
      }}
    >
      <div
        style={{
          color: "#64748b",
          marginBottom: "12px"
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "40px",
          fontWeight: 900,
          color: "#2563eb"
        }}
      >
        {value}
      </div>
    </div>
  );
}

function CourseCard({
  title,
  lesson,
  lecture,
  progress,
  href
}: {
  title: string;
  lesson: string;
  lecture: string;
  progress: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none"
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          borderRadius: "28px",
          padding: "28px",
          border: "1px solid #dbeafe",
          boxShadow:
            "0 12px 40px rgba(37,99,235,0.08)",
          transition: "0.25s ease",
          cursor: "pointer"
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background:
              "linear-gradient(135deg,#2563eb,#60a5fa)",
            marginBottom: "20px"
          }}
        />

        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            marginBottom: "10px",
            color: "#0f172a"
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#475569",
            marginBottom: "6px"
          }}
        >
          {lesson}
        </div>

        <div
          style={{
            color: "#64748b",
            marginBottom: "20px"
          }}
        >
          {lecture}
        </div>

        <div
          style={{
            height: "10px",
            background: "#e2e8f0",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "12px"
          }}
        >
          <div
            style={{
              width: progress,
              height: "100%",
              background:
                "linear-gradient(90deg,#2563eb,#60a5fa)"
            }}
          />
        </div>

        <div
          style={{
            color: "#2563eb",
            fontWeight: 700
          }}
        >
          {progress} completed
        </div>
      </div>
    </Link>
  );
}

function ActivityItem({
  text
}: {
  text: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.85)",
        border: "1px solid #dbeafe",
        borderRadius: "18px",
        padding: "18px 22px",
        color: "#334155",
        boxShadow:
          "0 8px 30px rgba(37,99,235,0.05)"
      }}
    >
      {text}
    </div>
  );
}

/* STYLES */

const headerButton = {
  padding: "12px 16px",
  borderRadius: "14px",
  border: "1px solid #dbeafe",
  background: "#eff6ff",
  cursor: "pointer",
  fontWeight: 700,
  color: "#2563eb",
  transition: "0.25s ease",
  boxShadow: "0 4px 20px rgba(37,99,235,0.06)"
};