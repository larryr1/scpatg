// Imports
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'

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

export function ArticleLink(props) {
  const load = () => {
    props.activate(props.title, props.file);
  }
  return (
    <Link to={"/article/" + props.file} style={{ textDecoration: "none"}}>
      <Card className='articleCardLink' onClick={load}>
        <Card.Body>
          <Card.Title>{props.title || "Title"}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.subtitle || "Subtitle"}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
    
  )
}

export function ArticleSelector(props) {
  const setOpen = props.set;
  const open = props.open;
  const setArticle = props.setArticle;
  const show = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  const [loadingText, setLoadingText] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const searchInputUpdate = (e) => {
    setSearchInput(e.target.value);
  }

  const loadArticle = (title, file) => {
    handleClose();/*
    setLoadingText("Loading article...");
    fetch("/articles/" + file + ".md")
    .then((response) => response.text())
    .then((textContent) => {
     // setArticle({ title: title, body: textContent})
    });*/
    setLoadingText(false);
  }
  
  
  return (
    <div>
      {/* Loading modal */}
      <ArticleLoadingModal text={loadingText} />

      {/* Main Offcanvas */}
      <Offcanvas show={open} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Articles</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className='pt-1'>

          {/* Search */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Search" value={searchInput} onChange={searchInputUpdate} />
            </Form.Group>
          </Form>

          {/* Article list (respect to search input) */}
          { articleData.map(a => {
            console.log("ID: " + a.file);
            if (searchInput.trim().length > 0) {
              if (!a.title.toLowerCase().includes(searchInput.toLowerCase())) {
                return;
              }
            }
            return <ArticleLink title={a.title} subtitle={a.subtitle} file={a.file} activate={loadArticle} />
          })}

          {/* SUggestions link */}
          <p className='m-3'>Have feedback? Complete <a href="https://docs.google.com/forms/d/e/1FAIpQLScWCoadd34AGlAAZltIs4UpWhesZ0Hhc1GYfX493IHRqOrDYw/viewform?usp=sf_link" target={"_blank"}>this form</a> to tell me.</p>
          <p className='text-muted ms-3'>SCPATG: Build <i>Beta</i> 1.1.0</p>
          <p className='text-muted ms-3'>This is a work in progress. Current layout and style is not final. Expect periodic changes.</p>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}