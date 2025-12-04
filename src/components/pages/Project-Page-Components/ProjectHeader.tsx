import { Badge } from "@/components/layout";
import { FaLayerGroup } from "react-icons/fa";

const ProjectHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="inline-block">
        <Badge backgroundColor="bg-secondary/10">
          <div className="flex items-center gap-2">
            <FaLayerGroup className="text-secondary" />
            <span className="text-secondary font-medium">Explore Our Work</span>
          </div>
        </Badge>
      </div>
      <h1 className="text-primary nohemi-font text-4xl md:text-6xl font-extrabold">
        Community Projects
      </h1>
      <p className="text-text-color urbanist-font text-lg md:text-xl max-w-3xl mx-auto">
        Explore open-source Django projects built by the Django Cameroon
        community. Star, contribute, and collaborate on amazing projects!
      </p>
    </div>
  );
};

export default ProjectHeader;
