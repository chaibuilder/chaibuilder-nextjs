export const RightFrame = ({
  loading,
  version,
  getVersionUrl,
  getVersionLabel,
}: any) => {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <div className="flex-grow">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : version ? (
          <iframe
            src={getVersionUrl(version)}
            className="w-full h-full"
            title={`Version ${getVersionLabel(version)}`}
            // @ts-ignore - crossOrigin is valid but TypeScript doesn't recognize it
            crossOrigin="anonymous"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">No version selected</p>
          </div>
        )}
      </div>
    </div>
  );
};
