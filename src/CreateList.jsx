const CreateList = (props) => {
    const sections = props.sections;

    return (
        <>
            {sections.map((section) => (
                <li key={section.id}>
                    {section.body}
                </li>
            ))}
        </>
    )
}

export default CreateList;
