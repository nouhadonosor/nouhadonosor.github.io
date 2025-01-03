import { Button } from "components/common/button/button";
import './buttons.scss';

export const GithubButton = () => {
    return (
        <Button
            className="github-button"
            svg={require("./svg/github-square.svg").default}
            onClick={() => window.open("https://github.com/nouhadonosor", "_blank")}
        />
    );
};