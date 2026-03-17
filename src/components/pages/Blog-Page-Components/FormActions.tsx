/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  isSubmitting?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting = false 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 pt-6 border-t urbanist-font border-gray-100">
      <button
        type="button"
        onClick={() => navigate('/blog')}
        disabled={isSubmitting}
        className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 py-3 px-6 bg-[#13322b] hover:bg-[#0d241f] text-white rounded-xl font-bold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
      </button>
    </div>
  );
};