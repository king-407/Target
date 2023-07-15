import React, { useState, useEffect } from "react";
import { Container, Header, Card, Modal, Image } from "semantic-ui-react";
import backgroundImage from "../assets/results.jpg";
import notesImage from "../assets/notes.jpg";
import "../styles/results.css";
import axios from "axios";

const Results = () => {
  const [openModal, setOpenModal] = useState(false);
  const [imageToShow, setImageToShow] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/study`)
      .then((response) => {
        // Handle the response data

        setNotes(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      });
  }, []);
  const handleOpenModal = (image) => {
    setImageToShow(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div
      className="results-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container textAlign="center">
        <Header as="h1" className="heading">
          All notes
        </Header>

        <div className="card-grid">
          <Card.Group centered>
            {notes.map((note, index) => (
              <a href={note.source} style={{ marginLeft: 30, marginTop: 30 }}>
                <Card
                  key={index}
                  className={`note-card ${
                    hoveredIndex === index ? "hovered" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className="blurring dimmable image"
                    onClick={() => handleOpenModal(note.source)}
                  >
                    {hoveredIndex === index && (
                      <div className="overlay">
                        <div className="overlay-content">
                          <div
                            className="ui primary button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(note.source);
                            }}
                          >
                            View Image
                          </div>
                        </div>
                      </div>
                    )}
                    {note.source.includes("pdf") ? (
                      <div style={{ overflow: "hidden" }}>
                        <object
                          data={note.source}
                          type="application/pdf"
                          width="100%"
                          height="100%"
                        ></object>
                      </div>
                    ) : (
                      <img src={note.source} alt={note.title} />
                    )}
                  </div>
                  <Card.Content>
                    <Card.Header>{note.title}</Card.Header>
                    <Card.Meta>
                      <span className="date">{note.category}</span>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              </a>
            ))}
          </Card.Group>
        </div>
        <Modal open={openModal} onClose={handleCloseModal} closeIcon>
          <Modal.Content image>
            <Image src={imageToShow} alt="Full View" centered />
          </Modal.Content>
        </Modal>
      </Container>
    </div>
  );
};

export default Results;
