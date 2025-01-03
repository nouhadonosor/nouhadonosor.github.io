import { Button } from "components/common/button/button";
import './buttons.scss';

export const TelegramButton = () => {
    return (
        <Button
            className="telegram-button"
            svg={require("./svg/telegram-square.svg").default}
            onClick={() => window.open("https://t.me/nouhadonosor", "_blank")}
        />
    );
};