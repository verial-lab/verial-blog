import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ESSAYS_DIR = path.join(process.cwd(), "essays");

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  try {
    const data = JSON.parse(
      await fs.readFile(path.join(ESSAYS_DIR, `${slug}.json`), "utf-8")
    );
    return NextResponse.json({ sources: data.sources ?? [] });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  const { slug, sources } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const filePath = path.join(ESSAYS_DIR, `${slug}.json`);
  try {
    const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
    data.sources = sources;
    data.updatedAt = new Date().toISOString();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ sources: data.sources });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
