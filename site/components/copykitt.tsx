'use client'
import React from "react";

const Copykitt: React.FC = () => {

    const ENDPOINT: string = "https://ilo033kdf1.execute-api.us-east-1.amazonaws.com/prod/gen-snippets-and-keywords";

    const [subject, setSubject] = React.useState("");
    const [snippets, setSnippets] = React.useState("");
    const [keywords, setKeywords] = React.useState("");
    const [hasResult, setHashResult] = React.useState(false);

    let resultsElement = null;

    const onSubmit = () => {
        resultsElement = null;
        console.log("Submitting: " + subject);
        fetch(`${ENDPOINT}?subject=${subject}`)
            .then((res) => res.json())
            .then(onResult);
    };

    const onResult = (data: any) => {
        setSnippets(data.snippets.replaceAll("*", ""));
        setKeywords(data.keywords.replaceAll("*", ""));
        setHashResult(true);
    }

    if (hasResult) {
        resultsElement = (
            <div>
                Here are your results:
                <div>Snippets:</div>
                <textarea rows={15} cols={65} value={snippets} onChange={(e) => setSnippets(e.target.value)}></textarea>
                <div>Keywords:</div>
                <textarea rows={15} cols={65} value={keywords} onChange={(e) => setKeywords(e.target.value)}></textarea>
            </div>
        )
    }

    return (
        <>
        <h1>CopyKitt</h1>
            <p>Tell me what your brand is about and I will generate copy and keywords for you.</p>
            <input type={"text"} placeholder={"coffee"} value={subject} onChange={(e) => setSubject(e.currentTarget.value)}></input>
            <button onClick={onSubmit}>Submit</button>
            {resultsElement}
        </>
    );

}

export default Copykitt;