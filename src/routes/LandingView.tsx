import stylex from "@stylexjs/stylex";
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from "react-router-dom";
import { BackgroundImage } from "@/types/Image";
import { useEffect, useState } from "react";
import ImageContainer from "@/components/ImageContainer";

const styles = stylex.create({
    mainContainer:{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: "minmax(min-content, .1fr) auto minmax(min-content, .1fr)",
        gridTemplateColumns: ".1fr .8fr .1fr"
     },
    content:{
        gridColumnStart: "2",
        display: "grid",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyItems: "center",
        gridTemplateRows: ".4fr .4fr .2fr",
        textAlign: "center",
        fontSize: "1.5em",
        color: "white",
        textShadow: "2px 2px 4px black"
    },
    rowFull: {
        gridColumnStart: "1",
        gridColumnEnd: "4",
    }
});

function LandingView()
{
    const navigator = useNavigate();
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        axios.get("api/getImage.php?type=welcome").then(
            (res: AxiosResponse<BackgroundImage>) => setBackgroundImage(`${axios.defaults.baseURL}${res.data.url}`)
        );
    }, [])

    const onNextView = ()=>
    {
        if(localStorage.getItem("visited") === "true")
            navigator("/view");
        else
            navigator("/instruction");
    }

    if(!backgroundImage) return <></>;

    return(<ImageContainer {...stylex.props(styles.mainContainer)} backgroundImage={backgroundImage} onClick={onNextView}>
        <div {...stylex.props(styles.rowFull)}>
            {/* <MobileNavHint><IconArrowBigUp>Swipe Up for Next Headline</IconArrowBigUp></MobileNavHint> */}
        </div>
        {/* <MobileNavHint><IconArrowBigLeft>Swipe Left for Loser and Lies</IconArrowBigLeft></MobileNavHint> */}
        <div {...stylex.props(styles.content)}>
            <h2 style={{ color: "black", textShadow: "2px 2px 4px white" }}>Welcome to Trump Headshakers</h2>
            <p>This is a scrollable collection of thousands of lies, mean comments, misinformation, and bizarre behavior by one Donald Trump and his enablers.</p>
            <p>Every post is supported by its source. Email for any suggestions, additions, or corrections.</p>
            <h5 style={{ color: "black", textShadow: "2px 2px 4px white" }}>Click to Enter</h5>
        </div>
        {/* <MobileNavHint><IconArrowBigRight>Swipe Right for rudeness & wrong</IconArrowBigRight></MobileNavHint> */}
        <div {...stylex.props(styles.rowFull)}>
        {/* <MobileNavHint><IconArrowBigDown>Swipe down to go back</IconArrowBigDown></MobileNavHint> */}
        </div>
    </ImageContainer>);
}

export default LandingView;