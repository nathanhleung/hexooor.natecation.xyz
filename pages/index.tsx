import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Dropzone from "react-dropzone";
import styles from "../styles/Home.module.css";

const EXAMPLES = [
  // 1623
  "https://lh3.googleusercontent.com/Cj11gD6POLGDL6_SLkJ9JSacpoZ_XcSplpcp-eJXQqDjJB28f4n9NZxtE1T2SkAGeeFO21n4FOHzK-Upw4iqvLXBgnWnWRk45q7X=w600",
  // 1708
  "https://lh3.googleusercontent.com/e8z9t7BigXlXgzLSt60SYNY-HvjKShnOlim2fQW394gCcJPePs4iYRwkMmh0e-g5iQNa35qRY-B37ueldqL3fv4m5mR4AeEORPt2HQ=w600",
  // 2771
  "https://lh3.googleusercontent.com/n-XZD80oikElzk5VEWxOG6ZgU-aHQ4jXsDgyA84ZNYquKWLqPd65ttnlZhz7SXtxzOsVrUJsHbMsynm0FHFG0yjix5nk4dUKK4RHy4U=w600",
  // 6416
  "https://lh3.googleusercontent.com/WXo8y5E1dvb-5s09JBgoQeOcqWCQgl8UTX1ho3rzrcT76YNtnReVDuZ2jU0IBjNzEdkgJD431N49NQh6uVGcD4DFfQyw8ExvNS_6Lg=w600",
  // 7528
  "https://lh3.googleusercontent.com/YIxDSZ0LC2d8fI0FTerU3J9h1z8Fl8VHACynVPvpDyMVj5IK2DBd0NFphoYaRSxSEJPGQXEg92Cqi0UnWf2G0kiVqeybyLSMZEhhDw=w600",
  // 8214
  "https://lh3.googleusercontent.com/5-EhtsBH0jU0SjH7cyr2FudbJ_4dXa2eDt3z6Lr4OQT7usRDzUDQDvdx097ha3lAEz8svkhYnQMSYcH2zFF05GSwR2kzA045VDHifb4=w600",
  // 9410
  "https://lh3.googleusercontent.com/-sDUPaeKaSqU102WA9Q7gxDfC5x2PAoJsuImbS6ysPPLSPNVFFWmTAOOYXUoR-hUpW9TgBmLgmXJ0bNWSR5ihd1mPWx35Hd3frtQogM=w600",
  // 9988
  "https://lh3.googleusercontent.com/o1SUX7nzds33yRklxhMAgbyeUPvmhQ7N-PQF_RzFKL6iFiyBN6GfduExf9jlQJuh_5VOnnqHXfRa7EDWFxc2c5Uk9pPQfPoJmgq-5g=w600",
];
const HEXAGON_MASK = `
  M378.3,150.1c-14-31.2-30.3-61.2-48.7-89.7l-6-9.1c-7.3-11.2-16.9-20.7-28.1-27.5c-11.1-6.9-23.6-11.1-36.5-12.1l-10.5-0.9
  c-32.4-2.8-64.9-2.8-97.4,0l-10.5,0.9c-12.9,1-25.3,5.2-36.5,12.1S83.5,40.1,76.2,51.4l-6,9.2C51.7,89,35.5,119,21.5,150.2
  l-4.5,10.1c-5.6,12.4-8.4,25.9-8.4,39.7c0,13.7,2.8,27.3,8.4,39.7l4.5,10.1c14,31.2,30.3,61.2,48.7,89.7l6,9.2
  c7.3,11.3,17,20.7,28.1,27.6c11.2,6.9,23.7,11,36.5,12.1l10.5,0.9c32.4,2.8,64.9,2.8,97.4,0l10.5-0.9c12.9-1.1,25.3-5.2,36.5-12.1
  c11.2-6.9,20.8-16.4,28.1-27.6l6-9.2c18.5-28.5,34.7-58.5,48.7-89.7l4.5-10.1c5.5-12.4,8.4-25.9,8.4-39.7s-2.8-27.3-8.4-39.7
  L378.3,150.1z
`;
const TWITTER_COLOR = "#198CD8";

const HexooorLink: React.FC<React.ComponentProps<typeof Link>> = (props) => {
  return <Link color={TWITTER_COLOR} userSelect="none" {...props} />;
};

const HexooorButton: React.FC<React.ComponentProps<typeof Button>> = (
  props
) => {
  return (
    <Button
      color="white"
      backgroundColor={TWITTER_COLOR}
      cursor="pointer"
      borderRadius={9999}
      size="lg"
      _hover={{ opacity: 0.5 }}
      {...props}
    />
  );
};

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [generatedImageData, setGeneratedImageData] = useState<string>();
  const [downloaded, setDownloaded] = useState(false);

  function drawImage(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    imageUrl: string
  ) {
    const mask = new Path2D(HEXAGON_MASK);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx && imageUrl) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const image = new Image();
        image.src = imageUrl;
        // Fix https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
        image.crossOrigin = "anonymous";

        image.onload = () => {
          ctx.clip(mask);
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 400, 400);
          // https://stackoverflow.com/questions/7717851/save-file-javascript-with-file-name
          const imageUri = canvasRef.current
            ?.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          setGeneratedImageData(imageUri);
        };
      }
    }
  }

  // Show empty hexagon on load
  // Based on https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76
  useEffect(() => {
    const mask = new Path2D(HEXAGON_MASK);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fill(mask);
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    if (imageUrl) {
      drawImage(canvasRef, imageUrl);
    }
  }, [canvasRef, imageUrl]);

  return (
    <Flex flexDirection="column" className={styles.container}>
      <Head>
        <title>Hexooor</title>
        <meta name="description" content="Generate hexagonal profile photos." />
        <link rel="icon" href="/icon.png" />
      </Head>

      <Box
        as="main"
        className={styles.main}
        maxWidth={["100%", "50%"]}
        margin="0 auto"
        flex={1}
      >
        <h1 className={styles.title}>Hexooor</h1>
        <Text m={5}>
          <b>Did you know?</b> NFTs (short for Non-Fungible Tokens) are digital
          items that you own. Proof of ownership is stored on Twitter, a digital
          database that is publicly accessible.
        </Text>

        <Dropzone
          accept="image/*"
          maxFiles={1}
          onDrop={([acceptedFile]) =>
            setImageUrl(URL.createObjectURL(acceptedFile))
          }
        >
          {({ getRootProps, getInputProps }) => (
            <>
              <HexooorButton {...getRootProps()} mt={3}>
                <Text>Select an Image</Text>
                <input {...getInputProps()} />
              </HexooorButton>
              <HexooorLink
                size="sm"
                mt={2}
                onClick={() =>
                  setImageUrl(
                    EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]
                  )
                }
              >
                or try an example
              </HexooorLink>
            </>
          )}
        </Dropzone>

        <Box p={10}>
          <canvas ref={canvasRef} width={400} height={400} />
        </Box>

        <HexooorButton
          as="a"
          disabled={!generatedImageData}
          href={generatedImageData}
          download="hexagon-profile.png"
          onClick={() => setDownloaded(true)}
        >
          Mint
        </HexooorButton>
        {downloaded && (
          <Text mt={5}>
            Congrats! To complete the mint process, upload this photo as your
            Twitter profile picture.
          </Text>
        )}
      </Box>
      <footer className={styles.footer}>
        <Text>
          <HexooorLink href="https://twitter.com/nathanhleung" mr={1}>
            @nathanhleung
          </HexooorLink>{" "}
          (not affiliated with twitter)
        </Text>
      </footer>
    </Flex>
  );
};

export default Home;
