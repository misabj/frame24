import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VideoShowcase } from "@/components/video-showcase";
import { getVideos } from "@/lib/videos";

export const metadata = { title: "Our work — FRAME/24" };

export default async function WorkPage() {
  const videos = await getVideos();

  return (
    <div className="public-site">
      <main className="inner-page">
        <div className="dark-header"><SiteHeader /></div>
        <header className="work-intro">
          <p className="eyebrow">Selected projects / 2024—2026</p>
          <h1>Work that<br />speaks <em>volumes.</em></h1>
          <p>Brand films, campaigns and documentary stories brought to life in the edit.</p>
        </header>
        <section className="all-work">
          {videos.map((video, index) => (
            <VideoShowcase key={video.id} video={video} index={index} />
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}