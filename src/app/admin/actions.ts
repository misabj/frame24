"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, isAuthenticated, passwordMatches } from "@/lib/auth";
import { createVideo, deleteVideo, updateVideo, type VideoInput } from "@/lib/videos";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function vimeoId(value: string) {
  const match = value.match(/(?:vimeo\.com\/(?:video\/)?|^)(\d+)(?:$|[?/])/);
  if (!match) throw new Error("Invalid Vimeo link or ID.");
  return match[1];
}

function videoFrom(formData: FormData): VideoInput {
  const video = {
    title: text(formData, "title"),
    client: text(formData, "client"),
    category: text(formData, "category"),
    description: text(formData, "description"),
    vimeoId: vimeoId(text(formData, "vimeo")),
    year: text(formData, "year"),
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };

  if (!video.title || !video.client || !video.category || !video.description || !video.year) {
    throw new Error("All text fields are required.");
  }
  if (!Number.isFinite(video.sortOrder)) throw new Error("Display order must be a number.");
  return video;
}

async function requireAdmin() {
  if (!(await isAuthenticated())) redirect("/admin/login");
}

function refreshPortfolio() {
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
}

export async function login(formData: FormData) {
  if (!passwordMatches(text(formData, "password"))) {
    redirect("/admin/login?error=1");
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export async function addVideo(formData: FormData) {
  await requireAdmin();
  await createVideo(videoFrom(formData));
  refreshPortfolio();
}

export async function editVideo(id: number, formData: FormData) {
  await requireAdmin();
  await updateVideo(id, videoFrom(formData));
  refreshPortfolio();
}

export async function removeVideo(id: number) {
  await requireAdmin();
  await deleteVideo(id);
  refreshPortfolio();
}
