"use client";
import { useEffect, useState } from 'react';
import { BlogHeader, FilterBar, BlogCard } from '@/components/pages/Blog-Page-Components';
import { blogData, BlogPost } from '@/data/blogData';
//import JoinUs from "@/components/pages/Blog-Page-Components/JoinUs";
import Newsletter from '@/components/pages/Home-Page-Components/Newsletter';


type FilterType = "Latest" | "Most Liked" | "Most Viewed";

const Blog = () => {
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(blogData);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("Latest");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away to get initial size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    const sorted = [ ...blogData  ];

    switch (filter) {
      case "Most Liked":
        sorted.sort((a, b) => parseInt(b.like) - parseInt(a.like));
        break;
      case "Most Viewed":
        sorted.sort((a, b) => parseInt(b.views) - parseInt(a.views));
        break;
      case "Latest":
        sorted.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
        break;
      default:
        break;
    }

    setFilteredBlogs(sorted);
  };

  const handleSearchChange = (query: string) => {
    let filtered = [...blogData];

    // Apply the current sorting filter
    switch (currentFilter) {
      case "Most Liked":
        filtered.sort((a, b) => parseInt(b.like) - parseInt(a.like));
        break;
      case "Most Viewed":
        filtered.sort((a, b) => parseInt(b.views) - parseInt(a.views));
        break;
      case "Latest":
        filtered.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
        break;
    }

    // Apply the search if present
    if (query) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        blog.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div className='relative'>
      <BlogHeader />
      <FilterBar
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />
      <div className='w-full md:w-[85%] mx-auto max-md:px-4'>
        <section className="pb-10">
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns:
                windowWidth >= 1380
                  ? "repeat(2, minmax(0, 1fr))"
                  : "repeat(1, minmax(0, 1fr))",
            }}
          >
            {filteredBlogs.map((post) => (
              <BlogCard
                key={post.id}
                {...post}
              />
            ))}
          </div>

          {/* Pagination Text */}
          <div className="text-center mt-12 text-xs font-medium text-gray-400">
            Showing 1 - {filteredBlogs.length} of {blogData.length}
          </div>
        </section>

        {/*<JoinUs/>*/}
        <Newsletter />
      </div>
    </div>
  );
};

export default Blog;