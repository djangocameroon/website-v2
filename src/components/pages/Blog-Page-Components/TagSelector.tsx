import { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

interface TagsSelectorProps {
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  availableTags: string[];
}

export const TagsSelector: React.FC<TagsSelectorProps> = ({
  selectedTags,
  onAddTag,
  onRemoveTag,
  availableTags
}) => {
  const [currentTag, setCurrentTag] = useState('');

  // OPTION 1: Add the tag as soon as a comma is typed
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // If the user types a comma
    if (value.includes(',')) {
      // Extract the text before the comma.
      const tagToAdd = value.split(',')[0].trim();
      
      // Add the tag if it is not empty and not already selected
      if (tagToAdd && !selectedTags.includes(tagToAdd)) {
        onAddTag(tagToAdd);
      }

      // Reset the input
      setCurrentTag('');
    } else {
      setCurrentTag(value);
    }
  };

  const handleAddCustomTag = () => {
    if (currentTag.trim() && !selectedTags.includes(currentTag.trim())) {
      onAddTag(currentTag.trim());
      setCurrentTag('');
    }
  };

  // OPTION 2: Add multiple comma-separated tags at once
  // Uncomment this function and use it instead of handleAddCustomTag
  /*
  const handleAddMultipleTags = () => {

    const tags = currentTag.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag && !selectedTags.includes(tag));
    
    // Add all the tags
    tags.forEach(tag => onAddTag(tag));
    
    // Reset the input
    setCurrentTag('');
  };
  */

  return (
    <div>
      <label className="block text-sm urbanist-font font-bold text-gray-700 mb-3">
        Tags <span className="text-red-500">*</span>
      </label>
      
      {/* Available Tags */}
      <div className="flex flex-wrap urbanist-font gap-2 mb-4">
        {availableTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onAddTag(tag)}
            disabled={selectedTags.includes(tag)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              selectedTags.includes(tag)
                ? 'bg-blue-600 text-white cursor-not-allowed'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Custom Tag Input */}
      <div className="flex urbanist-font gap-2 mb-4">
        <input
          type="text"
          value={currentTag}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
          placeholder="Add custom tag (use comma to validate)..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddCustomTag}
          className="px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 font-bold text-sm"
        >
          <AiOutlinePlus size={16} />
          Add
        </button>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 urbanist-font bg-gray-50 rounded-xl">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="hover:text-red-200 transition-colors"
              >
                <AiOutlineClose size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};