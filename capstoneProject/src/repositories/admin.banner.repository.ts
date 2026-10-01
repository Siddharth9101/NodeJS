import { pool } from "../lib/db.js";
import { transformBanner } from "../lib/utils.js";
import { Banner, BannerRow } from "../types/banner.js";

export async function create(
  secureUrl: string,
  publicId: string,
): Promise<Banner> {
  const result = await pool.query<BannerRow>(
    `
            INSERT INTO banners (image_url, cloudinary_public_id)
            VALUES ($1, $2)
            RETURNING *
        `,
    [secureUrl, publicId],
  );

  return transformBanner(result.rows[0]);
}

export async function findAll(): Promise<Banner[]> {
  const result = await pool.query<BannerRow>(`
      SELECT * FROM banners
    `);

  return result.rows.length === 0 ? [] : result.rows.map(transformBanner);
}

export async function deleteById(id: string): Promise<string | null> {
  const result = await pool.query<{ cloudinary_public_id: string }>(
    `
      DELETE FROM banners
      WHERE id = $1
      RETURNING cloudinary_public_id 
    `,
    [id],
  );
  return result.rows[0]?.cloudinary_public_id ?? null;
}
