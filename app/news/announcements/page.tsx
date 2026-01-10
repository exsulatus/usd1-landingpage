import { ANNOUNCEMENTS } from "@/data/announcements";
import { AnnouncementsClient } from "@/components/AnnouncementsClient";

export default function AnnouncementsPage() {
  return (
    <div className="page newsPage">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Notes</h1>
          <p className="pageLead">Curated posts from X. Optional reading—click any card to open the original.</p>
        </div>

        <AnnouncementsClient items={ANNOUNCEMENTS} />
      </div>
    </div>
  );
}


