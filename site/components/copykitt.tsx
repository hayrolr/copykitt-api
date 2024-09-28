'use client'
import React from "react";
import Form from "@/components/form";
import Results from "@/components/results";
import Image from "next/image";
import logo from "../app/copykittLogo.svg";

const Copykitt: React.FC = () => {
    const SUBJECT_LIMIT: number = 32;
    const ENDPOINT: string = "https://ilo033kdf1.execute-api.us-east-1.amazonaws.com/prod/gen-snippets-and-keywords";

    const [subject, setSubject] = React.useState("");
    const [snippets, setSnippets] = React.useState("");
    const [keywords, setKeywords] = React.useState("");
    const [hasResult, setHashResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    let displayedElement;

    const onSubmit = () => {
        console.log("Submitting: " + subject);
        setIsLoading(true);
        fetch(`${ENDPOINT}?subject=${subject}`)
            .then((res) => res.json())
            .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippets(data.snippets.replaceAll("*", ""));
        setKeywords(data.keywords.replaceAll("*", ""));
        setHashResult(true);
        setIsLoading(false);
    }

    const onReset = () => {
        setSubject("");
        setHashResult(false);
        setIsLoading(false);
    }

    if (hasResult) {
        displayedElement = <Results subject={subject} snippets={snippets} setSnippets={setSnippets} keywords={keywords} setKeywords={setKeywords}  onBack={onReset}/>
    } else {
        displayedElement = <Form subject={subject} setSubject={setSubject} onSubmit={onSubmit}  isLoading={isLoading} subjectLimit={SUBJECT_LIMIT}/>
    }

    const gradientTextStyle =
    "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 font-light w-fit mx-auto";

    return (
        <div className={"h-screen flex"}>
            <div className={"max-w-md m-auto p-2"}>
                <div className={"bg-slate-800 p-6 rounded-md text-white"}>
                    <div className={"text-center m-6"}>
                        <Image className={"m-auto"} src={logo} width={42} height={42}  alt={"CopyKitt"}/>
                        <h1 className={gradientTextStyle + " text-3xl font-light"}>CopyKitt</h1>
                        <div className={gradientTextStyle}>Your AI branding assistant</div>
                    </div>
                    {displayedElement}
                </div>
            </div>
        </div>
    );

};

export default Copykitt;