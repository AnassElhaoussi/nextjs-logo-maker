import React from "react";
import { Flex } from "@chakra-ui/react";

const Form = () => {
  return (
    <form action="">
      <Flex>
        <label htmlFor=""></label>
        <input type="text" placeholder="" className="" />
      </Flex>
      <Flex>
        <label htmlFor="">Select a color</label>
        <select name="" id="">
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </Flex>
      <Flex>
        <label htmlFor="">Select a background color</label>
        <select name="" id="">
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </Flex>
      <Flex>
        <label htmlFor="">Select you icon style</label>
        <select name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
        </select>
      </Flex>
    </form>
  );
};

export default Form;
