import { ARTICLES } from "@/data/articles";
import { ArticlesClient } from "@/components/ArticlesClient";

export default function ArticlesPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Articles on X</h1>
          <p className="pageLead">
            A simple list of educational articles. We keep it manual and curated on purpose.
          </p>
        </div>
        <ArticlesClient items={ARTICLES} />
      </div>
    </div>
  );
}


