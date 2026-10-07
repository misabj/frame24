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
        <section className="work-banner">
          <SiteHeader />
          <header className="work-intro">
            <p className="eyebrow">Stories brought to life through film</p>
            <h1>BRAND FILMS · CAMPAIGNS · MUSIC VIDEOS · DOCUMENTARY</h1>
          </header>
        </section>
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