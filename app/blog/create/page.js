"use client";

import { useEffect, useState } from "react";
import DetailModal from "./DetailModal";
import styles from "./createBlog.module.scss";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const CreateBlog = () => {
    const [editorState, setEditorState] = useState("");  // Initialize editor state
    const [isModalOpen, setIsModalOpen] = useState(false);  // Initialize modal state

    const { quill, quillRef, Quill } = useQuill({
        modules: { blotFormatter: {} }
    });


    useEffect(() => {
        if (quill) {
            quill.on("text-change", () => {
                setEditorState(quill.root.innerHTML)
            });
        }
    }, [quill, Quill]);


    console.log({ editorState })

    return (
        <>
            <main className={styles.container}>
                <div className={styles.editorContainer}>
                    <h2 className={styles.title}>Create a New Blog Post</h2>
                    {/* Use ReactQuill editor */}
                    {/* <Editor 
                        theme="snow" 
                        modules={modules} 
                        value={editorState} 
                        onChange={setEditorState}  // Update editor state on change
                    /> */}
                    <div ref={quillRef} className="wrapperClass" />
                </div>
                <div className={styles.previewContainer}>
                    <div className={styles.title}>
                        <h2>Preview</h2>
                        <button onClick={() => setIsModalOpen(true)}>Publish</button>
                    </div>
                    <div
                        className={`ql-editor previewContent`}  
                        dangerouslySetInnerHTML={{ __html: editorState }} 
                    />
                </div>
            </main>
            <DetailModal
                onClose={() => setIsModalOpen(false)}
                isOpen={isModalOpen}
                getContent={editorState}
            />
        </>
    );
};

export default CreateBlog;
