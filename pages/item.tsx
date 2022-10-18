import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Item.module.less";
import Footer from "./components/footer";
import { useRouter } from "next/router";
import { getNft, getNftActivities, getUser } from "./api/request";
import React, { useEffect, useState } from "react";
import { Divider } from "antd-mobile";
import { relative } from "path";

let pageSize = 1;
let activitylist: any = [];

const NftItem = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [activity, setActivity] = useState(new Array());
  const [init, setInit] = useState(false);
  const { query } = router;
  const getAddress = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("addr");
  };
  const getData = async () => {
    const res = await getNftActivities(
      // @ts-ignore
      getAddress("addr"),
      pageSize
    );
    if (!res?.data?.data?.events) return;
    let array = [...activitylist];
    array[pageSize] = [...res?.data?.data?.events];
    pageSize = pageSize + 1;
    activitylist = JSON.parse(JSON.stringify(array));
    setActivity(activitylist);
    // @ts-ignore
    window.lock = false;
  };
  console.log(userInfo, "userInfo");
  useEffect(() => {
    const a = () => {
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
        console.log("slide bottom");
        // @ts-ignore
        window.lock = true;
        getData();
      }
    };
    document.addEventListener("scroll", a);
    return function cleanup() {
      document.removeEventListener("scroll", a);
    };
  });
  useEffect(() => {
    if (init) return;
    setInit(true);
    getNft(
      // @ts-ignore
      getAddress("addr")
      //"9GeknX5dxZgAV6XtYaTFsTrv1BFjLgYNKNs7egMqqDCB"
    ).then((res: any) => {
      setData(res?.data?.data);
    });
    getUser().then((res) => {
      setUserInfo(res);
    });
    // @ts-ignore
    if (window.lock) return;
    if (pageSize === 1) {
      // @ts-ignore
      window.lock = true;
      getData();
    }
  });

  return (
    <div className={styles["nft_item"]}>
      <div className={styles["top_navbar"]}>
        <img
          src="/images/icon/arrorw/icon_arrow_up_line.svg"
          alt=""
          onClick={() => {
            history.go(-1);
          }}
        />
        <img
          src="/images/icon/icon_refresh.svg"
          alt=""
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
      <div className={styles["info"]}>
        <img
          // @ts-ignore
          src={data?.image}
          onClick={() => {
            router.push("/search");
          }}
        ></img>
        <p>
          {/*  @ts-ignore */}
          <span>{data?.name}</span>
          {/*  @ts-ignore */}
          <span>
            <img
              style={{
                width: "14px",
                height: "14px",
                margin: "0px",
                display: "inline-block",
                position: "relative",
                top: "2px",
              }}
              src="/images/icon/solana_blue.svg"
              alt=""
            />
            {/*  @ts-ignore */}
            {data?.price || "-"}
          </span>
        </p>
      </div>
      {/* <p className={styles["title"]}>In-Game Performance</p> */}
      {/* <div className={styles["skills"]}>
        <p>
          <img src="" alt="" />
          <span>Attack</span>
          <span>76</span>
        </p>
        <p>
          <img src="" alt="" />
          <span>Defence</span>
          <span>100</span>
        </p>
        <p>
          <img src="" alt="" />
          <span>Health</span>
          <span>120</span>
        </p>
      </div> */}
      {/* <div className={styles["skills_set"]}>
        <p>Passive Skill Set </p>
        <div className={styles["skills_set_item"]}>
          <img
            src={"/images/icon/icon_search.svg"}
            onClick={() => {
              router.push("/search");
            }}
          ></img>
          <p>Gravitational Shatter</p>
        </div>
        <div className={styles["skills_set_item"]}>
          <img
            src={"/images/icon/icon_search.svg"}
            onClick={() => {
              router.push("/search");
            }}
          ></img>
          <p>Gravitational Shatter</p>
        </div>
        <div className={styles["skills_set_item"]}>
          <img
            src={"/images/icon/icon_search.svg"}
            onClick={() => {
              router.push("/search");
            }}
          ></img>
          <p>Gravitational Shatter</p>
        </div>
        <div className={styles["skills_set_item"]}>
          <img
            src={"/images/icon/icon_search.svg"}
            onClick={() => {
              router.push("/search");
            }}
          ></img>
          <p>Gravitational Shatter</p>
        </div>
      </div> */}
      <p className={styles["title"]}>On-Chain Attribute</p>
      <div className={styles["On_Chain"]}>
        {/*  @ts-ignore */}
        {data?.attributes?.map((item: any) => {
          return (
            <div key={item?.trait_type}>
              <span>{item?.trait_type}</span>
              <span>{item?.value}</span>
            </div>
          );
        })}
        {/* <div>
          <span>Backgroung</span>
          <span>Pink</span>
        </div>
        <div>
          <span>Skin</span>
          <span>Red</span>
        </div>
        <div>
          <span>Shoes</span>
          <span>Wasteland Boots, Purple, Line break effect</span>
        </div>
        <div>
          <span>Hair</span>
          <span>Yuki-onna</span>
        </div> */}
      </div>
      <p className={styles["title"]}>Details</p>
      <div className={styles["On_Chain"]}>
        {/*  @ts-ignore */}
        {data?.mint_address ? (
          <div>
            <span>Mint Address</span>
            {/*  @ts-ignore */}
            <span>{`${data?.mint_address?.slice(
              0,
              4
              /*  @ts-ignore */
            )}...${data?.mint_address?.slice(-4)}`}</span>
          </div>
        ) : (
          ""
        )}
        {/*  @ts-ignore */}
        {data?.token_address ? (
          <div>
            <span>Token Address</span>
            {/*  @ts-ignore */}
            <span>{`${data?.token_address?.slice(
              0,
              4
              /*  @ts-ignore */
            )}...${data?.token_address?.slice(-4)}`}</span>
          </div>
        ) : (
          ""
        )}
        {/*  @ts-ignore */}
        {data?.owner_address ? (
          <div>
            <span>Owner Address</span>
            {/*  @ts-ignore */}
            <span>{`${data?.owner_address?.slice(
              0,
              4
              /*  @ts-ignore */
            )}...${data?.owner_address?.slice(-4)}`}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      {activity?.length ? <p className={styles["title"]}>Activities</p> : ""}
      {activity?.length ? (
        <div className={styles["activities"]}>
          <div className={styles["table-header"]}>
            <span>Event</span>
            <span>Price</span>
            <span>Date</span>
          </div>
          {activity.map((item, index) => {
            return (
              <div key={index}>
                {item?.length
                  ? //  @ts-ignore
                    item.map((childItem, childIndex) => {
                      return (
                        <div key={childIndex} className={styles["table-item"]}>
                          <span>{childItem?.event_type}</span>

                          <span
                            style={{
                              position: "relative",
                              top: "-4px",
                            }}
                          >
                            {childItem?.price && (
                              <img
                                src="/images/icon/icon_Solana.svg"
                                alt=""
                                style={{
                                  position: "relative",
                                  top: "4px",
                                }}
                              />
                            )}
                            {childItem?.price}
                          </span>
                          <span>{childItem?.date_tag}</span>
                        </div>
                      );
                    })
                  : ""}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
      {/*@ts-ignore */}
      {!(
        // @ts-ignore
        (!data?.listed && userInfo?.wallet?.sol_address !== data.owner_address)
      ) ? (
        <Footer data={data} userInfo={userInfo}></Footer>
      ) : (
        ""
      )}
    </div>
  );
};

export default NftItem;
