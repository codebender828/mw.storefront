import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SearchBar } from "antd-mobile";
import { useRouter } from "next/router";

import { getNftSearch, getNftRecommend } from "./api/request";

const Search: NextPage = () => {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [key, setKey] = useState("");
  const [NftRecommend, setNftRecommend] = useState([]);
  const [first, setFirst] = useState(false);
  const searchNft = async (e: any) => {
    const data = await getNftSearch(e.target.value);
    setKey(e.target.value);
    setList(data?.data?.data);
  };
  if (!first) {
    setFirst(true);
    getNftRecommend().then((res) => {
      setNftRecommend(res?.data?.data || []);
    });
  }

  return (
    <div className="search_page">
      <input
        placeholder="NFT Name"
        onChange={(e) => {
          searchNft(e);
        }}
      />
      <span
        onClick={() => {
          router.push("/");
        }}
      >
        Cancel
      </span>
      <div className="search-result">
        {!key && <p className="search_page_title">Everyone is Searching</p>}
        {key && list?.length
          ? list.map((item, index) => {
              return (
                <p
                  className="search_page_item"
                  onClick={() => {
                    router.push("/" + item?.mint_address);
                  }}
                >
                  <img src={item?.image} alt="" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.name.replace(
                        key,
                        `<b style="color: #386EEC;font-weight: normal">${key}</b>`
                      ),
                    }}
                  ></p>
                </p>
              );
            })
          : ""}
        {key && !list?.length ? (
          <div className="no_content">
            <img src="/images/default/nothing_pic.svg" alt="" />
            <p>No NFT Listed</p>
          </div>
        ) : (
          ""
        )}
        {!key && NftRecommend.length
          ? NftRecommend.map((item: object, index: number) => {
              return (
                <p
                  className="search_page_item"
                  onClick={() => {
                    router.push("/" + item?.mint_address);
                  }}
                >
                  <img src={item?.image} alt="" />
                  <p> {item?.name}</p>
                </p>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Search;
