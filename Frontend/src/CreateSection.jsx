const CreateSection = (props) => {
    const sections = props.sections;
    const classesName = props.classesName;

    return (
        <classesName.classType class={classesName.className}>
            <classesName.heading>
                {sections.heading}
            </classesName.heading>
            <classesName.body>
                {sections.body}
            </classesName.body>
        </classesName.classType >
    )
}

export default CreateSection;