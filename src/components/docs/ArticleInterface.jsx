import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ArticleList from "./ArticleList";
import { Link } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import { ArticleLink } from "./ArticleSelector";

function Welcome(props) {
  return (
    <div>
        

         <Container>
          <Row>
            <Col lg={6} style={{ paddingTop: "35vh", paddingBottom: "35vh"}} className="text-center">
              <h1>No article selected.</h1>
              <p className="text-secondary">Choose an article.</p>
              <Button onClick={props.open}>Open Articles</Button>
            </Col>
          </Row>
        </Container>
        
    </div>
  )
}

function ArticleLoadingModal(props) {
  if (props.text) {
    return (
      <div className='articleLoadingModal'>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>{props.text}</p>
      </div>
    )
  } else {
    return;
  }
}

function RouterLink(props) {
  return (
    props.href.match(/^(https?:)?\/\//)
      ? <a href={props.href}>{props.children}</a>
      : <Link to={props.href}>{props.children}</Link>
  );
}

function ArticleInterface(props) {
  const openArticleList = props.open;
  const [loadingModalText, setLoadingModalText] = useState("Fetching article...");
  const [article, stateSetArticle] = useState({});
  const setTitle = props.setTitle;
  

  const setArticle = (file) => {
    setLoadingModalText("Fetching article...");
    fetch("/articles/" + file + ".md")
    .then((response) => response.text())
    .then((textContent) => {
      let title = textContent.split("\n")[0].replace("#", "").trim();
      setTitle(title);
      stateSetArticle({ title: title, body: textContent})
      window.setTimeout(setLoadingModalText, 250);
    });
  }

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      setArticle(id);
    }
    
  },[id]);

  if (!id) {
    return <Welcome open={openArticleList} />
  }

  return (
    <div className="">
      <ArticleLoadingModal text={loadingModalText} />
      <div style={{ maxWidth: "950px"}}>
        <ReactMarkdown renderers={RouterLink} components={{img:({node,...props})=><img className="border rounded shadow m-3 p-2" style={{width:'50%'}}{...props}/>}} className="p-5">{article.body}</ReactMarkdown>
      </div>
      
    </div>
  )
}

export default ArticleInterface;