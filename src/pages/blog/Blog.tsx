"use client";
import { useEffect, useMemo, useState } from 'react';
import { BlogHeader, FilterBar, BlogCard } from '@/components/pages/Blog-Page-Components';
import { blogData } from '@/data/blogData';
//import JoinUs from "@/components/pages/Blog-Page-Components/JoinUs";
import Newsletter from '@/components/pages/Home-Page-Components/Newsletter';



const Blog = () => {
  const filterTabs = [
    { title: "Latest", value: "latest" },
    { title: "Most Liked", value: "most-liked" },
    { title: "Most Viewed", value: "most-viewed" },
  ] as const;
  
  type FilterType = typeof filterTabs[number]['value'];

  // const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(blogData);
  const [currentFilter, setCurrentFilter] = useState<FilterType>(filterTabs[0].value);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredBlogs = useMemo(() => {
    const _blogs = [ ...blogData ];

    switch (currentFilter) {
      case "most-liked":
        _blogs.sort((a, b) => parseInt(b.like) - parseInt(a.like));
        break;
      case "most-viewed":
        _blogs.sort((a, b) => parseInt(b.views) - parseInt(a.views));
        break;
      case "latest":
        _blogs.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
        break;
      default:
        break;
    }

    if (searchQuery.trim()) {
      return _blogs.filter((bi) =>
        bi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bi.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        bi.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return _blogs;
  }, [currentFilter, searchQuery]);

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