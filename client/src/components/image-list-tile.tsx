

interface ImageListTileProps {
  Icon: React.JSX.Element;
  handleTabClick: () => void;
  text: string;
  activeTab: boolean;
}

function ImageListTile({
  Icon,
  handleTabClick,
  text,
  activeTab,
}: ImageListTileProps) {
  return (
    <div>
      <button
        type="button"
        className={`w-full py-2 px-2 font-medium flex items-center  rounded-lg gap-4 ${
          activeTab
            ? 'text-white bg-gray-800 hover:bg-gray-700'
            : 'text-gray-400 hover:text-gray-400 '
        }`}
        onClick={handleTabClick}
      >
        {Icon}
        {text}
      </button>
    </div>
  );
}

export default ImageListTile;
