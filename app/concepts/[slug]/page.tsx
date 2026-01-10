import Link from "next/link";
import { notFound } from "next/navigation";
import { getConceptBySlug } from "@/lib/search/concepts";
import { getLessonMeta } from "@/lib/lessons/registry";

export default function ConceptPage({ params }: { params: { slug: string } }) {
  const concept = getConceptBySlug(params.slug);
  if (!concept) return notFound();

  const primary = concept.primaryLessonId ? getLessonMeta(concept.primaryLessonId) : null;
  const related = (concept.relatedLessonIds ?? [])
    .map((id) => getLessonMeta(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">{concept.title}</h1>
          <p className="pageLead">{concept.description}</p>
        </div>

        <div className="card" style={{ maxWidth: 860 }}>
          <div style={{ fontWeight: 950, letterSpacing: "-0.02em", marginBottom: 8 }}>Where to start</div>

          {primary ? (
            <div style={{ display: "grid", gap: 6 }}>
              <Link className="btn btnPrimary" href={`/learn/${primary.id}`}>
                Read the lesson: {primary.title} →
              </Link>
              <div className="muted" style={{ fontSize: 14, lineHeight: 1.4 }}>
                {primary.summary}
              </div>
            </div>
          ) : (
            <div className="muted" style={{ fontSize: 14, lineHeight: 1.5 }}>
              We’re building this concept library over time. For now, explore the lessons list and come back soon.
            </div>
          )}

          {related.length ? (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 900, letterSpacing: "-0.01em", marginBottom: 8 }}>Related lessons</div>
              <div style={{ display: "grid", gap: 10 }}>
                {related.map((l) => (
                  <Link key={l.id} className="btn" href={`/learn/${l.id}`}>
                    {l.title} →
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div style={{ marginTop: 18 }}>
            <Link className="btn" href="/learn">
              Browse all lessons →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


