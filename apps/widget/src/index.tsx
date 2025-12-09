import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";

interface WidgetConfig {
  id: string;
  name: string;
  settings: {
    color: string;
    show_branding: boolean;
    auto_approve_status: "pending" | "approved";
  };
}

function ReviewWidget({ projectId }: { projectId: string }) {
  const [isDark, setIsDark] = useState(false);
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("widget-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = stored ? stored === "dark" : prefersDark;
      setIsDark(initial);
    } catch (e) {
      // ignore storage issues
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("ratecoo-widget-dark", isDark);
    try {
      localStorage.setItem("widget-theme", isDark ? "dark" : "light");
    } catch (e) {
      // ignore storage issues
    }
  }, [isDark]);

  useEffect(() => {
    // For development, use mock data if API not available
    const isDev = (import.meta as any).env?.DEV || false;    
    if (isDev) {
      // Mock config for development
      setConfig({
        id: projectId,
        name: "Demo Project",
        settings: {
          color: "#6366f1",
          show_branding: true,
          auto_approve_status: "pending",
        },
      });
      setLoading(false);
      return;
    }

    // Fetch widget config
    fetch(`${window.location.origin}/api/custom/widget/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load widget config", err);
        setLoading(false);
      });
  }, [projectId]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);

    // For development, just simulate success
    const isDev = false; // Disabled for production
    
    if (isDev) {
      console.log("Dev mode - Review submitted:", { name, email, whatsapp, rating, comment });
      setTimeout(() => {
        setSubmitted(true);
        setTimeout(() => {
          setName("");
          setEmail("");
          setWhatsapp("");
          setRating(5);
          setComment("");
          setSubmitted(false);
        }, 2000);
        setSubmitting(false);
      }, 500);
      return;
    }

    try {
      const res = await fetch(
        `https://admin.ratecoo.com/api/reviews/slug/risefest`, //hardcode sementara
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_id: projectId,
            customer_name: name,
            customer_email: email,
            customer_whatsapp: whatsapp,
            rating,
            comment,
            source: "widget",
          }),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setName("");
          setEmail("");
          setWhatsapp("");
          setRating(5);
          setComment("");
          setSubmitted(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return h("div", null, "Loading widget...");
  }

  if (!config) {
    return h("div", null, "Failed to load widget");
  }
  const colors = isDark
    ? {
        background: "#0b1220",
        card: "#0f172a",
        text: "#e5e7eb",
        muted: "#94a3b8",
        border: "#1f2937",
        inputBg: "#0b1626",
        inputBorder: "#1f2937",
        starActive: "#fbbf24",
        starInactive: "#334155",
      }
    : {
        background: "#f8fafc",
        card: "#ffffff",
        text: "#0f172a",
        muted: "#475569",
        border: "#e2e8f0",
        inputBg: "#ffffff",
        inputBorder: "#d1d5db",
        starActive: "#f59e0b",
        starInactive: "#d1d5db",
      };

  const toggleTheme = () => setIsDark((prev) => !prev);

  return h(
    "div",
    {
      style: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: colors.text,
        background: colors.background,
        borderRadius: "12px",
        boxShadow: isDark
          ? "0 25px 60px rgba(0,0,0,0.45), 0 0 60px rgba(255, 255, 255, 0.2)"
          : "0 15px 35px rgba(15, 23, 42, 0.12), 0 0 60px rgba(255, 255, 255, 0.5)",
        padding: "0",
      },
    },
    submitted
      ? h(
          "div",
          { style: { padding: "16px", textAlign: "center" } },
          h(
            "p",
            { style: { color: isDark ? "#4ade80" : "green" } },
            "Thank you for your review!"
          )
        )
      : h(
          "form",
          {
            onSubmit: handleSubmit,
            style: {
              padding: "16px",
              background: colors.card,
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              boxShadow: isDark
                ? "0 20px 40px rgba(0,0,0,0.35), 0 0 40px rgba(255, 255, 255, 0.15)"
                : "0 12px 30px rgba(15, 23, 42, 0.08), 0 0 40px rgba(255, 255, 255, 0.4)",
            },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              },
            },
            h(
              "div",
              { style: { fontWeight: 700, color: colors.text, fontSize: "16px" } },
              config.name || "Review Widget"
            ),
            h(
              "button",
              {
                type: "button",
                onClick: toggleTheme,
                style: {
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                  background: isDark ? "#111827" : "#f8fafc",
                  color: colors.text,
                  cursor: "pointer",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                },
              },
              isDark ? "☀️ Light" : "🌙 Dark"
            )
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", { style: { color: colors.text, fontWeight: 600 } }, "Your Name"),
            h("input", {
              type: "text",
              value: name,
              onInput: (e) => setName((e.target as HTMLInputElement).value),
              placeholder: "John Doe",
              required: true,
              style: {
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: `1px solid ${colors.inputBorder}`,
                borderRadius: "8px",
                boxSizing: "border-box",
                background: colors.inputBg,
                color: colors.text,
              },
            })
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", { style: { color: colors.text, fontWeight: 600 } }, "Email"),
            h("input", {
              type: "email",
              value: email,
              onInput: (e) => setEmail((e.target as HTMLInputElement).value),
              placeholder: "john@example.com",
              required: true,
              style: {
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: `1px solid ${colors.inputBorder}`,
                borderRadius: "8px",
                boxSizing: "border-box",
                background: colors.inputBg,
                color: colors.text,
              },
            })
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", { style: { color: colors.text, fontWeight: 600 } }, "WhatsApp Number"),
            h("input", {
              type: "tel",
              value: whatsapp,
              onInput: (e) => {
                let value = (e.target as HTMLInputElement).value;
                // Remove + symbol if present
                value = value.replace(/\+/g, '');
                setWhatsapp(value);
              },
              placeholder: "62812345678",
              required: true,
              style: {
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: `1px solid ${colors.inputBorder}`,
                borderRadius: "8px",
                boxSizing: "border-box",
                background: colors.inputBg,
                color: colors.text,
              },
            })
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", { style: { color: colors.text, fontWeight: 600 } }, "Rating"),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  gap: "8px",
                  marginTop: "4px",
                  fontSize: "32px",
                },
              },
              [1, 2, 3, 4, 5].map((star) =>
                h(
                  "span",
                  {
                    key: star,
                    onClick: () => setRating(star),
                    onMouseEnter: () => setHoverRating(star),
                    onMouseLeave: () => setHoverRating(0),
                    style: {
                      cursor: "pointer",
                      color:
                        (hoverRating || rating) >= star
                          ? colors.starActive
                          : colors.starInactive,
                      transition: "color 0.2s",
                      userSelect: "none",
                    },
                  },
                  "★"
                )
              )
            )
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", { style: { color: colors.text, fontWeight: 600 } }, "Comment"),
            h("textarea", {
              value: comment,
              onInput: (e: any) =>
                setComment((e.target as HTMLTextAreaElement).value),
              placeholder: "Share your experience...",
              style: {
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                border: `1px solid ${colors.inputBorder}`,
                borderRadius: "8px",
                minHeight: "90px",
                boxSizing: "border-box",
                fontFamily: "inherit",
                background: colors.inputBg,
                color: colors.text,
              },
            })
          ),
          h(
            "button",
            {
              type: "submit",
              disabled: submitting,
              style: {
                width: "100%",
                padding: "12px",
                backgroundColor: config.settings.color,
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.6 : 1,
                fontWeight: "bold",
                boxShadow: isDark
                  ? "0 12px 25px rgba(99,102,241,0.25)"
                  : "0 12px 25px rgba(99,102,241,0.25)",
                transition: "transform 0.2s ease",
              },
            },
            submitting ? "Submitting..." : "Submit Review"
          ),
          config.settings.show_branding
            ? h(
                "div",
                {
                  style: {
                    marginTop: "12px",
                    textAlign: "center",
                    fontSize: "12px",
                    color: colors.muted,
                  },
                },
                "Powered by ",
                h("a", { href: "https://ratecoo.com", style: { color: config.settings.color, fontWeight: 600 } }, "RateCoo")
              )
            : null
        )
  );
}

