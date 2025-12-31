import { ANNOUNCEMENTS } from "@/data/announcements";
import { AnnouncementsClient } from "@/components/AnnouncementsClient";

export default function AnnouncementsPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="pageHeader">
          <h1 className="pageTitle">Announcements</h1>
          <p className="pageLead">Curated posts from X. Click any card to open the original post.</p>
        </div>

        <AnnouncementsClient items={ANNOUNCEMENTS} />
      </div>
    </div>
  );
}


