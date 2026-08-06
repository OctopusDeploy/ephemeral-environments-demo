import { json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { OctopusLogo } from "~/components/OctopusLogo";

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
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-8">
          <OctopusLogo className="h-24 w-auto sm:h-32" />
          <header>
            <h1 className="leading text-4xl font-bold text-gray-800 dark:text-gray-100">
              Welcome to <span className="text-brand">The Dad Joker 2000!</span>
            </h1>
          </header>
          <p className="text-brand">{data.joke}</p>
          <Form method="post">
            <button
              className="btn bg-brand text-white rounded-md px-4 py-2 hover:bg-brand/80 disabled:bg-gray-300 disabled:text-gray-600"
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
