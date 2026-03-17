/* eslint-disable @typescript-eslint/no-unused-vars */
import { Editor } from '@hugerte/hugerte-react';
import type { Editor as HugeRTEEditor } from 'hugerte';

interface RichTextEditorProps {
  onContentChange: (content: string) => void;
  onEditorInit: (editor: HugeRTEEditor) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onContentChange,
  onEditorInit
}) => {
  return (
    <div>
      <label className="block urbanist-font text-sm font-bold text-gray-700 mb-2">
        Content <span className="text-red-500">*</span>
      </label>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <Editor
          onInit={(_evt, editor) => onEditorInit(editor)}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
              'fullscreen', 'insertdatetime', 'media', 'table', 'help', 
              'wordcount', 'emoticons', 'codesample'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic underscore forecolor backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'link image media | codesample emoticons | removeformat | help',
            
            // Configuration pour les images - CORRIGÉE
            images_upload_handler: (blobInfo) => {
              return new Promise((resolve, reject) => {
                try {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64data = reader.result as string;
                    resolve(base64data);
                  };
                  reader.onerror = () => {
                    reject('Image conversion failed');
                  };
                  reader.readAsDataURL(blobInfo.blob());
                } catch (error) {
                  reject('Failed to process image');
                }
              });
            },
            
            // Permettre l'upload d'images
            automatic_uploads: true,
            images_reuse_filename: true,
            file_picker_types: 'image',
            paste_data_images: true, // Permet de coller des images
            
            // Configuration des liens
            link_default_target: '_blank',
            link_assume_external_targets: true,
            link_title: false,
            
            // Style du contenu
            content_style: `
              body { 
                font-family: "urbanist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                font-size: 16px; 
                line-height: 1.6;
                padding: 1rem;
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 1rem 0;
                display: block;
              }
              a {
                color: #2563eb;
                text-decoration: underline;
              }
            `,
          }}
          onEditorChange={onContentChange}
        />
      </div>
    </div>
  );
};