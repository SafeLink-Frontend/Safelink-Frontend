import { ImageUploaderProps } from "@/types/edit-profile";

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  name,
  value,
  onChange,
  onDelete,
  multiple = false,
}) => {
  const renderPreview = () => {
    if (Array.isArray(value)) {
      return value.map((file, index) => {
        const previewSrc =
          typeof file === "string" ? file : URL.createObjectURL(file);
        return (
          <div key={index} className="relative mr-2 mb-2">
            <img
              src={previewSrc as string}
              alt={`${name}-${index}`}
              className="w-16 h-16 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => onDelete(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full pb-[2px] h-4 w-4 items-center justify-center flex"
              aria-label={`Delete ${label} image ${index + 1}`}
            >
              &times;
            </button>
          </div>
        );
      });
    } else if (value) {
      const previewSrc =
        typeof value === "string" ? value : URL.createObjectURL(value);
      return (
        <div className="relative mr-2 mb-2">
          <img
            src={previewSrc as string}
            alt={label}
            className="w-16 h-16 object-cover rounded"
          />
          <button
            type="button"
            onClick={() => onDelete()}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full pb-[2px] h-4 w-4 items-center justify-center flex"
            aria-label={`Delete ${label} image`}
          >
            &times;
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-start mt-4">
      <label
        className="text-[#252625] font-medium text-[14px] mb-1 leading-3"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        multiple={multiple}
        accept="image/png,image/jpeg,image/gif"
        aria-label={label}
      />
      <p className="text-[#252625] font-medium text-[12px] leading-3">
        PNG, JPG, GIF up to 5MB
      </p>
      <div className="flex flex-wrap mt-2">{renderPreview()}</div>
    </div>
  );
};
