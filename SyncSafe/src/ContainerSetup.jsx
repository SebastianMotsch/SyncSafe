// Instead of props could use {sections} to grab the list

const ContainerSetup = (props) => {
    const sections = props.sections;

    return (
        <main>
            {sections.map((section) => (
            <div className="section" key={section.id}>
                <h1>{section.heading} </h1>
                <p>{section.body}</p>
            </div>
            ))}
        </main>
    )
}

export default ContainerSetup;