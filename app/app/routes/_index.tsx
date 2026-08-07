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
            className="h-28 w-28"
            viewBox="0 0 100 100"
            fill="#0d80d8"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Octopus logo"
          >
            <circle cx="50" cy="38" r="26" />
            <path d="M14 44c-4 8-2 18 6 18 5 0 7-5 6-11-1-6 2-9-12-7z" />
            <path d="M86 44c4 8 2 18-6 18-5 0-7-5-6-11 1-6-2-9 12-7z" />
            <path d="M22 56c-6 10-6 22 3 24 6 1 9-6 7-13-2-7 3-8-10-11z" />
            <path d="M78 56c6 10 6 22-3 24-6 1-9-6-7-13 2-7-3-8 10-11z" />
            <path d="M32 62c-4 12-1 26 8 27 6 1 8-7 5-15-3-8 3-9-13-12z" />
            <path d="M68 62c4 12 1 26-8 27-6 1-8-7-5-15 3-8-3-9 13-12z" />
            <path d="M43 66c-2 13 2 27 11 27 6 0 7-8 3-16-4-8 2-9-14-11z" />
            <path d="M57 66c2 13-2 27-11 27-6 0-7-8-3-16 4-8-2-9 14-11z" />
            <circle cx="40" cy="34" r="5" fill="white" />
            <circle cx="60" cy="34" r="5" fill="white" />
            <circle cx="40" cy="34" r="2.5" fill="#0d80d8" />
            <circle cx="60" cy="34" r="2.5" fill="#0d80d8" />
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
