import axios from "axios";

export const fetchImages = async (name, page) => {
  const URL = "https://pixabay.com/api";
  const API_KEY = "24156955-5d6b1f88c7bcfef4746f728b1";

  const response = await axios.get(
    `${URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
