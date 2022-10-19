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
      desc: false,
    },
    sale: 1, // 0: all, 1: for sale; 2: not for sale
    filter: [],
  });
  // const [list, setList] = useState(new Array(new Array(), new Array()));
  const router = useRouter();
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const search = (val: object, name: string) => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    //  @ts-ignore
    const param = JSON.parse(JSON.stringify(questParam));
    param.page = 1;
    param[name] = val;
    setQuestParam(JSON.parse(JSON.stringify(param)));
    setData([]);
    getNFTS(param);
  };
  const getCollectionInfoFunc = async () => {
    setFirstTime(true);
    const data = await getCollectionInfo();
    setFilterData(data?.data?.data);
  };
  const getNFTS = async (param: any) => {
    if (param.page > totalPage && param.page !== 1) return;
    const data = await getCollectionNfts(param);
    // @ts-ignore
    window.lock = false;
    // @ts-ignore
    if (data?.data?.data?.nfts) {
      const listdata = data?.data?.data;
      setTotalPage(listdata?.total_page);
      // const newList = JSON.parse(JSON.stringify(data));
      // @ts-ignore
      if (param.page === 1) {
        // @ts-ignore
        newList = [];
      }
      newList[param.page - 1] = listdata?.nfts;
      console.log(newList, "newList");
      setData(JSON.parse(JSON.stringify([].concat.apply([], newList))));
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    const a = () => {
      // @ts-ignore
      console.log(document, window.lock, "to bottom");
      console.log(
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight,
        "bottom distance"
      );
      alert(
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop -
          document.documentElement.clientHeight
      );
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
    };
    document.addEventListener("scroll", a);
    return function cleanup() {
      document.removeEventListener("scroll", a);
    };
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
        {filterData?.length ? (
          <Filter search={search} data={filterData}></Filter>
        ) : (
          ""
        )}
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
      {questParam.page >= totalPage && data?.length ? (
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
