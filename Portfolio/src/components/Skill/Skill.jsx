import { useEffect } from "react";
import style from "./Skill.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillData } from "../../store/skillSlice";
import { lazy, Suspense } from "react";
const SkillList = lazy(() => import("./SkillList"));

const Experience = () => {
  const dispatch = useDispatch();
  const { data: skillData } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(fetchSkillData());
  }, [dispatch]);

  return (
    <section className={style.container} id="experience">
      <h2 className="space-mono-bold-italic">Skills</h2>
      <div className={style.content}>
        <Suspense
          fallback={
            <div className="skeleton h-32 w-full bg-gray-700 rounded-2xl"></div>
          }
        >
          <SkillList skillData={skillData} />
        </Suspense>
      </div>
    </section>
  );
};

export default Experience;
