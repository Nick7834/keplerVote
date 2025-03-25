import axios from "axios";
import toast from "react-hot-toast";
import { FormCreateItemShema } from "../shema";

export const createItem = async (
  data: FormCreateItemShema,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", data.image as File);

    const res = await axios.post("/api/item/create", formData);

    if (res.status === 200) {
      toast.success("Item created successfully");
      setOpen(false);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
