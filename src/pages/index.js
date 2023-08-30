import React, { useState, useEffect } from "react";
import Head from 'next/head'
import WavPlayer from "@/components/WavPlayer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
export default function Home() {
  const [isShowYoutube, setisShowYoutube] = useState(false);
  return (
    <div>
      <Head>
      <title>{process.env.NEXT_PUBLIC_WEB_TITLE}</title>
      </Head>
      <div className="navbar  bg-base-300 mb-10 ">
        <a className="btn btn-ghost normal-case text-xl">
        {process.env.NEXT_PUBLIC_WEB_TITLE}
        </a>
      </div>

      {/* content */}

      <div className="px-2">
        <div className="lg:w-[900px] lg:mx-auto">
          <WavPlayer setisShowYoutube={setisShowYoutube} />

          {isShowYoutube ? (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.4,
                duration: 0.5,
              }}
              animate={{ opacity: 1, y: 0 }}
              className="card lg:w-[500px] lg:mx-auto bg-base-100 shadow-md mt-4"
            >
              <div className="card-body">
                <h2 className="card-title mx-auto">
                {process.env.NEXT_PUBLIC_WEB_TITLE}
                </h2>
                <p className="text-center">
                {process.env.NEXT_PUBLIC_YT_TITLE}
                </p>
                <Image
                  className="mx-auto"
                  width={300}
                  height={300}
                  alt="Youtube QR Code"
                  loading="lazy"
                  src={"/"+process.env.NEXT_PUBLIC_FILE_QR}
                />
                <div className="card-actions justify-end"></div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>

      <footer className="footer p-10 bg-base-300 mt-10 text-black">
        <div>
          <p>
            {process.env.NEXT_PUBLIC_FOOTER_1}
            <br />
            {process.env.NEXT_PUBLIC_FOOTER_2}
          </p>
        </div>
      </footer>
    </div>
  );
}
