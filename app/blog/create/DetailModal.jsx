import Modal from '@/components/modal/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './DetailModal.module.scss';  // Import the module.scss file

function DetailModal({ isOpen, onClose, getContent }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        content: "",
        title: '',
        description: '',
        slug: "",
        img: "", 
        category: "",
        seo: {
            title: '',
            description: '',
            keywords: '',
            canonical: '',
        }
    });

    useEffect(() => {
        setFormData(p => ({...p, content: getContent}));
    }, [isOpen, getContent]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData };
            if (name === "title" && newData.slug === newData.title.replace(/ /g, "-")) newData.slug = value.replace(/ /g, "-");
            if (name === "slug") value = value.replace(/ /g, "-");
            newData[name] = value;
            return newData;
        });
    };

    const handleSeoChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            seo: { ...prevData.seo, [name]: value }
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({ ...prevData, img: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const updatedFormData = {
            ...formData,
            seo: {
                ...formData.seo,
                canonical: formData.seo.canonical || formData.slug
            }
        };

        try {
            const { data } = await axios.post('/api/blog', updatedFormData);
            toast.success(data.message);

            router.push(data.url);
            onClose();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message || `Internal server Error : ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Create New Post"
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onCancel={onClose}
            disable={isLoading}
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* General Section */}
                <div className={styles.wrapper} >
                    <div className={styles['form-group']}>
                        <label htmlFor="title">Post Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="slug">Slug</label>
                        <input
                            name="slug"
                            id="slug"
                            type="text"
                            value={formData.slug}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="description">Post Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="category">Category</label>
                    <input
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="image">Post Main Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Meta Tags Section */}
                <div className={styles['meta-section']}>
                    <h3>Meta Tags</h3>
                    <div className={styles['form-group']}>
                        <label htmlFor="seo-title">Meta Title</label>
                        <input
                            type="text"
                            id="seo-title"
                            name="title"
                            value={formData.seo.title}
                            onChange={handleSeoChange}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="seo-description">Meta Description</label>
                        <textarea
                            id="seo-description"
                            name="description"
                            value={formData.seo.description}
                            onChange={handleSeoChange}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="seo-keywords">Meta Keywords</label>
                        <input
                            type="text"
                            id="seo-keywords"
                            name="keywords"
                            value={formData.seo.keywords}
                            onChange={handleSeoChange}
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label htmlFor="seo-canonical">Canonical URL</label>
                        <input
                            type="text"
                            id="seo-canonical"
                            name="canonical"
                            value={formData.seo.canonical || formData.slug}
                            onChange={handleSeoChange}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
}

export default DetailModal;
