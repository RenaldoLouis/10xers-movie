import React, { memo, useContext } from "react";
import { DataContext } from "../context/DataContext";

function LoadingScreen() {
    const { isLoading } = useContext(DataContext);

    const defaultColor = "rgb(22, 97, 190)";

    const defaultTheme = {
        borderTop: "12px solid " + defaultColor,
    };

    return (
        <div>
            {isLoading ? (
                <div className="Backdrop-loading">
                    <div className="loader-wrapper">
                        <div
                            className="loader"
                            style={defaultTheme}
                        ></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default memo(LoadingScreen);
