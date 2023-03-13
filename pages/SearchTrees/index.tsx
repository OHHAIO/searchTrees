import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";

interface ITree {
  id: number;
  name: string;
}

const SearchTrees: FC = () => {
  const [trees, setTrees] = useState<ITree[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [showTreeList, setShowTreeList] = useState<ITree[]>([]);

  useEffect(() => {
    axios.get("https://seedling.api.afterain.com/trees").then((res) => {
      setTrees(res.data);
    });
  }, []);

  useEffect(() => {
    const treeArray = trees.filter((item: ITree) => {
      return item.name.includes(searchWord);
    });
    setShowTreeList(treeArray);
  }, [searchWord]);

  const onChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  return (
    <main className="mainContainer">
      <div className="mainContents">
        <section className="searchSection">
          <h2>나무 검색</h2>
          <input type="text" placeholder="나무 이름을 입력해주세요" value={searchWord} onChange={onChangeSearchWord} />
        </section>
        <section className="resultSection">
          <ul>
            {searchWord && showTreeList.length > 0 && showTreeList.map((item) => <li>{item.name}</li>)}
            {searchWord && showTreeList.length === 0 && "검색하신 나무는 없습니다."}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default SearchTrees;
