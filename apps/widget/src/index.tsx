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
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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

    try {
      const res = await fetch(
        `${window.location.origin}/api/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            project_id: projectId,
            customer_name: name,
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

  return h(
    "div",
    {
      style: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#333",
      },
    },
    submitted
      ? h(
          "div",
          { style: { padding: "16px", textAlign: "center" } },
          h(
            "p",
            { style: { color: "green" } },
            "Thank you for your review!"
          )
        )
      : h(
          "form",
          { onSubmit: handleSubmit, style: { padding: "16px" } },
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", null, "Your Name"),
            h("input", {
              type: "text",
              value: name,
              onInput: (e) => setName((e.target as HTMLInputElement).value),
              placeholder: "John Doe",
              required: true,
              style: {
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              },
            })
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", null, "Rating"),
            h(
              "select",
              {
                value: rating,
                onChange: (e) =>
                  setRating(parseInt((e.target as HTMLSelectElement).value)),
                style: {
                  width: "100%",
                  padding: "8px",
                  marginTop: "4px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                },
              },
              [5, 4, 3, 2, 1].map((r) =>
                h("option", { value: r }, `${r} Star${r > 1 ? "s" : ""}`)
              )
            )
          ),
          h(
            "div",
            { style: { marginBottom: "16px" } },
            h("label", null, "Comment"),
            h("textarea", {
              value: comment,
              onInput: (e) =>
                setComment((e.target as HTMLTextAreaElement).value),
              placeholder: "Share your experience...",
              style: {
                width: "100%",
                padding: "8px",
                marginTop: "4px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                minHeight: "80px",
                boxSizing: "border-box",
                fontFamily: "inherit",
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
                padding: "10px",
                backgroundColor: config.settings.color,
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: submitting ? "not-allowed" : "pointer",
                opacity: submitting ? 0.6 : 1,
                fontWeight: "bold",
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
                    color: "#999",
                  },
                },
                "Powered by ",
                h("a", { href: "https://ratecoo.com" }, "RateCoo")
              )
            : null
        )
  );
}

// Get project ID from script src or data attribute
const scripts = document.getElementsByTagName("script");
let projectId = "demo-project";

for (let script of scripts) {
  const src = script.src;
  if (src.includes("widget.js")) {
    projectId = src.split("project=")[1] || projectId;
    break;
  }
  const dataProject = script.getAttribute("data-project");
  if (dataProject) {
    projectId = dataProject;
    break;
  }
}

// Mount widget
const container = document.getElementById("ratecoo-widget");
if (container) {
  render(h(ReviewWidget, { projectId }), container);
}
