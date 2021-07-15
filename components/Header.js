import Link from "next/link"; // Dynamic routing
import { useState } from "react"; // State management
import { web3 } from "@containers/index"; // Global state
import styles from "@styles/components/Header.module.scss"; // Component styles

// Header
export default function Header() {
  const [loading, setLoading] = useState(false); // Loading state
  const { address, authenticate } = web3.useContainer(); // Global state

  const authenticateWithLoading = async () => {
    setLoading(true); // Toggle loading
    await authenticate(); // Authenticate
    setLoading(false); // Toggle loading
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <a>
            <img src="/logo_tuli.png" alt="Tuli" />
          </a>
        </Link> <h1> Tuli.Work </h1>
      </div>

      {/* Menu */}
      <div className={styles.header__menu}>
      <Link href={`https://eth.tuli.work`}>
       <a className={styles.header__menu_button_black}>ETH</a>
       </Link>
       <Link href={`https://m.tuli.work`}>
        <a className={styles.header__menu_button_black}>Polygon</a>
       </Link>
       <Link href={`https://r.tuli.work`}>
        <a className={styles.header__menu_button_black}>Rinkeby</a>
        </Link>
        <Link href={`https://tuli.work`}>
         <a className={styles.header__menu_button_black}>BSC</a>
        </Link>
        {address ? (
          // If user is authenticated
          <>
            <Link href={`/profile/${address}`}>
              <a className={styles.header__menu_button_gray}>
                {address.substr(0, 5) +
                  "..." +
                  address.slice(address.length - 5)}
              </a>
            </Link>
            <Link href={`/create`}>
              <a className={styles.header__menu_button_black}>Create NFT</a>
            </Link>
          </>
        ) : (
          // Else if user is not authenticated
          <button
            className={styles.header__menu_button_black}
            onClick={authenticateWithLoading}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
}
