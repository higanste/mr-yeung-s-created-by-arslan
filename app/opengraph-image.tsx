import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Mr. Yeung\'s Math Challenge';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #050505, #111111)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '150px',
                        height: '150px',
                        borderRadius: '40px',
                        border: '4px solid #00F2EA',
                        fontSize: '80px',
                        fontWeight: 'bold',
                        color: '#00F2EA',
                        marginBottom: '40px',
                        boxShadow: '0 0 50px rgba(0, 242, 234, 0.3)',
                    }}
                >
                    MY
                </div>
                <div style={{ fontSize: '60px', fontWeight: 'bold', marginBottom: '20px' }}>
                    Mr. Yeung's Math Challenge
                </div>
                <div style={{ fontSize: '30px', color: '#888' }}>
                    Created by Arslan • DCI-25/26
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
