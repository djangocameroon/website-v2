const ProjectCTA = () => {
  return (
    <div className="bg-[#0C4B33] rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-lg">
      <h2 className="text-white nohemi-font text-3xl md:text-4xl font-bold">
        Have a Django Project?
      </h2>
      <p className="text-white/90 urbanist-font text-lg max-w-2xl mx-auto">
        Share your open-source Django project with the community. Let's build
        amazing things together and inspire others!
      </p>
      <button className="bg-white text-[#0C4B33] urbanist-font font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg">
        Submit Your Project
      </button>
    </div>
  );
};

export default ProjectCTA;
