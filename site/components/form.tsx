import React from "react";

interface FormSubject {
    subject: string;
    setSubject: any;
    onSubmit: any;
    isLoading: boolean;
    subjectLimit: number;
}

const Form: React.FC<FormSubject> = (props) => {
    const isSubjectValid = props.subject.length < props.subjectLimit;
    const updateSubjectValue = (text: string) => {
        if (text.length <= props.subjectLimit) {
            props.setSubject(text);
        }
    };

    let statusColor = "text-slate-600";
    let statusText = null;
    if (!isSubjectValid) {
        statusColor = "text-red-400";
        statusText = `Input must be less than ${props.subjectLimit} characters.`;
    }

    return (
        <>
            <div className={"mb-6 text-slate-400"}>
                <p>Tell me what your brand is about and I will generate copy and keywords for you.</p>
            </div>
            <input
                className={"p-2 w-full rounded-md focus:outline-teal-400 focus:outline text-slate-700"}
                type={"text"} placeholder={"coffee"} value={props.subject}
                onChange={(e) => updateSubjectValue(e.currentTarget.value)}
            >
            </input>
            <div className={statusColor + " flex justify-between my-2 mb-6 text-sm"}>
                <div>{statusText}</div>
                <div>{props.subject.length}/{props.subjectLimit}</div>
            </div>
            <button
                className={"bg-gradient-to-r from-teal-400 to-blue-500 disabled:opacity-50 w-full p-2 rounded-md text-lg mb-4"}
                onClick={props.onSubmit} disabled={props.isLoading || !isSubjectValid}
            >
                Submit
            </button>
        </>
    );
}

export default Form;