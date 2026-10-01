import { Save } from "lucide-react";
import type { Video } from "@/lib/videos";

export function AdminVideoForm({
  action,
  video,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  video?: Video;
  submitLabel: string;
}) {
  return (
    <form className="admin-form" action={action}>
      <div className="admin-field-grid">
        <label>Title<input name="title" required defaultValue={video?.title} placeholder="Project title" /></label>
        <label>Client<input name="client" required defaultValue={video?.client} placeholder="Client name" /></label>
        <label>Category<input name="category" required defaultValue={video?.category} placeholder="Brand film" /></label>
        <label>Year<input name="year" required defaultValue={video?.year ?? new Date().getFullYear()} inputMode="numeric" /></label>
        <label className="wide">Vimeo link or ID<input name="vimeo" required defaultValue={video?.vimeoId} placeholder="https://vimeo.com/123456789" /></label>
        <label className="wide">Description<textarea name="description" required rows={3} defaultValue={video?.description} placeholder="A short project description" /></label>
        <label>Display order<input name="sortOrder" type="number" defaultValue={video?.sortOrder ?? 0} /></label>
        <label className="check-label"><input name="featured" type="checkbox" defaultChecked={video?.featured} /> Featured project</label>
      </div>
      <button className="admin-primary" type="submit"><Save aria-hidden="true" /> {submitLabel}</button>
    </form>
  );
}
