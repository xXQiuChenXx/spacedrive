import { ItemsResponse } from "./driveRequest";

export const deleteFiles = async (items: ItemsResponse[]) => {
  for (const item of items) {
    await fetch("http://localhost:3000/api/graph/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => res.json());
  }
};
