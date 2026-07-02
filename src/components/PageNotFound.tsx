import { Link } from 'react-router-dom';
import { HiOutlineFaceFrown } from 'react-icons/hi2';

const PageNotFound = () => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center">
      <HiOutlineFaceFrown className="size-12 text-primary/40" aria-hidden="true" />
      <h1 className="nohemi-font text-3xl font-bold text-dark sm:text-4xl">Page not found</h1>
      <p className="urbanist-font max-w-sm text-grey">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white nohemi-font transition-transform duration-300 hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </div>
  );
};

export default PageNotFound;
