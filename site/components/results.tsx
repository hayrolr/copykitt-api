import React from "react";

interface ResultsProps {
    subject: string;
    snippets: string;
    setSnippets: any;
    keywords: string;
    setKeywords: any;
    onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
    return (
        <>
            <div>
                <div><b>Your subject</b></div>
                <div>{props.subject}</div>
                <div><b>Snippets</b></div>
                <div><textarea rows={10} cols={65} value={props.snippets} onChange={(e) => props.setSnippets(e.target.value)} readOnly={true}></textarea></div>
                <div><b>Keywords</b></div>
                <div><textarea rows={10} cols={65} value={props.keywords} onChange={(e) => props.setKeywords(e.target.value)} readOnly={true}></textarea></div>
            </div>
            <button onClick={props.onBack}>Back</button>
        </>
    );
}

export default Results;