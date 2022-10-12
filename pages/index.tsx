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

const newList = new Array();
const Home = () => {
  const [filterData, setFilterData] = useState([]);
  const [firstTime, setFirstTime] = useState(false);
  const [questParam, setQuestParam] = useState({
    collection: userConfig?.collections[0],
    page: 1,
    page_size: 10, // 最大 50
    order: {
      order_by: "price",
      desc: true,
    },
    sale: 0, // 0: all, 1: for sale; 2: not for sale
    filter: [],
  });
  const [list, setList] = useState(new Array(new Array(), new Array()));
  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
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
    // @ts-ignore
    window.lock = false;
    if (data?.data?.data) {
      const listdata = data?.data?.data;
      setTotalPage(listdata?.total_page);
      // @ts-ignore
      newList[param.page - 1] = listdata?.nfts;
      setData(JSON.parse(JSON.stringify([].concat.apply([], newList))));
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      if (!document) return;
      // @ts-ignore
      if (window?.lock) return;
      if (
        !(
          document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight
        )
      ) {
        // console.log("slide bottom");
        // @ts-ignore
        window.lock = true;
        const param = JSON.parse(JSON.stringify(questParam));
        param.page = questParam.page + 1;
        setQuestParam(JSON.parse(JSON.stringify(param)));
        getNFTS(param);
      }
    });
  });
  if (!firstTime) {
    getCollectionInfoFunc();
    getNFTS(questParam);
  }
  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: "0px",
          width: "100%",
          zIndex: 99,
        }}
      >
        <Search></Search>
        <Filter search={search} data={filterData}></Filter>
      </div>
      <div className={styles.nft_list}>
        {!data?.length && (
          <div className={styles.no_content}>
            <img src="/images/default/nothing_pic.svg" alt="" />
            <p>No NFT Listed</p>
          </div>
        )}
        {data?.length ? (
          <div className={styles.nft_list_container}>
            {data.map((item: any, index: number) => {
              return (
                <div
                  key={item?.mint_address}
                  className={styles.nft_list_item}
                  onClick={() => {
                    // @ts-ignore
                    router.push("/item?addr=" + item?.mint_address);
                  }}
                >
                  {/*@ts-ignore */}
                  <img src={item?.image} alt="" />
                  <p>
                    <img
                      src="/images/icon/icon_Solana.svg"
                      alt=""
                      style={{
                        width: "18px",
                        height: "18px",
                        position: "relative",
                        top: "3px",
                      }}
                    />
                    {/*@ts-ignore */}
                    {item?.price || "-"}
                  </p>
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
      {questParam.page === totalPage && data?.length ? (
        <div className={styles.nft_list_bottom}>
          <img src="/images/icon/left.svg" alt="" />
          The Bottom
          <img src="/images/icon/right.svg" alt="" />
        </div>
      ) : (
        ""
      )}
      <div className={styles.nft_list_footer}>
        <img src="/images/logo.svg" alt="" />
      </div>
    </div>
  );
};

export default Home;
