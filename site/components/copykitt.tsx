'use client'
import React from "react";
import Form from "@/components/form";
import Results from "@/components/results";

const Copykitt: React.FC = () => {
    const SUBJECT_LIMIT: number = 32;
    const ENDPOINT: string = "https://ilo033kdf1.execute-api.us-east-1.amazonaws.com/prod/gen-snippets-and-keywords";

    const [subject, setSubject] = React.useState("");
    const [snippets, setSnippets] = React.useState("");
    const [keywords, setKeywords] = React.useState("");
    const [hasResult, setHashResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    let displayedElement = null;

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

    const onReset = (data: any) => {
        setSubject("");
        setHashResult(false);
        setIsLoading(false);
    }

    if (hasResult) {
        displayedElement = <Results subject={subject} snippets={snippets} setSnippets={setSnippets} keywords={keywords} setKeywords={setKeywords}  onBack={onReset}/>
    } else {
        displayedElement = <Form subject={subject} setSubject={setSubject} onSubmit={onSubmit}  isLoading={isLoading} subjectLimit={SUBJECT_LIMIT}/>
    }

    return (
        <>
            <h1>CopyKitt</h1>
            {displayedElement}
        </>
    );

}

export default Copykitt;