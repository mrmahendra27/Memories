import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { TextField, Typography, Button, Paper } from "@material-ui/core";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) => currentId ? state.posts.find(post => post._id === currentId) : null);
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

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clear();
  };

  const clear = () => {
    setCurrentId(null)
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  useEffect(() => {
    if(post) setPostData(post)
  }, [post])

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? "Editing a Post" : "Creating a Post"}</Typography>
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
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
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
          { currentId ? "Update" : "Add"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          size="small"
          fullWidth
          onClick={(e) => (e.preventDefault(), clear())}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
