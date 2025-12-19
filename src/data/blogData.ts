import { BlogImages } from '@/assets';

export const AVAILABLE_TAGS = [
  "Beginner", 
  "Python", 
  "Django", 
  "AI", 
  "ML", 
  "Real-Time",
  "Tutorial",
  "Community"
];


export const FILTERS = [
    { label: "Latest", active: true },
    { label: "Most Read", active: false },
    { label: "Most Viewed", active: false },
];
export interface BlogPost {
  id: number;
  image: string;
  tags: string[];
  title: string;
  like: string;
  views: string;
  readTime: string;
  author: string;
  description: {
    part1: string;
    middleImage: string;
    part2: string;
  };
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    image: BlogImages.post1,
    tags: ["beginner", "python", "django"],
    title: "From Beginner to Pro: A Comprehensive Guide to Building Feature-Rich Web Applications with Django - Your One-Stop Shop for Mastering the Python Framework",
    like: "234",
    views: "458",
    readTime: "3mins",
    author: "joel_fah",
    description: {
      part1: "Lorem ipsum dolor sit amet consectetur. Iaculis aenean libero eu purus massa elementum ante. Quisque vitae pretium ipsum proin scelerisque faucibus quis. Massa turpis risus viverra tempus blandit. Velit mattis faucibus cursus sit varius nulla quis suspendisse mauris. Erat viverra dui odio massa rhoncus dictum nunc. Volutpat ullamcorper mi mattis tristique pellentesque. Adipiscing vitae vulputate nulla sagittis mauris nunc platea neque. Eget sit cursus sed dictumst commodo tincidunt. Et nisl porta vitae etiam. Et ipsum dictum a mattis. Ac purus mattis pulvinar arcu natoque elit tristique euismod.",
      middleImage: BlogImages.post1,
      part2: "Justo dolor etiam tempor est. Amet purus orci feugiat urna lacus scelerisque. Cursus vulputate lorem felis leo. Aliquam odio id urna convallis sed rutrum aenean eget consequat. Iaculis suscipit tincidunt bibendum odio nunc risus. Diam ac mattis tellus eros vitae amet. Etiam pellentesque curabitur in iaculis diam. Vitae semper nec egestas ipsum ornare amet posuere. Semper cras enim morbi cursus mi. Justo eget est tempor bibendum egestas cras mauris mattis. Pulvinar tristique dictumst in mauris egestas velit amet. Dis donec condimentum quis in posuere. Lorem interdum rutrum at sed commodo congue. Cras sit volutpat orci auctor volutpat. Orci aenean egestas magna ut adipiscing viverra sit donec faucibus. In pharetra odio nibh arcu diam. Diam pellentesque tincidunt vitae ultricies morbi molestie nec magnis. Felis sem quis sed senectus maecenas. Aliquam neque velit in iaculis dignissim amet. Aliquam urna vulputate id aliquam a tristique in id. Lectus amet quisque urna cursus pretium egestas. Aliquam mi aliquam vel mattis ut ornare eu metus rutrum. Condimentum."
    }
  },
  {
    id: 2,
    image: BlogImages.post2,
    tags: ["AI", "ML", "Real-Time"],
    title: "Django for the Modern Web: Integrating Cutting-Edge Technologies Like Machine Learning, Real-Time Messaging, and Single-Page Applications",
    like: "59",
    views: "324",
    readTime: "7 mins",
    author: "Anonymous",
    description: {
      part1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis aenean libero eu purus massa elementum ante...",
      middleImage: BlogImages.post2,
      part2: "Justo dolor etiam tempor est. Amet purus orci feugiat urna lacus scelerisque. Cursus vulputate lorem felis leo..."
    }
  },
  {
    id: 3,
    image: BlogImages.post3,
    tags: ["AI", "ML", "Real-Time"],
    title: "Django for the Modern Web: Integrating Cutting-Edge Technologies Like Machine Learning, Real-Time Messaging, and Single-Page Applications",
    like: "59",
    views: "324",
    readTime: "7 mins",
    author: "Anonymous",
    description: {
      part1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis aenean libero eu purus massa elementum ante...",
      middleImage: BlogImages.post3,
      part2: "Justo dolor etiam tempor est. Amet purus orci feugiat urna lacus scelerisque. Cursus vulputate lorem felis leo..."
    }
  },
];