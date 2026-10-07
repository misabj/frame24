import { ExternalLink, LogOut, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminVideoForm } from "@/components/admin-video-form";
import { isAuthenticated } from "@/lib/auth";
import { getVideos } from "@/lib/videos";
import { siteBrand } from "@/lib/site-content";
import { addVideo, editVideo, logout, removeVideo } from "./actions";

export const metadata = { title: "Portfolio admin" };

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const videos = await getVideos();

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div><Link className="login-brand" href="/" aria-label={`${siteBrand.name}, home`}><span>STUDIO</span><strong>MALSKO</strong></Link><p>Portfolio administration</p></div>
        <div className="admin-actions">
          <Link href="/work" target="_blank">View website <ExternalLink aria-hidden="true" /></Link>
          <form action={logout}><button type="submit" aria-label="Sign out"><LogOut aria-hidden="true" /></button></form>
        </div>
      </header>

      <section className="admin-content">
        <div className="admin-title"><div><p className="eyebrow">Vimeo portfolio</p><h1>Projects <span>{videos.length}</span></h1></div></div>
        <details className="add-panel">
          <summary><Plus aria-hidden="true" /> Add new video</summary>
          <AdminVideoForm action={addVideo} submitLabel="Add video" />
        </details>

        <div className="admin-list">
          {videos.map((video, index) => {
            const updateAction = editVideo.bind(null, video.id);
            const deleteAction = removeVideo.bind(null, video.id);
            return (
              <details className="admin-video" key={video.id}>
                <summary>
                  <span className="admin-order">{String(index + 1).padStart(2, "0")}</span>
                  <Image src={`https://vumbnail.com/${video.vimeoId}.jpg`} alt="" width={130} height={73} />
                  <span className="admin-video-name"><strong>{video.title}</strong><small>{video.client} · {video.category}</small></span>
                  {video.featured && <span className="status-pill">Featured</span>}
                  <span className="edit-label">Edit</span>
                </summary>
                <div className="admin-editor">
                  <AdminVideoForm action={updateAction} video={video} submitLabel="Save changes" />
                  <form action={deleteAction}><button className="danger-button" type="submit"><Trash2 aria-hidden="true" /> Delete video</button></form>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </main>
  );
}
