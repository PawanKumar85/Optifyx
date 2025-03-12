import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatformData } from "../../store/platformSlice";
import style from "./Platform.module.css";
import Loader from "../Spinner";

// Lazy load the PlatformList component
const PlatformList = lazy(() => import("./PlatformList"));

const Platform = () => {
  const dispatch = useDispatch();
  const { data: platformData, loading, error } = useSelector((state) => state.platform);

  useEffect(() => {
    dispatch(fetchPlatformData());
  }, [dispatch]);

  return (
    <section className="text-white" style={{ margin: "10%" }} id="platform">
      <div className={style.services}>
        <div className={style.container}>
          <h1 className="space-mono-bold-italic">Platform</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <p className={style.error}>{error}</p>
          ) : (
            <Suspense fallback={<Loader />}>
              <PlatformList platformData={platformData} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
};

export default Platform;
