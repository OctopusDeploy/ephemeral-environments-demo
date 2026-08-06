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

function OctopusLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-24 w-24"
      fill="#0d80d8"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Octopus Deploy logo"
    >
      <path d="M32 4C19.85 4 10 13.85 10 26c0 8.06 3.98 14.36 3.98 20.4 0 2.2-1.6 3.2-1.6 5.2 0 2.43 2.15 4.4 4.8 4.4 2.98 0 5.2-2.3 5.2-5.4 0-2.55-1.4-3.7-1.4-6.4 0-1.66 1.34-3 3-3s3 1.34 3 3c0 2.7-1.4 3.85-1.4 6.4 0 3.1 2.22 5.4 5.2 5.4s5.2-2.3 5.2-5.4c0-2.55-1.4-3.7-1.4-6.4 0-1.66 1.34-3 3-3s3 1.34 3 3c0 2.7-1.4 3.85-1.4 6.4 0 3.1 2.22 5.4 5.2 5.4 2.65 0 4.8-1.97 4.8-4.4 0-2-1.6-3-1.6-5.2C50.02 40.36 54 34.06 54 26 54 13.85 44.15 4 32 4z" />
      <circle cx="24" cy="24" r="3.4" fill="white" />
      <circle cx="40" cy="24" r="3.4" fill="white" />
    </svg>
  );
}

export default function Index() {
  const data = useLoaderData<DadJokeResponse>();
  const navigation = useNavigation();

  return (
    <div className="container mx-auto px-4">
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <OctopusLogo />
          <header>
            <h1 className="leading text-4xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span className="text-[#0d80d8]">The Dad Joker 2000!</span>
            </h1>
          </header>
          <p>{data.joke}</p>
          <Form method="post">
            <button
              className="btn bg-[#0d80d8] text-white rounded-md px-4 py-2 hover:bg-[#3a9be0] disabled:bg-gray-300 disabled:text-gray-600"
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
