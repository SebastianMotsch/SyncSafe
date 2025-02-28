import CreateSection from "./CreateSection";

const ContactSetup = () => {
    const [contactClassName1] = [{heading: "h1", body: "p", classType: "div", className: "section"}]
    const [contactClassName2] = [{heading: "h2", body: "p", classType: "div", className: "section"}]

    const [contactContent] = [{heading: "Contact Us", body: "Have questions or need support? Get in touch with us using the contact details below or fill out our contact form."}]
    const [emailContent] = [{heading: "Email", body: "support@syncsafe.com"}]
    const [phoneContent] = [{heading: "Phone", body: "+1 (800) 123-4567"}]
    const [contactFormContent] = [{heading: "Contact Form", body: "tbd"}]

    return (
        <>
        <CreateSection sections={contactContent} classesName={contactClassName1} />
        <CreateSection sections={emailContent} classesName={contactClassName2} />
        <CreateSection sections={phoneContent} classesName={contactClassName2} />
        <CreateSection sections={contactFormContent} classesName={contactClassName2} />
        </>
    )
}

export default ContactSetup;