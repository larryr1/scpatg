// PROJECT BEGAN 9/6/22
import './App.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import Welcome from './components/docs/Welcome';
import ArticleWrapper from './components/docs/ArticleWrapper';

function NoArticle(props) {
  return (
    <div style={{ marginTop: "35vh", textAlign: "center" }}>
      <h3>No article selected.</h3>
      <p>Select an article to view.</p>
      <Button variant='primary' onClick={props.setOpen}>Articles</Button>
    </div>
  );
}

function App() {
  const [articleListOpen, setArticleListOpen] = useState(false);
  const openArticleList = () => { setArticleListOpen(true) };

  const [modalData, setModalData] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route path='article' element={<ArticleWrapper />}/>
          <Route path="/article/:id" element={<ArticleWrapper /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  )/*
      <ArticleSelector setOpen={setArticleListOpen} open={articleListOpen} setArticle={setCurrentArticle}  />
      <TopNavBar openArticleList={setArticleListOpen} title={currentArticle.title} />
      { currentArticle ? <ReactMarkdown className='p-3'>{currentArticle.body}</ReactMarkdown> : <NoArticle setOpen={openArticleList} />}
      { currentArticle ? <p className='p-3'>Want to make suggestions for this article? Fill out <a href="https://google.com">this form</a>.</p> : null }
    </div>
  );*/
}

export default App;
