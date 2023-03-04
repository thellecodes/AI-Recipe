import { Box, Button, Flex, Select, useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import Banner from "../component/Banner";
import { TagsInput } from "react-tag-input-component";
import "./style.css";
import EmailModal from "../component/modals/EmailModal";
import { useDispatch, useSelector } from "react-redux";
import {
  generate,
  resetGenerating,
  resetResult,
  setGenerating,
} from "../store/slices/recipe";
import store from "../store/store";
store.dispatch(resetGenerating());

function Homepage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ingredients, setIngredients] = useState([""]);
  const [selectedCousine, setSelectedCousine] = useState("");
  const { result, generating } = useSelector((state) => state.recipe);
  const toast = useToast();
  const dispatch = useDispatch();

  const cousines = [
    "Italian Cuisine",
    "Chinese Cuisine",
    "Mexican Cuisine",
    "Indian Cuisine",
    "French Cuisine",
  ];

  const onEmail = async () => {
    onOpen();
  };

  const onReset = () => {
    dispatch(resetResult());
    setSelectedCousine("");
    setIngredients([""]);
  };

  const onGenerate = async () => {
    //TODO: validate inputs
    const a = ingredients.join(",");

    if (!selectedCousine || !a) {
      toast({
        title: "Select Info",
        description: "Please input all the information needed",
        status: "warning",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });

      dispatch(resetGenerating());
      return;
    }

    dispatch(setGenerating());

    const info = {
      selectedCousine,
      ingredients,
    };

    dispatch(generate(info));
  };

  return (
    <Box
      w="100vw"
      overflow={"hidden"}
      maxW={"1320px"}
      mx="auto"
      lineHeight={"26.7px"}
      color="#0018CB"
      pb="20vh"
    >
      <Banner />

      <Flex px="3rem" justifyContent={"space-around"}>
        <Box>
          <TagsInput
            classNames={("input", "tag")}
            value={ingredients}
            onChange={setIngredients}
            name="fruits"
            placeHolder="Enter Ingredients"
          />
        </Box>
        <Box>
          <Select
            placeholder="Select Cuisine"
            size="lg"
            onChange={(e) => setSelectedCousine(e.target.value)}
          >
            {cousines.map((name, key) => (
              <option value={name} key={key}>
                {name}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Button isLoading={generating} onClick={onGenerate}>
            Generate Recipe
          </Button>
        </Box>
      </Flex>

      {result && !generating && (
        <Flex px="3rem" justifyContent={"space-around"} mt="2rem">
          <Box
            h={result ? "auto" : "200px"}
            color="#000"
            padding="1rem"
            w={{ lg: "800px" }}
            maxW={{
              lg: "1000px",
            }}
            bg="#f7f7f8"
            borderRadius={"1rem"}
          >
            <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
          </Box>
        </Flex>
      )}

      {result && !generating && (
        <Flex justifyContent={"center"} alignItems="center" mt="1rem">
          <Button mx="1rem" onClick={onReset}>
            Generate new recipe
          </Button>
          <Button mx="1rem" onClick={onEmail}>
            Email me this recipe
          </Button>
        </Flex>
      )}

      <EmailModal {...{ onOpen, onClose, isOpen }} />
    </Box>
  );
}

export default Homepage;
