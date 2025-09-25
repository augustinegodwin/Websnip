// utils/convertData.ts
import ConvertApi from 'convertapi-js'

const convertApi = ConvertApi.auth('LVJ6nELszs74ACzyA2CnYMND8lPx1gDA') // ⚠️ Don't expose this in production

export async function convertData({
  url,
  width = '380',
  height = '900',
}: {
  url: string
  width?: string
  height?: string
}): Promise<string | null> {
  try {
    const params = convertApi.createParams()
    params.add('Url', url)
    params.add('ImageWidth', width)
    params.add('ImageHeight', height)

    const result = await convertApi.convert('web', 'jpg', params)
    return result.files[0].Url
  } catch (error) {
    console.error('Conversion error:', error)
    return null
  }
}