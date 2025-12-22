import { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";

const ProjectNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 my-8">
      {/* Left Content */}
      <div className="flex-1 max-w-xl space-y-4">
        <h3 className="nohemi-font text-2xl md:text-3xl font-bold text-gray-900">
          And also make sure to join our newsletter to remain updated about the
          community.
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm urbanist-font font-medium">
            article
          </span>
          <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm urbanist-font font-medium">
            projects
          </span>
          <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm urbanist-font font-medium">
            tutorials
          </span>
          <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm urbanist-font font-medium">
            news
          </span>
        </div>
      </div>

      {/* Newsletter Form */}
      <div className="flex-1 max-w-lg w-full">
        <form
          onSubmit={handleSubmit}
          className="relative border-2 border-gray-900 rounded-[2rem] p-2"
        >
          <div className="bg-gray-50 rounded-[1.5rem] flex items-center px-4 py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent focus:outline-none urbanist-font text-base placeholder:text-gray-400"
              required
            />
            <button
              type="submit"
              className="ml-4 p-2 hover:opacity-70 transition-opacity"
              aria-label="Subscribe"
            >
              <BiPaperPlane className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectNewsletter;
