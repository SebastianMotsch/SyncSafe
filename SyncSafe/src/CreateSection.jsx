const CreateSection = (props) => {
    const sections = props.sections;

    return (
        <>
            {sections.map((section) => (
                <div className="section" key={section.id}>
                    {section.heading}
                    {section.body}
                </div>
                    
            ))}
        </>
    )
}

export default CreateSection;