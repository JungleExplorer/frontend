interface StarProps {
  filled: boolean; // 별이 채워졌는지 여부
  onClick: () => void; // 클릭 이벤트 핸들러
}

const Star: React.FC<StarProps> = ({ filled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? "gold" : "gray"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.122 6.564a1 1 0 00.95.69h6.905c.969 0 1.371 1.24.588 1.81l-5.593 4.067a1 1 0 00-.364 1.118l2.122 6.564c.3.921-.755 1.688-1.538 1.118l-5.593-4.067a1 1 0 00-1.176 0l-5.593 4.067c-.783.57-1.838-.197-1.538-1.118l2.122-6.564a1 1 0 00-.364-1.118L2.37 11.99c-.783-.57-.38-1.81.588-1.81h6.905a1 1 0 00.95-.69l2.122-6.564z"
        />
      </svg>
    </button>
  );
};

export default Star;
