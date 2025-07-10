export const RightFrame = ({ url }: { url: string }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow">
        {url ? (
          <iframe
            src={url}
            className="w-full h-full"
            title="Right frame content"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No URL provided</p>
          </div>
        )}
      </div>
    </div>
  );
};