// Get project ID or slug from script src or data attributes
const scripts = document.getElementsByTagName("script");
let projectId = "demo-project";
let projectSlug = "";

for (let script of scripts) {
  const src = script.src;
  if (src.includes("widget.js")) {
    // Check for project ID parameter
    if (src.includes("project=")) {
      projectId = src.split("project=")[1].split("&")[0] || projectId;
    }
    // Check for slug parameter
    if (src.includes("slug=")) {
      projectSlug = src.split("slug=")[1].split("&")[0] || "";
    }
    break;
  }
  
  // Check data attributes
  const dataProject = script.getAttribute("data-project");
  if (dataProject) {
    projectId = dataProject;
  }
  
  const dataSlug = script.getAttribute("data-slug");
  if (dataSlug) {
    projectSlug = dataSlug;
  }
  
  if (dataProject || dataSlug) {
    break;
  }
}

// Mount widget
const container = document.getElementById("ratecoo-widget");
if (container) {
  // If we have a slug, use the slug-based widget
  if (projectSlug) {
    import("./routes/[slug]").then(module => {
      const WidgetBySlug = module.default;
      render(h(WidgetBySlug, { slug: projectSlug }), container);
    });
  } else {
    // Otherwise use the existing project ID-based widget
    render(h(ReviewWidget, { projectId }), container);
  }
}
