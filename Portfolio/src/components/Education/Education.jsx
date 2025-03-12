import { useEffect } from "react";
import { motion } from "framer-motion";
import "./Education.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducationData } from "../../store/educationSlice";
import { lazy, Suspense } from "react";

const EducationList = lazy(() => import("./EducationList"));
const Education = () => {
  const dispatch = useDispatch();
  const { data: educationData } = useSelector((state) => state.education);

  useEffect(() => {
    dispatch(fetchEducationData());
  }, [dispatch]);

  return (
    <section className="education" id="education">
      <motion.h2
        className="heading space-mono-bold-italic"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Education
      </motion.h2>

      <Suspense
        fallback={
          <div className="skeleton h-32 w-full bg-gray-700 rounded-2xl"></div>
        }
      >
        <EducationList educationData={educationData} />
      </Suspense>
    </section>
  );
};

export default Education;
