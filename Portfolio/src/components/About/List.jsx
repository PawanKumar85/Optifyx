import PropTypes from "prop-types";

const List = ({ aboutData, style }) => {
  return (
    <ul className={style.aboutItems}>
      {aboutData.map((item) => (
        <li key={item._id} className={style.aboutItem}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-[70px] h-[70px]"
          />
          <div className={style.aboutItemText}>
            <h3 className="space-mono-bold">{item.title}</h3>
            <p className="space-mono-regular">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

// ✅ **PropTypes Validation**
List.propTypes = {
  aboutData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  style: PropTypes.shape({
    aboutItems: PropTypes.string.isRequired,
    aboutItem: PropTypes.string.isRequired,
    aboutItemText: PropTypes.string.isRequired,
  }).isRequired,
};

export default List;
