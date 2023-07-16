import React, { useRef, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/upload.jpg";
import "../styles/upload.css";

const Upload = () => {
  const [file, setFile] = useState();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("source", file);
    formdata.append("title", title);
    formdata.append("category", category);
    axios
      .post("http://localhost:3000/study", formdata)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setCategory("");
    setTitle("");
    setFile(null);
  };
  return (
    <div
      className="upload-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container textAlign="center">
        <Header as="h1" className="heading">
          Upload Your Notes
        </Header>
        <div className="upload-box">
          <Form>
            <Form.Field>
              <label
                style={{ textAlign: "left", fontSize: "1em", color: "white" }}
              >
                Title
              </label>
              <input
                type="text"
                placeholder="Enter the title"
                style={{
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="upload-input"
              />
            </Form.Field>
            <Form.Field>
              <label
                style={{ textAlign: "left", fontSize: "1em", color: "white" }}
              >
                Category
              </label>
              <input
                type="text"
                placeholder="Enter the subject"
                style={{
                  background: "transparent",
                  border: "1px solid white",
                  color: "white",
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="upload-input"
              />
            </Form.Field>
            <div className="upload-link-container">
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Link to="#" className="upload-link" onClick={handleBrowseClick}>
                Browse
              </Link>
            </div>
            <Button
              style={{ fontSize: "1.5em" }}
              primary
              fluid
              onClick={handleUpload}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Upload;
