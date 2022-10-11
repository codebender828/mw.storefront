import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Search.module.less";
import { useRouter } from "next/router";

const Search: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.search}>
      <span className={styles.span}>Marketplace</span>
      <img
        src={"/images/icon/icon_search.svg"}
        onClick={() => {
          router.push("/search");
        }}
      ></img>
    </div>
  );
};

export default Search;
