import Head from "next/head"; // HTML Head
import Header from "@components/Header"; // Header component
import styles from "@styles/pages/Layout.module.scss"; // Component styles

export default function Layout({ children }, isProfile) {
  return (
    <div>
      {/* Meta */}
      <Meta isProfile={isProfile} />

      {/* Header */}
      <Header />

      {/* Content container */}
      <div className={styles.container}>{children}</div>
    </div>
  );
}

// Meta
function Meta({ isProfile }) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Tuli.Work NFT Gallery</title>
      <meta name="title" content="Tuli NFT OpenGallery for Multiple Blockchains." />
      <meta
        name="description"
        content="Community-based minimal NFT interface to Tuli Protocol."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://r.tuli.work/" />
      <meta property="og:title" content="Tuli Gallery" />
      <meta
        property="og:description"
        content="Community-based minimal NFT interface to Tuli Protocol."
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://r.tuli.work/" />
      <meta property="twitter:title" content="Tuli.Work NFT Gallery" />
      <meta
        property="twitter:description"
        content="Community-based minimal NFT interface to Tuli Protocol."
      />

      {!isProfile ? (
        // If not profile page, display default meta
        <>
          <meta property="og:image" content="https://r.tuli.work/meta.png" />
          <meta
            property="twitter:image"
            content="https://r.tuli.work/meta.png"
          />
        </>
      ) : null}
    </Head>
  );
}
