"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f8faf8",
        fontFamily: "Inter, sans-serif",
        color: "#123524"
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",
          background: "white",
          borderRight: "1px solid #e3ebe5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px",
          position: "sticky",
          top: 0,
          height: "100vh"
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
                fontSize: "28px",
                fontWeight: 900,
                color: "#123524"
              }}
            >
              EduPlatform
            </div>

            <div
              style={{
                color: "#6b7b72",
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
                color: "#6b7b72",
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
            borderTop: "1px solid #edf2ee"
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
                background: "#dff3e5"
              }}
            />

            <div>
              <div
                style={{
                  fontWeight: 700
                }}
              >
                Jan Kowalski
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7b72"
                }}
              >
                Student
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
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e3ebe5",
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
                color: "#6b7b72",
                marginBottom: "4px"
              }}
            >
              Dashboard / Home
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px"
              }}
            >
              Welcome back 👋
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
                borderRadius: "12px",
                border: "1px solid #dce5de",
                background: "white",
                outline: "none",
                width: "240px"
              }}
            />

            <button style={headerButton}>
              Notifications
            </button>

            <button style={headerButton}>
              Profile
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
          background: active ? "#123524" : "transparent",
          color: active ? "white" : "#123524",
          fontWeight: 600,
          transition: "0.2s"
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
          borderRadius: "16px",
          background: "#f8fbf8",
          border: "1px solid #e3ebe5",
          cursor: "pointer"
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: "6px",
            color: "#123524"
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#6b7b72",
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
        background: "white",
        padding: "24px",
        borderRadius: "24px",
        border: "1px solid #e5ece7",
        boxShadow: "0 10px 30px rgba(18,53,36,0.04)"
      }}
    >
      <div
        style={{
          color: "#6b7b72",
          marginBottom: "12px"
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "38px",
          fontWeight: 900,
          color: "#123524"
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
          background: "white",
          borderRadius: "26px",
          padding: "28px",
          border: "1px solid #e5ece7",
          boxShadow: "0 12px 35px rgba(18,53,36,0.05)"
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "#dff3e5",
            marginBottom: "20px"
          }}
        />

        <div
          style={{
            fontSize: "26px",
            fontWeight: 800,
            marginBottom: "10px",
            color: "#123524"
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#5f7167",
            marginBottom: "6px"
          }}
        >
          {lesson}
        </div>

        <div
          style={{
            color: "#6b7b72",
            marginBottom: "20px"
          }}
        >
          {lecture}
        </div>

        <div
          style={{
            height: "10px",
            background: "#edf3ee",
            borderRadius: "999px",
            overflow: "hidden",
            marginBottom: "12px"
          }}
        >
          <div
            style={{
              width: progress,
              height: "100%",
              background: "#1f6b42"
            }}
          />
        </div>

        <div
          style={{
            color: "#1f6b42",
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
        background: "white",
        border: "1px solid #e5ece7",
        borderRadius: "18px",
        padding: "18px 22px",
        color: "#4e6257"
      }}
    >
      {text}
    </div>
  );
}

/* STYLES */

const headerButton = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #dce5de",
  background: "white",
  cursor: "pointer",
  fontWeight: 600,
  color: "#123524"
};