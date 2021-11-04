import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export function Spinner() {
  return (
    <Loader
      type="TailSpin"
      color="#00ff55"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}
