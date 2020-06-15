import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Pane, Card, Text, Icon, Heading } from "evergreen-ui";

const Preview = () => {

  const [match, setMatch] = useState("");

  const diseases = [
      {
        name: "bacterial_spot",
        base: "#FAE2E2",
        match: "#EC4C47",
      },
      {
        name: "late_blight",
        base: "#FAE3CD",
        match: "#D9822B",
      },
       {
        name: "leaf_mold",
        base: "#D2EEF3",
        match: "#14B5D0",
      },
      {
        name: "mosaic_virus",
        base: "#EAE7F8",
        match: "#735DD0",
      },
      {
        name: "septoria_leaf_spot",
        base: "#E4E7EB",
        match: "#425A70",
      },
      {
        name: "spider_mites",
        base: "#DDEBF7",
        match: "#1070CA",
      },
      {
        name: "target_spot",
        base: "#F7F9FD",
        match: "#084B8A",
      },
      {
        name: "tomato_yellow_leaf",
        base: "#FEF6F6",
        match: "#BF0E08",
      },
      {
        name: "healthy",
        base: "#D4EEE2",
        match: "#47B881",
      },
  ];

  const onDrop = useCallback((files) => {
    console.log(files);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Pane
      elevation={2}
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading size={800} padding={30}>Tomato Leaf Disease Prediction</Heading>
      <Card
        border="default"
        width={1000}
        height={600}
        padding={50}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Card backgroundColor="#D2E3FC" height={200} padding={50} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text>Drop the files here ...</Text>
          ) : (
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Icon icon="folder-new" color="#1967D2" />
              <Text paddingTop={10} align="center" color="#1967D2">
                Choose image from your file or drag & drop here
              </Text>
            </Pane>
          )}
        </Card>
        <Pane paddingTop={50}>
          <Heading size={500}>Output</Heading>
          {diseases.map((d) => (
            <Pane
              paddingTop={20}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Text align="left" color="#1967D2">{ d.name }</Text>
              <Pane width={250} height={25} background={match === d.name ? d.match : d.base}></Pane>
            </Pane>
          ))}
        </Pane>
      </Card>
    </Pane>
  );
};

export default Preview;
