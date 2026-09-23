const API_URL = "https://jsonplaceholder.typicode.com/users/1";

type PlaceholderUser = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

type PublicUser = {
  id: number;
  name: string;
  email: string;
  company: string;
};

function transformUser(rawData: PlaceholderUser): PublicUser {
  return {
    id: rawData.id,
    name: rawData.name,
    email: rawData.email,
    company: rawData.company.name,
  };
}

async function fetchExternalApi(): Promise<void> {
  // lets us cancel inprogress fetch calls
  const controller = new AbortController();

  const timeOut = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      signal: controller.signal,
    });

    const rawUser = (await response.json()) as PlaceholderUser;

    const user = transformUser(rawUser);

    console.log(user);
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error(`external api took so long, err: `, err.message);
      return;
    }
    const msg = err instanceof Error ? err.message : "something went wrong";
    console.error(`external api call failed, err: `, msg);
  } finally {
    clearTimeout(timeOut);
  }
}

fetchExternalApi();
