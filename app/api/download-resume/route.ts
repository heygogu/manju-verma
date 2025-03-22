import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

// Create a limiter instance
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 users per interval
});

export async function GET() {
  try {
    // Get IP address from headers
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    
    try {
      await limiter.check(10, ip);
    } catch {
      return new NextResponse('Too many requests', {
        status: 429,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }

    // Validate file path to prevent directory traversal
    const filePath = path.join(process.cwd(), 'assets/MANJU_VERMA.pdf');
    if (!filePath.startsWith(process.cwd())) {
      return new NextResponse('Invalid file path', { status: 400 });
    }

    const pdfBuffer = await fs.readFile(filePath);
    
   return new NextResponse(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    
  },
});
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}