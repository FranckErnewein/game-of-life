import React from "react";
import Email from "../Email";
import Title from "./Title";
import Section from "./Section";

export default function About() {
  return (
    <Section>
      <Title>About</Title>
      <p>
        source code on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/FranckErnewein/game-of-life"
        >
          Github
        </a>
      </p>
      <br />
      <p>
        designed by <Email email="franck(dot)ernewein(at)gmail(dot)com" />
      </p>
    </Section>
  );
}
