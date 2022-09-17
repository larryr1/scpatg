// Imports
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const articleData = require("./articles.json");

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

function ArticleLink(props) {
  const load = () => {
    props.activate(props.title, props.file);
  }
  return (
    <Card className='articleCardLink' onClick={load}>
      <Card.Body>
        <Card.Title>{props.title || "Title"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.subtitle || "Subtitle"}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

function ArticleSelector(props) {
  const setOpen = props.set;
  const open = props.open;
  const setArticle = props.setArticle;
  const show = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  const [loadingText, setLoadingText] = useState("");

  const loadArticle = (title, file) => {
    handleClose();
    setLoadingText("Loading article...");
    fetch("/articles/" + file + ".md")
    .then((response) => response.text())
    .then((textContent) => {
      setArticle({ title: title, body: textContent})
    });
    setLoadingText(false);
  }
  
  
  return (
    <>
      <ArticleLoadingModal text={loadingText} />
      <span onClick={show}>{props.children}</span>

      <Offcanvas show={open} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Articles</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          { articleData.map(a => {
            console.log("ID: " + a.file);
            return <ArticleLink title={a.title} subtitle={a.subtitle} file={a.file} activate={loadArticle} />
          })}
          <p className='m-3'>Have a suggestion for an article? Complete <a href="https://docs.google.com/forms/d/e/1FAIpQLScWCoadd34AGlAAZltIs4UpWhesZ0Hhc1GYfX493IHRqOrDYw/viewform?usp=sf_link" target={"_blank"}>this form</a> to submit it.</p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default ArticleSelector;