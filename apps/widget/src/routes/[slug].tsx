import { h, render } from "preact";
import { useEffect, useState } from "preact/hooks";

interface Project {
  id: string;
  name: string;
  slug: string;
  settings: {
    color: string;
    show_branding: boolean;
    auto_approve_status: "pending" | "approved";
  };
}

export default function WidgetBySlug({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        // Call the API endpoint to get project by slug using absolute URL
        const response = await fetch(`https://admin.ratecoo.com/api/projects/slug/${slug}`);
        
        if (!response.ok) {
          throw new Error("Project not found");
        }
        
        const projectData = await response.json();
        setProject(projectData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProjectBySlug();
    }
  }, [slug]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Use the new endpoint that accepts reviews by project slug with absolute URL
      const response = await fetch(`https://admin.ratecoo.com/api/reviews/slug/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: name,
          customer_email: email,
          customer_whatsapp: whatsapp,
          rating,
          comment,
          source: "widget",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setTimeout(() => {
          setName("");
          setEmail("");
          setWhatsapp("");
          setRating(5);
          setComment("");
          setSubmitted(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Failed to submit review", err);
      setError(err instanceof Error ? err.message : "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return h("div", { 
      style: {
        padding: "16px",
        textAlign: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    }, "Loading widget...");
  }

  if (error) {
    return h("div", { 
      style: {
        padding: "16px",
        textAlign: "center",
        color: "#ef4444",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    }, error);
  }

  if (!project) {
    return h("div", { 
      style: {
        padding: "16px",
        textAlign: "center",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }
    }, "Project not found");
  }

  // Enhanced widget UI with better styling
  return h("div", { 
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: "400px",
      margin: "0 auto",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12), 0 0 60px rgba(255, 255, 255, 0.5)",
      padding: "0"
    }
  },
    submitted 
      ? h("div", { 
          style: { 
            padding: "24px", 
            textAlign: "center",
            color: "#10b981"
          }
        }, "Thank you for your review!")
      : h("form", { 
          onSubmit: handleSubmit,
          style: {
            padding: "24px",
            background: "#ffffff",
            borderRadius: "12px"
          }
        },
        h("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px"
          }
        },
          h("h2", { 
            style: { 
              fontWeight: 700, 
              color: "#0f172a", 
              fontSize: "20px",
              margin: 0
            }
          }, `Review ${project.name}`),
        ),
        
        h("div", { style: { marginBottom: "16px" } },
          h("label", { 
            style: { 
              color: "#0f172a", 
              fontWeight: 600,
              display: "block",
              marginBottom: "6px"
            } 
          }, "Your Name"),
          h("input", {
            type: "text",
            value: name,
            onInput: (e) => setName((e.target as HTMLInputElement).value),
            placeholder: "John Doe",
            required: true,
            style: {
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              boxSizing: "border-box",
              background: "#ffffff",
              color: "#0f172a"
            }
          })
        ),
        
        h("div", { style: { marginBottom: "16px" } },
          h("label", { 
            style: { 
              color: "#0f172a", 
              fontWeight: 600,
              display: "block",
              marginBottom: "6px"
            } 
          }, "Email"),
          h("input", {
            type: "email",
            value: email,
            onInput: (e) => setEmail((e.target as HTMLInputElement).value),
            placeholder: "john@example.com",
            required: true,
            style: {
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              boxSizing: "border-box",
              background: "#ffffff",
              color: "#0f172a"
            }
          })
        ),
        
        h("div", { style: { marginBottom: "16px" } },
          h("label", { 
            style: { 
              color: "#0f172a", 
              fontWeight: 600,
              display: "block",
              marginBottom: "6px"
            } 
          }, "WhatsApp Number"),
          h("input", {
            type: "tel",
            value: whatsapp,
            onInput: (e) => setWhatsapp((e.target as HTMLInputElement).value),
            placeholder: "62812345678",
            required: true,
            style: {
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              boxSizing: "border-box",
              background: "#ffffff",
              color: "#0f172a"
            }
          })
        ),
        
        h("div", { style: { marginBottom: "16px" } },
          h("label", { 
            style: { 
              color: "#0f172a", 
              fontWeight: 600,
              display: "block",
              marginBottom: "6px"
            } 
          }, "Rating"),
          h("div", {
            style: {
              display: "flex",
              gap: "8px",
              marginTop: "4px",
              fontSize: "32px"
            }
          },
            [1, 2, 3, 4, 5].map((star) =>
              h("span", {
                key: star,
                onClick: () => setRating(star),
                onMouseEnter: () => setHoverRating(star),
                onMouseLeave: () => setHoverRating(0),
                style: {
                  cursor: "pointer",
                  color: (hoverRating || rating) >= star ? "#f59e0b" : "#d1d5db",
                  transition: "color 0.2s",
                  userSelect: "none"
                }
              }, "★")
            )
          )
        ),
        
        h("div", { style: { marginBottom: "20px" } },
          h("label", { 
            style: { 
              color: "#0f172a", 
              fontWeight: 600,
              display: "block",
              marginBottom: "6px"
            } 
          }, "Comment"),
          h("textarea", {
            value: comment,
            onInput: (e: any) => setComment((e.target as HTMLTextAreaElement).value),
            placeholder: "Share your experience...",
            style: {
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              minHeight: "90px",
              boxSizing: "border-box",
              fontFamily: "inherit",
              background: "#ffffff",
              color: "#0f172a"
            }
          })
        ),

        h("button", {
          type: "submit",
          disabled: submitting,
          style: {
            width: "100%",
            padding: "12px",
            backgroundColor: project.settings.color || "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
            fontWeight: "bold",
            boxShadow: "0 12px 25px rgba(99,102,241,0.25)",
            transition: "transform 0.2s ease"
          }
        }, submitting ? "Submitting..." : "Submit Review"),
        
        project.settings.show_branding
          ? h("div", {
              style: {
                marginTop: "16px",
                textAlign: "center",
                fontSize: "12px",
                color: "#64748b"
              }
            },
            "Powered by ",
            h("a", { 
              href: "https://ratecoo.com", 
              style: { 
                color: project.settings.color || "#3B82F6", 
                fontWeight: 600,
                textDecoration: "none"
              } 
            }, "RateCoo")
          )
          : null
      )
  );
}