import { useState } from "react";

const CreateDropdown = (props) => {
    const section = props.sections;
    const [isActive, setActive] = useState(false)

    return (
        <>
            <button className={isActive ? "open" : "question"} onClick={() => setActive(!isActive)}>
                {section.heading}
            </button>
            {isActive && <div className="answer">
                <p>{section.body}</p>
            </div>}
        </>
    )
}

export default CreateDropdown;