// app/api/convert/route.ts
import { NextResponse } from 'next/server'
import ConvertApi from 'convertapi-js'

const convertApi = ConvertApi.auth("LVJ6nELszs74ACzyA2CnYMND8lPx1gDA")

export async function POST(req: Request) {
  const body = await req.json()
  const { url, width, height} = body

  try {
    const params = convertApi.createParams()
    params.add('Url', "https://vercel.com")
    params.add('ImageWidth', width)
    params.add('ImageHeight', height)

    const result = await convertApi.convert('web', 'jpg', params)
    return NextResponse.json({ imageUrl: result })
  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 })
  }
}