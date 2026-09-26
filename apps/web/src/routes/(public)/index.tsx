import { Title } from "@solidjs/meta";
import { Hero } from "~/components/Hero";


export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <Hero / >
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
