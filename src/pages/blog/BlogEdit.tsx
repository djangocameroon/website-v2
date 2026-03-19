/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogApi } from '@/lib/blogApi';
import {
    BlogAddHeader,
    TitleInput,
    TagsSelector,
    ImageUpload,
    RichTextEditor,
    FormActions
} from '@/components/pages/Blog-Page-Components';
import { CalculateReadingTime } from '@/components/pages/Blog-Page-Components/CalculateReadingTime';
import toast from 'react-hot-toast';
import { useBlogPost } from '@/hooks/useBlogPost';

const AVAILABLE_TAGS = [
    "Beginner",
    "Python",
    "Django",
    "AI",
    "ML",
    "Real-Time",
    "Tutorial",
    "Community"
];

const BlogEdit = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef<any>(null);

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string | undefined>(undefined);
    const [hasCoverImageChanged, setHasCoverImageChanged] = useState(false);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { post, loading } = useBlogPost(slug);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setTags(post.tags);
            setContent(post.content);
            setCoverImagePreview(post.cover_image);
        }
    }, [post]);

    const handleMainImageChange = (file: File) => {
        setCoverImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setHasCoverImageChanged(true);
    };

    const handleAddTag = (tag: string) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post) return;

        const editorContent = content ?? editorRef.current?.getContent() ?? '';
        const readTime = CalculateReadingTime(editorContent);

        if (!title || !editorContent || tags.length === 0 || !coverImagePreview) {
            alert('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            let cover_image = undefined;
            if (hasCoverImageChanged && coverImage) {
                const uploadResult = await blogApi.uploadImage(coverImage);
                cover_image = uploadResult.file_url;
                if (import.meta.env.MODE === "development") cover_image = import.meta.env.VITE_PUBLIC_API_URL + cover_image;
            }
            const updateBlogPayload = {
                title,
                tags: tags.map(t => t.toLowerCase()),
                cover_image,
                content: editorContent,
                read_time: readTime,
            };

            const updatedBlogPost = await blogApi.updatePost(post.id, updateBlogPayload);
            navigate(`/blog/${updatedBlogPost.slug}`);
        } catch (error) {
            console.error('Error creating blog post:', error);
            toast.error('Failed to create blog post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-screen-lg mx-auto px-6 pt-32 pb-20">

                <BlogAddHeader />

                <form onSubmit={handleSubmit} className="space-y-8">

                    <TitleInput value={title} onChange={setTitle} />

                    <ImageUpload
                        label="Cover Image"
                        preview={coverImagePreview}
                        onImageChange={handleMainImageChange}
                        id="cover-image"
                    />

                    <TagsSelector
                        selectedTags={tags}
                        onAddTag={handleAddTag}
                        onRemoveTag={handleRemoveTag}
                        availableTags={AVAILABLE_TAGS}
                    />

                    <RichTextEditor
                        initialContent={post?.content}
                        onContentChange={setContent}
                        onEditorInit={(editor) => editorRef.current = editor}
                    />

                    <FormActions
                        isSubmitting={isSubmitting}
                    />

                </form>
            </main>
        </div>
    );
};

export default BlogEdit;