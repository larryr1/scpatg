import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import TopNavBar from "../TopNavBar";
import ArticleInterface from "./ArticleInterface";
import { ArticleSelector } from "./ArticleSelector";

function ArticleWrapper(props) {
  const [articleListOpen, setArticleListOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const showArticleList = () => { setArticleListOpen(true) }
  
    return (
      <div>
        <TopNavBar show={showArticleList} title={articleTitle} />
        <ArticleSelector open={articleListOpen} set={setArticleListOpen} />
        <ArticleInterface setTitle={setArticleTitle} open={showArticleList} />
      </div>
    )
  
}

export default ArticleWrapper;