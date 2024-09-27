import React from "react";

interface FormSubject {
    subject: string;
    setSubject: any;
    onSubmit: any;
    isLoading: boolean;
    subjectLimit: number;
}

const Form: React.FC<FormSubject> = (props) => {
    const updateSubjectValue = (text: string) => {
        if (text.length <= props.subjectLimit) {
            props.setSubject(text);
        }
    };

    return (
        <>
            <p>Tell me what your brand is about and I will generate copy and keywords for you.</p>
            <input type={"text"} placeholder={"coffee"} value={props.subject}
                   onChange={(e) => updateSubjectValue(e.currentTarget.value)}></input>
            <div>{props.subject.length}/{props.subjectLimit}</div>
            <button onClick={props.onSubmit} disabled={props.isLoading}>Submit</button>
        </>
    );
}

export default Form;