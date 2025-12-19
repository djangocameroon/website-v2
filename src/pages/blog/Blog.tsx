import { BlogHeader, FilterBar, BlogCard } from '@/components/pages/Blog-Page-Components';
import { blogData } from '@/data/blogData';
import JoinUs from "@/components/pages/Blog-Page-Components/JoinUs";
import Navbar from '@/components/layout/navbar/BlogNavbar';


const Blog = () => {
  return (
    <div className='relative'>
      <Navbar />
      <BlogHeader/>
      <FilterBar/>
      <div className='w-full md:w-[85%] mx-auto'>
        <section className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
              {blogData.map((post) => (
                  <BlogCard 
                    key={post.id}
                    {...post} 
                  />
              ))}
          </div>
          
          {/* Pagination Text */}
          <div className="text-center mt-12 text-xs font-medium text-gray-400">
              Showing 1 - 3 of 12
          </div>
        </section>
        <JoinUs />
      </div>
    </div>
  );
};

export default Blog;