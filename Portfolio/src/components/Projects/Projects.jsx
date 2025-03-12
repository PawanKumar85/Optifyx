import { useEffect, useRef, useState, useMemo, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectData } from "../../store/projectSlice";
import style from "./Project.module.css";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { motion } from "framer-motion";

// Lazy Loaded Components
const Card = lazy(() => import("./Card"));
const Spinner = lazy(() => import("../Spinner"));

const Projects = () => {
  const dispatch = useDispatch();
  const {
    data: projectData,
    loading,
    error,
  } = useSelector((state) => state.projects);
  const scrollRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 1.5;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredProjects = useMemo(() => {
    let projects =
      filter === "All"
        ? projectData
        : projectData.filter((p) => p.category === filter);
    return projects.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filter, projectData, searchQuery]);

  return (
    <section className={style.container} id="project">
      <h2 className="space-mono-bold-italic">Projects</h2>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto p-6 overflow-hidden"
      >
        <div className="relative flex items-center mb-6 w-full max-w-lg mx-auto bg-white shadow-md rounded-full px-5 py-2">
          <Search size={20} className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full outline-none bg-transparent text-gray-800 space-mono-regular"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          {["All", "Frontend", "Backend", "Full Stack"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 space-mono-regular"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <Suspense fallback={<p className="text-center">Loading...</p>}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredProjects.length > 0 ? (
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 shadow-lg rounded-full hidden md:flex"
                onClick={() => scroll("left")}
              >
                <ChevronLeft size={24} />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth p-4 snap-x snap-mandatory no-scrollbar w-full"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overflowX: "hidden",
                }}
              >
                {filteredProjects.map((item) => (
                  <div
                    key={item._id}
                    className="min-w-[300px] snap-center flex-shrink-0"
                  >
                    <Card item={item} />
                  </div>
                ))}
              </div>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 shadow-lg rounded-full hidden md:flex"
                onClick={() => scroll("right")}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
        </Suspense>
      </motion.section>
    </section>
  );
};

export default Projects;
