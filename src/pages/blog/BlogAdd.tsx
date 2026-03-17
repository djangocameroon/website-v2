/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BlogAddHeader, 
  TitleInput, 
  TagsSelector, 
  ImageUpload,
  RichTextEditor,
  FormActions 
} from '@/components/pages/Blog-Page-Components';
import { CalculateReadingTime } from '@/components/pages/Blog-Page-Components/CalculateReadingTime';

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

const BlogAdd = () => {
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMainImageChange = (file: File) => {
    setMainImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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
    
    const editorContent = editorRef.current ? editorRef.current.getContent() : content;
    const readTime = CalculateReadingTime(editorContent);
    
    if (!title || !editorContent || tags.length === 0 || !mainImage) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBlog = {
        id: Date.now(),
        title,
        tags: tags.map(t => t.toLowerCase()),
        image: mainImagePreview,
        content:  editorContent.substring(0, 2500),
        author: 'Anonymous',
        readTime: readTime || '5',
        like: '0',
        views: '0',
      };

      console.log('New blog post:', newBlog);
      
      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-screen-lg mx-auto px-6 pt-32 pb-20">
        
        <BlogAddHeader/>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <TitleInput value={title} onChange={setTitle} />

          <ImageUpload
            label="Cover Image"
            required
            preview={mainImagePreview}
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

export default BlogAdd;