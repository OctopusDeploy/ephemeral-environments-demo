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
            viewBox="0 0 100 100"
            className="h-24 w-24 text-[#0d80d8]"
            fill="currentColor"
            aria-label="Octopus logo"
          >
            <ellipse cx="50" cy="42" rx="28" ry="24" />
            <circle cx="40" cy="36" r="5" fill="white" />
            <circle cx="60" cy="36" r="5" fill="white" />
            <circle cx="40" cy="36" r="2.2" />
            <circle cx="60" cy="36" r="2.2" />
            <path d="M24 50 C14 58, 16 72, 10 80 C20 78, 24 68, 28 58 Z" />
            <path d="M34 58 C28 68, 26 82, 18 90 C28 90, 34 78, 38 64 Z" />
            <path d="M46 60 C44 72, 44 86, 38 96 C48 94, 50 80, 50 64 Z" />
            <path d="M54 60 C56 72, 56 86, 62 96 C52 94, 50 80, 50 64 Z" />
            <path d="M66 58 C72 68, 74 82, 82 90 C72 90, 66 78, 62 64 Z" />
            <path d="M76 50 C86 58, 84 72, 90 80 C80 78, 76 68, 72 58 Z" />
          </svg>
          <header>
            <h1 className="leading text-4xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span className="text-[#0d80d8]">The Dad Joker 2000!</span>
            </h1>
          </header>
          <p>{data.joke}</p>
          <Form method="post">
            <button
              className="btn bg-[#0d80d8] text-white rounded-md px-4 py-2 hover:bg-[#0a66ad] disabled:bg-gray-300 disabled:text-gray-600"
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
