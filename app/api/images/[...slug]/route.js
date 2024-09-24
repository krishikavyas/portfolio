import fs from 'fs';
import path from 'path';

export async function GET(req, { params }) {

  const slug = params.slug; // Correctly accessing the slug parameter
  const filePath = path.join(process.cwd(), 'assets', 'blogsImages', ...slug);


  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1);

    const contentType = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
    }[ext] || 'application/octet-stream';

    return new Response(image, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } else {
    return new Response('Image not found', { status: 404 });
  }
}
