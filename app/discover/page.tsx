import { ArticlesClient } from "@/components/ArticlesClient";
import { ARTICLES } from "@/data/articles";

export default function DiscoverPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Discover</h1>
          <p className="pageLead">Curated articles to go deeper when you’re ready.</p>
        </div>

        <ArticlesClient items={ARTICLES} />
      </div>
    </div>
  );
}


