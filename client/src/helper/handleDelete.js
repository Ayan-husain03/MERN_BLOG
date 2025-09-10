import { AlertPop } from "./Alert";

async function handleDelete(url) {
  try {
    const res = await fetch(url, {
      method: "delete",
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      AlertPop("error", data.message || "operation failed");
      return false;
    }
    AlertPop("success", data.message || "deleted successfully");
    return true;
  } catch (error) {
    console.log(error);
    AlertPop("error", error.message || "error in delete");
    return false;
  }
}

export default handleDelete;
