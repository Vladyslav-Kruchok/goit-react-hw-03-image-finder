import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from "react-loader-spinner";

export const Loader = () => {
    return (
        <BallTriangle
            color="#00BFFF"
            height={300}
            width={300}
        />
    );
};