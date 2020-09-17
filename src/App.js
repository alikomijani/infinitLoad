import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap'
import debounce from "lodash.debounce";

import './App.css';
import axios from 'axios'
function App() {
  const [pics, setPics] = useState([])

  const [loading, setLoding] = useState(false)
  const [page, setPage] = useState(1)

  const getPic = () => {
    axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=6`).then(res => {
      setPage(page + 1)
      setPics([...pics, ...res.data])
    }
    )
  }

  useEffect(() => {
    if (loading)
      {getPic()}
  }, [loading])


  const listener = debounce((e) => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 10
      >= document.documentElement.offsetHeight
    ) {
      setLoding(true)
    } else {
      setLoding(false)
    }

  }, 100)
  useEffect(() => {
    getPic()
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [])

  return (
    <Container on className='mx-5'>
      {page}
      <Row>
        {pics.map(pic => (
          <Col className='mt-3' key={pic.id} xs={12} md={6} lg={4}>
            <Card>
              <CardImg top width="100%" src={pic.url} alt={pic.title} />
              <CardBody>
                <CardTitle>{pic.title} </CardTitle>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>


  );
}

export default App;
