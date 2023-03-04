import { Flex } from "@chakra-ui/react";
import React from "react";

function Banner() {
  return (
    <Flex
      h={{ lg: "200px", base: "130px" }}
      mb="20px"
      minH={{
        lg: "150px",
      }}
      justifyContent="center"
      alignItems={"center"}
      bg="#233CEC"
    ></Flex>
  );
}

export default Banner;
