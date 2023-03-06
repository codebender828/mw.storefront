import type { NextPage } from "next";
import styles from "../../styles/Search.module.less";
import { useRouter } from "next/router";
import { useMirrorWorld } from '@/hooks/use-mirrorworld';

const Search = () => {
  const router = useRouter();
  const { user, logout, login } = useMirrorWorld()
  return (
    <div className={styles.search}>
      <span className={styles.span}>Marketplace</span>
      
      <div className="search-actions">
        {!user ? (
          <button className={styles.auth_button} onClick={login}>
            Login
          </button>
        ): (
          <button className={styles.auth_button_logout} onClick={logout}>
            Logout
          </button>
        )}
        <img
          src={"/images/icon/icon_search.svg"}
          onClick={() => {
            router.push("/search");
          }}
          alt="search"
        ></img>
      </div>
    </div>
  );
};

export default Search;
