"use client";
import { useEffect, useMemo, useState } from 'react';
import { BlogHeader, FilterBar, BlogCard } from '@/components/pages/Blog-Page-Components';
//import JoinUs from "@/components/pages/Blog-Page-Components/JoinUs";
import Newsletter from '@/components/pages/Home-Page-Components/Newsletter';
import { useBlogPosts } from '@/hooks/useBlogPosts';


const Blog = () => {
  const filterTabs = [
    { title: "Latest", value: "latest" },
    { title: "Most Liked", value: "most-liked" },
    { title: "Most Viewed", value: "most-viewed" },
  ] as const;

  type FilterType = typeof filterTabs[number]['value'];

  const [currentFilter, setCurrentFilter] = useState<FilterType>(filterTabs[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);

  const { posts: blogs } = useBlogPosts();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call handler right away to get initial size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBlogs = useMemo(() => {
    const _blogs = [...blogs];

    switch (currentFilter) {
      case "most-liked":
        _blogs.sort((a, b) => b.likes - a.likes);
        break;
      case "most-viewed":
        _blogs.sort((a, b) => b.views - a.views);
        break;
      case "latest":
        _blogs.sort((a, b) => a.read_time - b.read_time);
        break;
      default:
        break;
    }

    if (searchQuery.trim()) {
      return _blogs.filter((bi) =>
        bi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bi.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bi.author.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return _blogs;
  }, [blogs, currentFilter, searchQuery]);

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className='relative'>
      <BlogHeader />
      <FilterBar
        tabs={filterTabs}
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
            Showing 1 - {filteredBlogs.length} of {blogs.length}
          </div>
        </section>

        {/*<JoinUs/>*/}
        <Newsletter />
      </div>
    </div>
  );
};

export default Blog;