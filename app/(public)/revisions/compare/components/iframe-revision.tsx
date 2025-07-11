export const IframeRevision = ({ url }: { url: string }) => {
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-grow">
          {url ? (
            <iframe
              src={url}
              className="w-full h-full"
              title="Revision content"
              sandbox="allow-same-origin allow-scripts allow-forms"
              loading="lazy"
              onError={() => console.error('Failed to load iframe:', url)}
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
  