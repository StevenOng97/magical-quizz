type Props = {
  url?: string;
};
const PdfPreview = ({ url }: Props) => {
  return (
    <div className="min-w-[50%] h-full">
      {url ? (
        <object
          data={`${url}#toolbar=0`}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          pdf preview
        </object>
      ) : (
        "Getting PDF Preview..."
      )}
    </div>
  );
};

export default PdfPreview;
