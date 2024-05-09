import stylex from "@stylexjs/stylex";
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "@/types/Image";
import { useEffect, useState } from "react";
import UpArrow from "../assets/uparrow.svg";
import DownArrow from "../assets/downarrow.svg";
import LeftArrow from "../assets/leftarrow.svg";
import RightArrow from "../assets/rightarrow.svg";

const styles = stylex.create({
    mainContainer:{
        backgroundImage: "url('http://localhost/api/images/intro/Trum1p yelling cropped.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100dvh",
        width: "100dvw",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "minmax(min-content, .1fr) auto minmax(min-content, .1fr)",
        gridTemplateColumns: ".1fr .8fr .1fr"
     },
    content: {
        gridColumnStart: "2",
        gridRowStart: "2",
        display: "grid",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyItems: "center",
        rowGap: "0.5rem",
        textAlign: "center",
        fontSize: "1.5em",
        marginTop: "1.5em",
        color: "white",
        textShadow: "2px 2px 4px black"
    },
});

function InstructionView()
{
    const navigator = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=intro").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`url('${axios.defaults.baseURL}${res.data.url}')`)
        );
    }, [])

    const onToMainView = ()=>
    {
        navigator("/view");
    }

    return (<div {...stylex.props(styles.mainContainer)} style={{backgroundImage}} onClick={onToMainView}>
        <div {...stylex.props(styles.content)}>
            <img src={UpArrow} width={"100px"}/>
            <p>Explore all the reasons why Donald Trump and his allies are the wrong choice for the USA and for you in 2024</p>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <img src={LeftArrow} width={"100px"}/>
                <img src={RightArrow} width={"100px"}/>
            </div>
            
            <p>Support a better candidate for 2024 and ask your politicians to get back to work</p>
            <img src={DownArrow} width={"100px"}/>
            <p>Click to Continue</p>
        </div>
    </div>);
}

export default InstructionView;