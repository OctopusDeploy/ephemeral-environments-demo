import { json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "The Dad Joker 2000" },
    { name: "description", content: "Tell me some jokes" },
  ];
};

type DadJokeResponse = {
  joke: string;
};

export const loader = async () => {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: { Accept: "application/json" },
  });

  if (response.ok) {
    const data: DadJokeResponse = await response.json();
    return json(data);
  }

  throw json({ error: response.body });
};

export const action = async () => {
  return json({ ok: true });
};

export default function Index() {
  const data = useLoaderData<DadJokeResponse>();
  const navigation = useNavigation();

  return (
    <div className="container mx-auto px-4">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <svg
            width="96"
            height="96"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#0d80d8]"
            aria-label="Octopus logo"
          >
            <ellipse cx="60" cy="45" rx="38" ry="32" fill="currentColor" />
            <circle cx="47" cy="40" r="5" fill="white" />
            <circle cx="73" cy="40" r="5" fill="white" />
            <path d="M30 60 C20 75, 15 90, 22 105" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M45 70 C40 85, 38 98, 45 110" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M60 72 C60 88, 60 98, 60 112" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M75 70 C80 85, 82 98, 75 110" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
            <path d="M90 60 C100 75, 105 90, 98 105" stroke="currentColor" strokeWidth="10" strokeLinecap="round" fill="none" />
          </svg>
          <header>
            <h1 className="leading text-4xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span className="text-[#0d80d8]">The Dad Joker 2000!</span>
            </h1>
          </header>
          <p>{data.joke}</p>
          <Form method="post">
            <button
              className="btn bg-[#0d80d8] text-white rounded-md px-4 py-2 hover:bg-[#0d80d8]/80 disabled:bg-gray-300 disabled:text-gray-600"
              type="submit"
              disabled={navigation.state !== "idle"}
            >
              Tell me another one
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
