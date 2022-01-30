import React, { useState, memo, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { useCookies } from "react-cookie";

import { isEmpty } from "lodash";

function LoadingScreen() {
    const { isLoading } = useContext(DataContext);
    const [cookie, setCookie] = useCookies(["tenant"]);

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
