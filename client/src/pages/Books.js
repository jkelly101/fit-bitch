import React, { useState, useEffect, useContext } from "react";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Stats from "../components/Stats";
import { Input, TextArea, FormBtn } from "../components/Form";
import Select from 'react-select'
import UserContext from "../utils/UserContext";
import Select from 'react-select';
import ResultList from "../components/ResultList";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})
  const [giphy,  setGiphy] = useState([])

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks();
    getGiphy();
  }, [])

  // if(loggedIn) {
  //   Stats.forceUpdate()
  // }

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function getGiphy() {
    API.getWorkoutGiphy()
      .then(res => {
        setGiphy(res.data.data)
        console.log(res.data.data)
      })
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
  
  function handleSelectChange(value, action) {
    setFormObject({...formObject, [action.name] : value.value})
  };


  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.type) {
      API.saveBook({
        title: formObject.title,
        type: formObject.type,
        WorkoutNotes: formObject.WorkoutNotes,
        Sets: formObject.Sets,
        Period: formObject.Period,
        Intensity: formObject.Intensity,
        kCal: formObject.kCal,
        userEmail: email

      })
        .then(res => loadBooks())
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
        <Stats />
        <Row>
          <Col size="md-6">
              <h1 className="mb-3 mt-3">Log a Workout</h1>
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
                    type="number"
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
                    type="number"
                    placeholder="Calories Burned"
                  />

                </Col>
              </Row>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            
            <h1 className="mb-3 mt-3">Previous Workouts</h1>

            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1"> {book.title} <span className="text-muted">{book.type}</span></h5>
                          <small>
                            { (new Date(book.date)).toLocaleDateString() }                                                    
                          </small>
                      </div>
                      <p className="mb-1">{book.WorkoutNotes}</p>
                      <span className="p-2 mr-2 badge bg-light rounded-pill">Sets: {book.Sets}</span>
                      <span className="p-2 mr-2 badge bg-light rounded-pill">Period: {book.Period}</span>
                      <span className="p-2 mr-2 badge bg-light rounded-pill">Intensity: {book.Intensity}</span>
                      <span className="p-2 mr-2 badge bg-light rounded-pill">KCalories: {book.kCal}</span>
                    </Link>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            <ResultList results={giphy}/>
          </Col>
        </Row>
      </Container>
    );
  }


export default Books;
