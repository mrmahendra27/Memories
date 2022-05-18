import React, { useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Typography, Button, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createPost } from "../../actions/posts";
import { useDispatch } from "react-redux";

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(postData));
    resetForm()
  };

  const resetForm = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Create a Post</Typography>
        <TextField
          variant="outlined"
          name="creator"
          label="Creator"
          value={postData.creator}
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          variant="outlined"
          name="title"
          label="Title"
          value={postData.title}
          fullWidth
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          variant="outlined"
          name="message"
          label="Message"
          value={postData.message}
          fullWidth
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          variant="outlined"
          name="tags"
          label="Tags"
          value={postData.tags}
          fullWidth
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          className={classes.buttonSubmit}
          fullWidth
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          size="small"
          fullWidth
          onClick={(e) => (
            e.preventDefault(),
            resetForm()
          )}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
