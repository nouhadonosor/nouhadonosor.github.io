import { Button } from "components/common/button/button";
import './buttons.scss';

export const GmailButton = () => {
    return (
        <Button
            className="gmail-button"
            svg={require("./svg/gmail-square.svg").default}
            onClick={() => window.open("mailto:nouhadonosor@gmail.com", "_blank")}
        />
    );
};