# Websnip

**Convert websites and HTML code to stunning images with ease.**  
Websnip is a powerful, developer-friendly tool that lets you capture any website or HTML and turn it into high-quality images—perfect for sharing, design, documentation, or social media.

## Features

- **Website & HTML to Image**: Capture any website by simply entering its URL, or paste HTML code to convert directly—no coding required.
- **Lightning Fast**: Optimized rendering engine converts HTML/URLs to images in milliseconds.
- **Live Preview**: See your changes instantly before downloading.
- **Multiple Formats**: Export images as PNG, JPEG, or WebP, with customizable quality settings.
- **Custom Styling**: Full CSS support, including custom fonts, colors, and responsive layouts.
- **Advanced Options**: Fine-tune dimensions, scale, quality, and output parameters.
- **Responsive Design**: Generate images for different screen sizes and device types.
- **Privacy First**: All processing happens in your browser—no data sent to external servers.
- **Developer Friendly**: Clean API, extensive documentation, and code samples available.

## Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/augustinegodwin/Websnip.git
   cd Websnip
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

- Choose your conversion: **Website** (by URL) or **HTML** (paste your code).
- Customize image settings (dimensions, format, quality, styling).
- Preview the result live.
- Download or share your image!

## Example Usage

```ts
import { convertData } from "./lib/convertData";

const imageUrl = await convertData({
  url: "https://vercel.com",
  width: "1200",
  height: "800",
});
// Use imageUrl as needed
```

## Configuration

- Built with [Next.js](https://nextjs.org/)
- Uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimal font loading
- Customizable with your own styles, fonts, and layout

## Contributing

Contributions and feedback are welcome!  
Please open issues or pull requests for bugs, feature requests, or improvements.

## License

MIT

---

© 2025 Websnip - All rights reserved.