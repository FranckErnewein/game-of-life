import React from "react";
import Title from "./Title";
import Section from "./Section";

export default function Infos() {
  return (
    <Section>
      <Title>Info</Title>
      <p>
        « The Game of Life, also known simply as Life, is a cellular automaton.
        [...] It is Turing complete and can simulate a universal constructor or
        any other Turing machine. »
        <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Read more on Wikipedia
        </a>
      </p>
    </Section>
  );
}
