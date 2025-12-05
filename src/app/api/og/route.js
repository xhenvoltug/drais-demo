// Open Graph Image Generation API
// Generates dynamic OG images for social sharing
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'DRAIS School Management System';
    const description = searchParams.get('description') || 'Comprehensive School Management Made Easy';
    const page = searchParams.get('page') || 'home';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Logo/Brand Section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: 'white',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30" fill="url(#grad1)" />
                <path
                  d="M20 25 L20 40 L40 40 L40 25 L30 20 L20 25 Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M30 25 L30 40"
                  stroke="#667eea"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="60" y2="60">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              DRAIS
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              maxWidth: '80%',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: '70%',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>

          {/* Footer Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 20,
              color: 'white',
              fontWeight: '600',
            }}
          >
            By Xhenvolt Technologies
          </div>

          {/* Page Badge */}
          {page !== 'home' && (
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 40,
                background: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                padding: '8px 20px',
                borderRadius: 8,
                fontSize: 18,
                color: 'white',
                fontWeight: '600',
                textTransform: 'capitalize',
              }}
            >
              {page}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
