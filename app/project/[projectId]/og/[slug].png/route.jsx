import { ImageResponse } from 'next/og'
import content from "@/assets/projectDetail.js"

export async function GET(req, { params }) {
    let { slug } = params;
    slug = slug.split(".")[0]
    const data = content.find(pro => pro.slug == slug)


    return new ImageResponse(
        (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img style={{ position: 'absolute', zIndex: "1", width:"100%", height:"100%", objectFit:"cover", objectPosition: "center"}} src={`${process.env.HOST}/${data.bannerImg}`}  />
                <div style={{ position: 'absolute', zIndex: "2", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', }} />
                <div style={{ position: 'relative', zIndex: "3", fontSize: 50, color: 'white', textAlign: 'center', }} >
                    {data?.title || "Not Found"}
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630
        }
    )
}
