import "@/styles/globals.css";
import localFont from "next/font/local";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: "./Kanit-Regular.ttf" });

export default function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
