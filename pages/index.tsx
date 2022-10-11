import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.less";

import { Button } from "antd-mobile";
import Search from "./components/search";
import Filter from "./components/filter";
import React, { useEffect, useState } from "react";
import { getCollectionInfo, getCollectionNfts } from "./api/request";
import { userConfig } from "userConfig";
import { useRouter } from "next/router";

const Home = () => {
  const [filterData, setFilterData] = useState([]);
  const [firstTime, setFirstTime] = useState(false);
  const [questParam, setQuestParam] = useState({
    collection: userConfig?.collections[0],
    page: 1,
    page_size: 20, // 最大 50
    order: {
      order_by: "price",
      desc: true,
    },
    sale: 0, // 0: all, 1: for sale; 2: not for sale
    filter: [],
  });
  const router = useRouter();
  const [data, setData] = useState([]);
  const search = (val: object, name: string) => {
    //  @ts-ignore
    questParam[name] = val;
    setQuestParam(questParam);
    getNFTS(questParam);
  };
  const getCollectionInfoFunc = async () => {
    setFirstTime(true);
    const data = await getCollectionInfo();
    setFilterData(data?.data?.data);
  };
  const getNFTS = async (param: object) => {
    const data = await getCollectionNfts(param);
    if (data?.data?.data) {
      const listdata = data?.data?.data;
      setData(JSON.parse(JSON.stringify(listdata)));
    } else {
      setData([]);
    }
  };
  if (!firstTime) {
    getCollectionInfoFunc();
    getNFTS(questParam);
  }
  return (
    <div>
      <Search></Search>
      <Filter search={search} data={filterData}></Filter>
      <div className={styles.nft_list}>
        {!data?.length && (
          <div className={styles.no_content}>
            <img src="/images/default/nothing_pic.svg" alt="" />
            <p>No NFT Listed</p>
          </div>
        )}
        {data?.length ? (
          <div className={styles.nft_list_container}>
            {data.map((item: object, index: number) => {
              return (
                <div
                  className={styles.nft_list_item}
                  onClick={() => {
                    // @ts-ignore
                    router.push("/" + item?.mint_address);
                  }}
                >
                  {/*@ts-ignore */}
                  <img src={item?.image} alt="" />
                  {/*@ts-ignore */}
                  <p>{item?.price || "-"}</p>
                  {/*@ts-ignore */}
                  <p>{item?.name || "-"}</p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
