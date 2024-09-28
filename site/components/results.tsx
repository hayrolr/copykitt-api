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
    const resultSection = (label: string, body: any) => {
        return (
            <div className={"bg-slate-700 p-4 my-4 rounded-md"}>
                <div className={"text-slate-400 text-sm font-bold mb-4"}>{label}</div>
                <textarea className={"w-full p-2 my-2 text-slate-700 text-sm rounded-md bg-slate-300"} rows={7} value={body} readOnly={true}></textarea>
            </div>
        );
    };

    return (
        <>
            <div>
                <div className={"mb-6 text-slate-400 text-sm"}>
                    <p>Here are your results... remember: "With great power comes great responsibility".</p>
                </div>
                <div className={"bg-slate-700 p-4 my-3 rounded-md"}>
                    <div className={"text-slate-400 text-sm font-bold mb-4"}>Your subject</div>
                    <div className={"text-lg"}>{props.subject}</div>
                </div>
                {resultSection("Branding Snippets", props.snippets)}
                {resultSection("Branding Keywords", props.keywords)}
            </div>
            <button
                className={"bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full mt-3 p-2 rounded-md text-lg"}
                onClick={props.onBack}
            >
                Back
            </button>
        </>
    );
}

export default Results;