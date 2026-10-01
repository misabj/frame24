import { createClient } from "@libsql/client";

export type Video = {
  id: number;
  title: string;
  client: string;
  category: string;
  description: string;
  vimeoId: string;
  year: string;
  featured: boolean;
  sortOrder: number;
};

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const seedVideos = [
  ["Motion that stays", "NORTH STUDIO", "Brand film", "A dynamic portrait of a team turning an idea into a product.", "76979871", "2026", 1, 1],
  ["The city after dark", "MUSEUM NIGHT", "Documentary", "The atmosphere of a city told through people, details and sound.", "22439234", "2025", 1, 2],
  ["No words wasted", "FORMA", "Campaign", "A short digital campaign built around rhythm and precise editing.", "146022717", "2025", 0, 3],
] as const;

const legacySeedVideos = [
  ["Pokret koji ostaje", "NORTH STUDIO", "Brend film", "Dinamičan portret tima koji ideju pretvara u proizvod.", "76979871", "2026", 1, 1],
  ["Grad posle svetla", "NOĆ MUZEJA", "Dokumentarni", "Atmosfera grada ispričana kroz ljude, detalje i zvuk.", "22439234", "2025", 1, 2],
  ["Bez suvišnih reči", "FORMA", "Kampanja", "Kratka digitalna kampanja građena oko ritma i preciznog reza.", "146022717", "2025", 0, 3],
] as const;

let ready: Promise<void> | undefined;

function prepareDatabase() {
  ready ??= (async () => {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        client TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        vimeo_id TEXT NOT NULL,
        year TEXT NOT NULL,
        featured INTEGER NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const result = await client.execute("SELECT COUNT(*) AS total FROM videos");
    if (Number(result.rows[0].total) === 0) {
      for (const video of seedVideos) {
        await client.execute({
          sql: `INSERT INTO videos
            (title, client, category, description, vimeo_id, year, featured, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [...video],
        });
      }
    }

    await client.batch(legacySeedVideos.map((legacy, index) => ({
      sql: `UPDATE videos SET title = ?, client = ?, category = ?, description = ?
        WHERE title = ? AND client = ? AND category = ? AND description = ? AND vimeo_id = ?`,
      args: [...seedVideos[index].slice(0, 4), ...legacy.slice(0, 5)],
    })), "write");
  })();

  return ready;
}

export async function getVideos(): Promise<Video[]> {
  await prepareDatabase();
  const result = await client.execute(
    "SELECT * FROM videos ORDER BY sort_order ASC, id DESC",
  );

  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    client: String(row.client),
    category: String(row.category),
    description: String(row.description),
    vimeoId: String(row.vimeo_id),
    year: String(row.year),
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order),
  }));
}

export type VideoInput = Omit<Video, "id">;

export async function createVideo(video: VideoInput) {
  await prepareDatabase();
  await client.execute({
    sql: `INSERT INTO videos
      (title, client, category, description, vimeo_id, year, featured, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [video.title, video.client, video.category, video.description, video.vimeoId, video.year, video.featured ? 1 : 0, video.sortOrder],
  });
}

export async function updateVideo(id: number, video: VideoInput) {
  await prepareDatabase();
  await client.execute({
    sql: `UPDATE videos SET title = ?, client = ?, category = ?, description = ?,
      vimeo_id = ?, year = ?, featured = ?, sort_order = ? WHERE id = ?`,
    args: [video.title, video.client, video.category, video.description, video.vimeoId, video.year, video.featured ? 1 : 0, video.sortOrder, id],
  });
}

export async function deleteVideo(id: number) {
  await prepareDatabase();
  await client.execute({ sql: "DELETE FROM videos WHERE id = ?", args: [id] });
}
