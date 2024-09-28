"use client";
import React, { useState } from "react";
import style from "./contact.module.scss";
import { sendEmailAction } from "./emailAction"; 

function Form() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({});
    const [statusMessage, setStatusMessage] = useState("");

    const onChange = (e) =>
        setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await sendEmailAction(formData); 

        if (response.success) {
            setStatusMessage("Email sent successfully!");
        } else {
            setStatusMessage(`Error: ${response.error}`);
        }

        setFormData({})
        setIsLoading(false)
    };

    return (
        <section className={style.form}>
            <h2 className="commonContent">
                fill out the <span>form below</span>, and I&apos;ll get back to you
                asap!
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Name*"
                        name="name"
                        value={formData?.name || ""}
                        onChange={onChange}
                        required
                    />
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formData?.email || ""}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Message"
                        name="message"
                        value={formData?.message || ""}
                        onChange={onChange}
                        rows={8}
                        required
                    />
                </div>
                <button disabled={isLoading} type="submit">{isLoading ? "Sending..." : "Submit"}</button>
            </form>
            {statusMessage && <p>{statusMessage}</p>}
            {isLoading && <p>Sending your message, please wait...</p>}
        </section>
    );
}

export default Form;
