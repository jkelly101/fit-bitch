import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Select from 'react-select'

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    console.log('Loading Books') 
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

    // Handles updating component state when the user types into the input field
    function handleSelectChange(value, action) {
      setFormObject({...formObject, [action.name] : value.value})
    };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      console.log(formObject) 
      API.saveBook({
        title: formObject.title,
        type: formObject.type,
        WorkoutNotes: formObject.WorkoutNotes
      })
        .then( res => loadBooks() )
        .catch(err => console.log(err));
    }
  };

  const options = [
    { value: 'cardio', label: 'Cardio' },
    { value: 'strength', label: 'Strength' },
    { value: 'hybrid', label: 'Hybrid' }
  ]

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Log a Workout</h1>
            </Jumbotron>
            <form>
              <Row>
                <Col size="md-6">                             
                  <Input
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  <Select
                    onChange={handleSelectChange}
                    name="type"
                    className="form-select mb-3"
                    placeholder="Workout Type (required)"
                    options={options}
                  />
                  <TextArea
                    onChange={handleInputChange}
                    name="WorkoutNotes"
                    placeholder="Workout Notes (Optional)"
                  />
                  <FormBtn
                    disabled={!(formObject.title)}
                    onClick={handleFormSubmit}
                  >
                    Submit Workout
                  </FormBtn>                
                </Col>
                <Col size="md-6">
                <Input
                    onChange={handleInputChange}
                    name="Sets"
                    placeholder="Number of Sets"
                  />
                  <Input
                    onChange={handleInputChange}
                    name="Period"
                    placeholder="Workout Length"
                  />
                  <Input
                    onChange={handleInputChange}
                    name="Intensity"
                    placeholder="Intensisty of Workout"
                  />
                   <Input
                    onChange={handleInputChange}
                    name="kCal"
                    placeholder="Calories Burned"
                  />

                </Col>
              </Row>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Previous Workouts</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} [{book.type}]
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;


