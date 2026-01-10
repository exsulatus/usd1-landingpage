import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="page newsPage">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">News</h1>
          <p className="pageLead">Quiet notes and links — optional context, not a feed to keep up with.</p>
        </div>

        <div className="card">
          <div className="sectionTitle" style={{ marginBottom: 6 }}>
            Notes from X
          </div>
          <p className="muted" style={{ marginTop: 0, marginBottom: 14 }}>
            A small curated list of posts we’ve referenced. Read whenever you want.
          </p>
          <Link className="btn" href="/news/announcements">
            Browse notes →
          </Link>
        </div>
      </div>
    </div>
  );
}


